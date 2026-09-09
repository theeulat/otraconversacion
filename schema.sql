CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  form TEXT NOT NULL,
  lang TEXT,
  nombre TEXT,
  email TEXT,
  motivo TEXT,
  proyecto TEXT,
  mensaje TEXT,
  page TEXT,
  country TEXT,
  ip_hash TEXT,
  user_agent TEXT
);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_form ON messages (form);
