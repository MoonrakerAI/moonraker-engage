import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'hipaa-backend',
  location: 'us-central1'
};

export const createConversationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateConversation', inputVars);
}
createConversationRef.operationName = 'CreateConversation';

export function createConversation(dcOrVars, vars) {
  return executeMutation(createConversationRef(dcOrVars, vars));
}

export const createAuditLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAuditLog', inputVars);
}
createAuditLogRef.operationName = 'CreateAuditLog';

export function createAuditLog(dcOrVars, vars) {
  return executeMutation(createAuditLogRef(dcOrVars, vars));
}

export const getConversationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetConversations', inputVars);
}
getConversationsRef.operationName = 'GetConversations';

export function getConversations(dcOrVars, vars) {
  return executeQuery(getConversationsRef(dcOrVars, vars));
}

export const getAllConversationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllConversations');
}
getAllConversationsRef.operationName = 'GetAllConversations';

export function getAllConversations(dc) {
  return executeQuery(getAllConversationsRef(dc));
}

export const getAuditLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAuditLogs', inputVars);
}
getAuditLogsRef.operationName = 'GetAuditLogs';

export function getAuditLogs(dcOrVars, vars) {
  return executeQuery(getAuditLogsRef(dcOrVars, vars));
}

