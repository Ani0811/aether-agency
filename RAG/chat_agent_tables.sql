-- =========================================================
-- G-One Media — AI Chat Agent Database Tables
-- Run this in your Supabase SQL Editor
-- =========================================================

-- ─────────────────────────────────────────────────────────
-- TABLE 1: chat_leads
-- Stores booking and service enquiry leads captured via AI chat
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_leads (
  id          BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  service     TEXT,
  budget      TEXT,
  details     TEXT,
  type        TEXT NOT NULL DEFAULT 'enquiry'
    CHECK (type IN ('enquiry', 'booking')),
  session_id  TEXT  -- links back to the chat session that generated this lead
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS idx_chat_leads_email ON chat_leads (email);

-- Enable Row Level Security
ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;

-- Allow service role (server) full access; public can only insert
CREATE POLICY "chat_leads: service role full access"
  ON chat_leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "chat_leads: anon insert"
  ON chat_leads FOR INSERT
  WITH CHECK (true);


-- ─────────────────────────────────────────────────────────
-- TABLE 2: chat_contacts
-- Stores general contact messages sent via AI chat
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_contacts (
  id          BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  session_id  TEXT
);

CREATE INDEX IF NOT EXISTS idx_chat_contacts_email ON chat_contacts (email);

ALTER TABLE chat_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_contacts: service role full access"
  ON chat_contacts FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "chat_contacts: anon insert"
  ON chat_contacts FOR INSERT
  WITH CHECK (true);


-- ─────────────────────────────────────────────────────────
-- TABLE 3: chat_refund_requests
-- Stores refund requests submitted via AI chat — manual review required
-- The AI NEVER auto-processes these; founders review and action manually.
-- ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chat_refund_requests (
  id          BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name        TEXT,
  email       TEXT NOT NULL,
  payment_id  TEXT NOT NULL,
  reason      TEXT,
  status      TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  session_id  TEXT
);

CREATE INDEX IF NOT EXISTS idx_chat_refund_requests_payment_id ON chat_refund_requests (payment_id);
CREATE INDEX IF NOT EXISTS idx_chat_refund_requests_status     ON chat_refund_requests (status);

ALTER TABLE chat_refund_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "chat_refund_requests: service role full access"
  ON chat_refund_requests FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "chat_refund_requests: anon insert"
  ON chat_refund_requests FOR INSERT
  WITH CHECK (true);
