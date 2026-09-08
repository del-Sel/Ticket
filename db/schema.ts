/**
 * Logical D1 schema for the ticket system.
 * The payload keeps the workflow extensible while the indexed columns support
 * the list and status queries used by the application.
 */
export const ticketsSchema = {
  table: "tickets",
  columns: {
    id: "TEXT PRIMARY KEY NOT NULL",
    number: "INTEGER NOT NULL",
    status: "TEXT NOT NULL",
    created_at: "TEXT NOT NULL",
    updated_at: "TEXT NOT NULL",
    payload: "TEXT NOT NULL"
  },
  indexes: ["idx_tickets_updated_at", "idx_tickets_status"]
} as const;
