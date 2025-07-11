const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'hipaa-backend',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const createConversationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateConversation', inputVars);
}
createConversationRef.operationName = 'CreateConversation';
exports.createConversationRef = createConversationRef;

exports.createConversation = function createConversation(dcOrVars, vars) {
  return executeMutation(createConversationRef(dcOrVars, vars));
};

const createAuditLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAuditLog', inputVars);
}
createAuditLogRef.operationName = 'CreateAuditLog';
exports.createAuditLogRef = createAuditLogRef;

exports.createAuditLog = function createAuditLog(dcOrVars, vars) {
  return executeMutation(createAuditLogRef(dcOrVars, vars));
};

const getConversationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetConversations', inputVars);
}
getConversationsRef.operationName = 'GetConversations';
exports.getConversationsRef = getConversationsRef;

exports.getConversations = function getConversations(dcOrVars, vars) {
  return executeQuery(getConversationsRef(dcOrVars, vars));
};

const getAllConversationsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAllConversations');
}
getAllConversationsRef.operationName = 'GetAllConversations';
exports.getAllConversationsRef = getAllConversationsRef;

exports.getAllConversations = function getAllConversations(dc) {
  return executeQuery(getAllConversationsRef(dc));
};

const getAuditLogsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAuditLogs', inputVars);
}
getAuditLogsRef.operationName = 'GetAuditLogs';
exports.getAuditLogsRef = getAuditLogsRef;

exports.getAuditLogs = function getAuditLogs(dcOrVars, vars) {
  return executeQuery(getAuditLogsRef(dcOrVars, vars));
};
