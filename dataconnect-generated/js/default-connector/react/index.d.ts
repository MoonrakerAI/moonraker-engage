import { CreateConversationData, CreateConversationVariables, CreateAuditLogData, CreateAuditLogVariables, GetConversationsData, GetConversationsVariables, GetAllConversationsData, GetAuditLogsData, GetAuditLogsVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateConversation(options?: useDataConnectMutationOptions<CreateConversationData, FirebaseError, CreateConversationVariables>): UseDataConnectMutationResult<CreateConversationData, CreateConversationVariables>;
export function useCreateConversation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateConversationData, FirebaseError, CreateConversationVariables>): UseDataConnectMutationResult<CreateConversationData, CreateConversationVariables>;

export function useCreateAuditLog(options?: useDataConnectMutationOptions<CreateAuditLogData, FirebaseError, CreateAuditLogVariables>): UseDataConnectMutationResult<CreateAuditLogData, CreateAuditLogVariables>;
export function useCreateAuditLog(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAuditLogData, FirebaseError, CreateAuditLogVariables>): UseDataConnectMutationResult<CreateAuditLogData, CreateAuditLogVariables>;

export function useGetConversations(vars: GetConversationsVariables, options?: useDataConnectQueryOptions<GetConversationsData>): UseDataConnectQueryResult<GetConversationsData, GetConversationsVariables>;
export function useGetConversations(dc: DataConnect, vars: GetConversationsVariables, options?: useDataConnectQueryOptions<GetConversationsData>): UseDataConnectQueryResult<GetConversationsData, GetConversationsVariables>;

export function useGetAllConversations(options?: useDataConnectQueryOptions<GetAllConversationsData>): UseDataConnectQueryResult<GetAllConversationsData, undefined>;
export function useGetAllConversations(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllConversationsData>): UseDataConnectQueryResult<GetAllConversationsData, undefined>;

export function useGetAuditLogs(vars?: GetAuditLogsVariables, options?: useDataConnectQueryOptions<GetAuditLogsData>): UseDataConnectQueryResult<GetAuditLogsData, GetAuditLogsVariables>;
export function useGetAuditLogs(dc: DataConnect, vars?: GetAuditLogsVariables, options?: useDataConnectQueryOptions<GetAuditLogsData>): UseDataConnectQueryResult<GetAuditLogsData, GetAuditLogsVariables>;
