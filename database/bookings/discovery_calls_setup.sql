-- ============================================================
-- G-One Media — Use Case: Discovery Calls
-- Setup script for dedicated discovery call bookings
-- ============================================================

CREATE TABLE IF NOT EXISTS discovery_calls (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  company       TEXT,
  website       TEXT,
  service       TEXT NOT NULL,
  budget        TEXT,
  details       TEXT,
  referral      TEXT,
  status        TEXT DEFAULT 'pending' 
    CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_discovery_calls_email ON discovery_calls (email);
CREATE INDEX IF NOT EXISTS idx_discovery_calls_status ON discovery_calls (status);

-- Enable Row Level Security
ALTER TABLE discovery_calls ENABLE ROW LEVEL SECURITY;

-- Allow service role (server) full access; public can only insert
CREATE POLICY "discovery_calls: service role full access"
  ON discovery_calls FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "discovery_calls: anon insert"
  ON discovery_calls FOR INSERT
  WITH CHECK (true);
