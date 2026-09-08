CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY NOT NULL,
  number INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  payload TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_tickets_updated_at ON tickets(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
