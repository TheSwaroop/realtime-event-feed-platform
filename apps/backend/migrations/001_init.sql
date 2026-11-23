CREATE TABLE IF NOT EXISTS events (
  event_id UUID PRIMARY KEY, event_type VARCHAR(40) NOT NULL, occurred_at TIMESTAMPTZ NOT NULL,
  user_id VARCHAR(100) NOT NULL, payload JSONB NOT NULL, version INTEGER NOT NULL DEFAULT 1,
  room_id VARCHAR(80), idempotency_key VARCHAR(120), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS events_user_idempotency_idx ON events(user_id,idempotency_key) WHERE idempotency_key IS NOT NULL;
CREATE INDEX IF NOT EXISTS events_occurred_at_idx ON events(occurred_at DESC);
CREATE INDEX IF NOT EXISTS events_type_idx ON events(event_type);
