import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import dotenv from 'dotenv';

dotenv.config();

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION — Edit this section to customise the bot for any client
// ─────────────────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `
You are an AI assistant for G-One Media (also known as Aether Digital), a modern digital agency based in India.

WHAT WE DO:
- Custom Website Design & Development (React, Next.js, full-stack)
- E-commerce solutions with Razorpay payment integrations
- Digital marketing (SEO, social media, email campaigns)
- AI chatbot creation & automation (like the one you are interacting with right now!)
- Brand identity & logo design

HOW TO RESPOND:
- Be friendly, professional, and concise (2-4 sentences max per reply)
- If asked for pricing, say packages start from ₹10,000 and vary by scope
- If someone wants to book a call or discuss a project, ask for their name and email and say our team will reach out within 24 hours
- If asked something you are not sure about, say "Let me connect you with our team for that!" and ask for their email
- Never make up specific details you are not sure about

NEVER say you are an AI or a bot unless the user directly and explicitly asks "are you a bot/AI?".
`.trim();

const BOT_NUMBER_LABEL = process.env.BOT_DISPLAY_NAME || 'G-One Media AI';

// ─────────────────────────────────────────────────────────────────────────────
// SESSION MEMORY — Stores each user's conversation history in-memory
// ─────────────────────────────────────────────────────────────────────────────

const sessions = new Map();

// ─────────────────────────────────────────────────────────────────────────────
// WHATSAPP CLIENT SETUP
// LocalAuth saves the session to disk (.wwebjs_auth/) so you only scan QR once
// ─────────────────────────────────────────────────────────────────────────────

const client = new Client({
    authStrategy: new LocalAuth({ clientId: 'g-onemedia-bot', dataPath: './node_modules/.wwebjs_auth' }),
    puppeteer: {
        headless: true,
        handleSIGINT: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ],
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// EVENT: QR Code
// Displays a scannable QR code in your terminal to link your WhatsApp account
// ─────────────────────────────────────────────────────────────────────────────

client.on('qr', (qr) => {
    console.log('\n═══════════════════════════════════════════════════');
    console.log(' 📱  Scan this QR code with your WhatsApp:');
    console.log('     WhatsApp → Linked Devices → Link a Device');
    console.log('═══════════════════════════════════════════════════\n');
    qrcode.generate(qr, { small: true });
});

// ─────────────────────────────────────────────────────────────────────────────
// EVENT: Authenticated
// ─────────────────────────────────────────────────────────────────────────────

client.on('authenticated', () => {
    console.log('\n✅ WhatsApp session authenticated. Loading chats...');
});

// ─────────────────────────────────────────────────────────────────────────────
// EVENT: Ready
// ─────────────────────────────────────────────────────────────────────────────

client.on('ready', () => {
    console.log('\n🚀 ══════════════════════════════════════════════════');
    console.log(`   ${BOT_NUMBER_LABEL} WhatsApp Bot is LIVE!`);
    console.log('   Any message sent to this number will be answered by AI.');
    console.log('   Press Ctrl+C to stop the bot.\n');
    console.log('═══════════════════════════════════════════════════\n');
});

// ─────────────────────────────────────────────────────────────────────────────
// EVENT: Disconnected
// ─────────────────────────────────────────────────────────────────────────────

client.on('disconnected', (reason) => {
    console.log(`\n⚠️  WhatsApp disconnected: ${reason}`);
    console.log('   Attempting to restart... Run the bot script again if it does not recover.\n');
});

// ─────────────────────────────────────────────────────────────────────────────
// EVENT: Incoming Message
// ─────────────────────────────────────────────────────────────────────────────

client.on('message', async (msg) => {
    // Ignore group chats and status updates
    if (msg.from.includes('@g.us') || msg.isStatus) return;

    // Ignore empty or media-only messages
    if (!msg.body || msg.body.trim() === '') return;

    const senderNumber = msg.from;
    const userText = msg.body.trim();

    console.log(`\n📩  [${new Date().toLocaleTimeString()}] Message from +${senderNumber.replace('@c.us', '')}`);
    console.log(`    "${userText}"`);

    // Show typing indicator
    const chat = await msg.getChat();
    await chat.sendStateTyping();

    try {
        const aiReply = await getGeminiReply(userText, senderNumber);
        await msg.reply(aiReply);
        console.log(`✅  Reply sent: "${aiReply.substring(0, 80)}${aiReply.length > 80 ? '...' : ''}"`);
    } catch (err) {
        console.error('❌  Error generating reply:', err.message);
        await msg.reply("Sorry, I ran into a small issue! Please try again or reach out to us directly.");
    } finally {
        await chat.clearState();
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// GEMINI API CALL
// Maintains per-user conversation context for multi-turn chat
// ─────────────────────────────────────────────────────────────────────────────

async function getGeminiReply(userMessage, userId) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('❌  GEMINI_API_KEY is not set in your .env file!');
        return "My AI brain is not connected right now. Please contact us directly!";
    }

    // Initialize conversation history on first message from this user
    if (!sessions.has(userId)) {
        sessions.set(userId, [
            { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
            { role: 'model', parts: [{ text: "Understood! I am ready to assist G-One Media customers." }] }
        ]);
    }

    const history = sessions.get(userId);
    history.push({ role: 'user', parts: [{ text: userMessage }] });

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: history,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 300, // Keeps replies short and WhatsApp-friendly
                }
            })
        }
    );

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Gemini API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
        || "I'm having a moment! Could you rephrase that?";

    history.push({ role: 'model', parts: [{ text: replyText }] });

    // Keep session memory bounded to last 20 turns (excluding system prompt)
    if (history.length > 22) {
        const trimmed = [history[0], history[1], ...history.slice(-18)];
        sessions.set(userId, trimmed);
    }

    return replyText;
}

// ─────────────────────────────────────────────────────────────────────────────
// GRACEFUL SHUTDOWN on Ctrl+C
// ─────────────────────────────────────────────────────────────────────────────

process.on('SIGINT', async () => {
    console.log('\n\n🛑  Shutting down bot gracefully...');
    await client.destroy();
    process.exit(0);
});

// ─────────────────────────────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n🔄  Starting G-One Media WhatsApp AI Bot...');
console.log('    Using: Gemini 2.0 Flash + whatsapp-web.js\n');
client.initialize();
