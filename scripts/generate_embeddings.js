import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pdfParse = require('pdf-parse')
const officeParser = require('officeparser')

dotenv.config()

// Prefer service_role key for admin inserts if available, otherwise fallback to anon key
const supabaseUrl = process.env.SUPABASE_PROJECT_URL || process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
const apiKey = process.env.GEMINI_API_KEY

async function generateEmbedding(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${apiKey}`
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: "models/gemini-embedding-2",
      content: { parts: [{ text }] }
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Embedding API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  return data.embedding.values
}

async function processKnowledgeBase() {
  const kbDir = path.join(process.cwd(), 'knowledge_base')
  console.log(`Scanning directory: ${kbDir}`)
  
  if (!fs.existsSync(kbDir)) {
    console.error('Error: "knowledge_base" directory not found. Please create it in the root folder.')
    return
  }

  const files = fs.readdirSync(kbDir)
  const knowledgeBase = []

  // Read supported files
  for (const file of files) {
    const filePath = path.join(kbDir, file)
    let content = ''

    try {
      if (file.endsWith('.txt') || file.endsWith('.md')) {
        content = fs.readFileSync(filePath, 'utf-8')
      } else if (file.endsWith('.pdf')) {
        const dataBuffer = fs.readFileSync(filePath)
        const data = await pdfParse(dataBuffer)
        content = data.text
      } else if (file.endsWith('.docx') || file.endsWith('.pptx')) {
        content = await officeParser.parseOfficeAsync(filePath)
      } else {
        continue // Unsupported file type
      }
      
      // Simple chunking strategy: Split by paragraphs (double newline)
      const chunks = content.split(/\n\s*\n/).map(c => c.trim()).filter(c => c.length > 20)
      
      chunks.forEach(chunk => {
        knowledgeBase.push({
          text: chunk,
          source: file
        })
      })
      console.log(`Parsed ${file}`)
    } catch (err) {
      console.error(`Error parsing ${file}: ${err.message}`)
    }
  }

  if (knowledgeBase.length === 0) {
    console.log('No valid text or markdown files found to process in knowledge_base/.')
    return
  }

  console.log(`Found ${knowledgeBase.length} chunks from ${files.length} files. Starting embedding generation...`)

  for (const item of knowledgeBase) {
    console.log(`Embedding: "${item.text.substring(0, 50).replace(/\n/g, ' ')}..." from ${item.source}`)
    try {
      const embedding = await generateEmbedding(item.text)

      const { error } = await supabase
        .from('documents')
        .insert({
          content: item.text,
          metadata: { source: item.source },
          embedding
        })

      if (error) {
        console.error('Supabase insert error:', error.message)
      } else {
        console.log('Successfully inserted into Supabase.')
      }

      // Delay to respect rate limits (1 request per second)
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (err) {
      console.error('Error processing document:', err.message)
    }
  }

  console.log('Finished generating embeddings.')
}

processKnowledgeBase()
