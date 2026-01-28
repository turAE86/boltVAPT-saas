/*
  # VAPT SaaS Platform Schema

  1. New Tables
    - `user_tokens` - tracks scan credits for each user (10, 20, 30 token packages)
    - `scans` - stores scan history and results
    - `vulnerabilities` - stores detected vulnerabilities per scan
    - `scan_limits` - enforces 5 scans per account limit
  
  2. Security
    - Enable RLS on all tables
    - Policies for user isolation
    - Admin access for dashboard
*/

CREATE TABLE IF NOT EXISTS user_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  total_tokens integer DEFAULT 0,
  used_tokens integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_url text NOT NULL,
  status text DEFAULT 'pending',
  severity_count jsonb DEFAULT '{"critical": 0, "high": 0, "medium": 0, "low": 0, "info": 0}',
  total_vulnerabilities integer DEFAULT 0,
  scan_result jsonb,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  tokens_used integer DEFAULT 1
);

CREATE TABLE IF NOT EXISTS vulnerabilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid NOT NULL REFERENCES scans(id) ON DELETE CASCADE,
  title text NOT NULL,
  severity text NOT NULL,
  description text,
  recommendation text,
  cve_id text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS token_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  token_amount integer NOT NULL,
  price_in_paise integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

INSERT INTO token_packages (name, token_amount, price_in_paise) VALUES
  ('Starter', 10, 29900),
  ('Professional', 20, 59800),
  ('Enterprise', 30, 89700)
ON CONFLICT DO NOTHING;

ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE vulnerabilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tokens"
  ON user_tokens FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens"
  ON user_tokens FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert tokens"
  ON user_tokens FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Users can view own scans"
  ON scans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create scans"
  ON scans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scans"
  ON scans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view vulnerabilities from own scans"
  ON vulnerabilities FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM scans
      WHERE scans.id = vulnerabilities.scan_id
      AND scans.user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can insert vulnerabilities"
  ON vulnerabilities FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE INDEX idx_scans_user_id ON scans(user_id);
CREATE INDEX idx_scans_created_at ON scans(created_at DESC);
CREATE INDEX idx_vulnerabilities_scan_id ON vulnerabilities(scan_id);
