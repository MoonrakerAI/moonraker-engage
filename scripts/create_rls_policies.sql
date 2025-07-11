-- Enable RLS for the "ChatSession" table
ALTER TABLE "ChatSession" ENABLE ROW LEVEL SECURITY;

-- Create policies for the "ChatSession" table for 'data_connect_user'
CREATE POLICY chat_session_policy ON "ChatSession"
  AS PERMISSIVE
  FOR ALL
  TO data_connect_user
  USING (userId = current_setting('app.current_user_id'));

-- Enable RLS for the "Message" table
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;

-- Create policies for the "Message" table for 'data_connect_user'
CREATE POLICY message_policy ON "Message"
  AS PERMISSIVE
  FOR ALL
  TO data_connect_user
  USING ((SELECT userId FROM "ChatSession" WHERE id = chatSessionId) = current_setting('app.current_user_id'));


-- Enable RLS for the "AuditLog" table
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;

-- Create a policy for SELECT operations on the "AuditLog" table for 'data_connect_user'
CREATE POLICY audit_log_select_policy ON "AuditLog"
  AS PERMISSIVE
  FOR SELECT
  TO data_connect_user
  USING (userId = current_setting('app.current_user_id'));

-- Create a policy for INSERT operations on the "AuditLog" table for 'data_connect_user'
CREATE POLICY audit_log_insert_policy ON "AuditLog"
  AS PERMISSIVE
  FOR INSERT
  TO data_connect_user
  WITH CHECK (userId = current_setting('app.current_user_id'));