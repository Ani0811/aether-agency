import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

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

// Sample Knowledge Base to start with
const knowledgeBase = [
  "G-One Media is our unique collaborative process. It merges high-end web engineering with cinematic storytelling to maximize business conversions and audience retention.",
  "Anirudha Basu Thakur is our Technical Visionary and Full-Stack Architect. He builds scalable digital ecosystems, SaaS platforms, and high-converting landing pages using React, Next.js, and Node.js.",
  "Vasudev Sharma is our Creative Director and Cinematic Editor. He specializes in professional-grade video production, cinematic editing, and high-energy social media content.",
  "Project pricing at G-One Media starts from ₹10,000 ($120 USD) depending on the scope of work. Custom quotes are tailored for each client.",
  "We provide Custom Website Design, E-commerce solutions with Razorpay, AI chatbot creation, and Video production (Reels, YouTube, cinematic content)."
]

async function processKnowledgeBase() {
  console.log('Starting embedding generation...')

  for (const content of knowledgeBase) {
    console.log(`Embedding: "${content.substring(0, 50)}..."`)
    try {
      const embedding = await generateEmbedding(content)

      const { error } = await supabase
        .from('documents')
        .insert({
          content,
          metadata: { source: 'seed_data' },
          embedding
        })

      if (error) {
        console.error('Supabase insert error:', error.message)
      } else {
        console.log('Successfully inserted into Supabase.')
      }

      // Delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (err) {
      console.error('Error processing document:', err.message)
    }
  }

  console.log('Finished generating embeddings.')
}

processKnowledgeBase()
