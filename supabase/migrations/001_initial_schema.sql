-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Consultation Requests
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  matter_type TEXT NOT NULL,
  preferred_mode TEXT NOT NULL CHECK (preferred_mode IN ('office', 'phone', 'video')),
  preferred_date TEXT,
  message TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT true,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'scheduled', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for forms
CREATE POLICY "Allow anonymous insert on contact_messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on consultation_requests"
  ON consultation_requests FOR INSERT
  WITH CHECK (true);
