import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AuditLog_Key {
  id: string;
  __typename?: 'AuditLog_Key';
}

export interface Conversation_Key {
  id: string;
  __typename?: 'Conversation_Key';
}

export interface CreateAuditLogData {
  auditLog_insert: AuditLog_Key;
}

export interface CreateAuditLogVariables {
  action: string;
  severity: string;
  userId?: string | null;
  details?: string | null;
}

export interface CreateConversationData {
  conversation_insert: Conversation_Key;
}

export interface CreateConversationVariables {
  userId: string;
  sessionId: string;
  message: string;
  response: string;
}

export interface GetAllConversationsData {
  conversations: ({
    id: string;
    userId: string;
    sessionId: string;
    message: string;
    response: string;
    isBot: boolean;
    createdAt: TimestampString;
  } & Conversation_Key)[];
}

export interface GetAuditLogsData {
  auditLogs: ({
    id: string;
    action: string;
    userId?: string | null;
    timestamp: TimestampString;
    severity: string;
  } & AuditLog_Key)[];
}

export interface GetAuditLogsVariables {
  limit?: number | null;
}

export interface GetConversationsData {
  conversations: ({
    id: string;
    message: string;
    response: string;
    createdAt: TimestampString;
  } & Conversation_Key)[];
}

export interface GetConversationsVariables {
  userId: string;
}

interface CreateConversationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConversationVariables): MutationRef<CreateConversationData, CreateConversationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateConversationVariables): MutationRef<CreateConversationData, CreateConversationVariables>;
  operationName: string;
}
export const createConversationRef: CreateConversationRef;

export function createConversation(vars: CreateConversationVariables): MutationPromise<CreateConversationData, CreateConversationVariables>;
export function createConversation(dc: DataConnect, vars: CreateConversationVariables): MutationPromise<CreateConversationData, CreateConversationVariables>;

interface CreateAuditLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
  operationName: string;
}
export const createAuditLogRef: CreateAuditLogRef;

export function createAuditLog(vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;
export function createAuditLog(dc: DataConnect, vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface GetConversationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConversationsVariables): QueryRef<GetConversationsData, GetConversationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetConversationsVariables): QueryRef<GetConversationsData, GetConversationsVariables>;
  operationName: string;
}
export const getConversationsRef: GetConversationsRef;

export function getConversations(vars: GetConversationsVariables): QueryPromise<GetConversationsData, GetConversationsVariables>;
export function getConversations(dc: DataConnect, vars: GetConversationsVariables): QueryPromise<GetConversationsData, GetConversationsVariables>;

interface GetAllConversationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllConversationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetAllConversationsData, undefined>;
  operationName: string;
}
export const getAllConversationsRef: GetAllConversationsRef;

export function getAllConversations(): QueryPromise<GetAllConversationsData, undefined>;
export function getAllConversations(dc: DataConnect): QueryPromise<GetAllConversationsData, undefined>;

interface GetAuditLogsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetAuditLogsVariables): QueryRef<GetAuditLogsData, GetAuditLogsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetAuditLogsVariables): QueryRef<GetAuditLogsData, GetAuditLogsVariables>;
  operationName: string;
}
export const getAuditLogsRef: GetAuditLogsRef;

export function getAuditLogs(vars?: GetAuditLogsVariables): QueryPromise<GetAuditLogsData, GetAuditLogsVariables>;
export function getAuditLogs(dc: DataConnect, vars?: GetAuditLogsVariables): QueryPromise<GetAuditLogsData, GetAuditLogsVariables>;

