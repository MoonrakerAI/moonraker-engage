# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`default-connector/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetConversations*](#getconversations)
  - [*GetAllConversations*](#getallconversations)
  - [*GetAuditLogs*](#getauditlogs)
- [**Mutations**](#mutations)
  - [*CreateConversation*](#createconversation)
  - [*CreateAuditLog*](#createauditlog)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetConversations
You can execute the `GetConversations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getConversations(vars: GetConversationsVariables): QueryPromise<GetConversationsData, GetConversationsVariables>;

interface GetConversationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConversationsVariables): QueryRef<GetConversationsData, GetConversationsVariables>;
}
export const getConversationsRef: GetConversationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getConversations(dc: DataConnect, vars: GetConversationsVariables): QueryPromise<GetConversationsData, GetConversationsVariables>;

interface GetConversationsRef {
  ...
  (dc: DataConnect, vars: GetConversationsVariables): QueryRef<GetConversationsData, GetConversationsVariables>;
}
export const getConversationsRef: GetConversationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getConversationsRef:
```typescript
const name = getConversationsRef.operationName;
console.log(name);
```

### Variables
The `GetConversations` query requires an argument of type `GetConversationsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetConversationsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetConversations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetConversationsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetConversationsData {
  conversations: ({
    id: string;
    message: string;
    response: string;
    createdAt: TimestampString;
  } & Conversation_Key)[];
}
```
### Using `GetConversations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getConversations, GetConversationsVariables } from '@firebasegen/default-connector';

// The `GetConversations` query requires an argument of type `GetConversationsVariables`:
const getConversationsVars: GetConversationsVariables = {
  userId: ..., 
};

// Call the `getConversations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getConversations(getConversationsVars);
// Variables can be defined inline as well.
const { data } = await getConversations({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getConversations(dataConnect, getConversationsVars);

console.log(data.conversations);

// Or, you can use the `Promise` API.
getConversations(getConversationsVars).then((response) => {
  const data = response.data;
  console.log(data.conversations);
});
```

### Using `GetConversations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getConversationsRef, GetConversationsVariables } from '@firebasegen/default-connector';

// The `GetConversations` query requires an argument of type `GetConversationsVariables`:
const getConversationsVars: GetConversationsVariables = {
  userId: ..., 
};

// Call the `getConversationsRef()` function to get a reference to the query.
const ref = getConversationsRef(getConversationsVars);
// Variables can be defined inline as well.
const ref = getConversationsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getConversationsRef(dataConnect, getConversationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.conversations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.conversations);
});
```

## GetAllConversations
You can execute the `GetAllConversations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getAllConversations(): QueryPromise<GetAllConversationsData, undefined>;

interface GetAllConversationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetAllConversationsData, undefined>;
}
export const getAllConversationsRef: GetAllConversationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAllConversations(dc: DataConnect): QueryPromise<GetAllConversationsData, undefined>;

interface GetAllConversationsRef {
  ...
  (dc: DataConnect): QueryRef<GetAllConversationsData, undefined>;
}
export const getAllConversationsRef: GetAllConversationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAllConversationsRef:
```typescript
const name = getAllConversationsRef.operationName;
console.log(name);
```

### Variables
The `GetAllConversations` query has no variables.
### Return Type
Recall that executing the `GetAllConversations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAllConversationsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAllConversations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAllConversations } from '@firebasegen/default-connector';


// Call the `getAllConversations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAllConversations();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAllConversations(dataConnect);

console.log(data.conversations);

// Or, you can use the `Promise` API.
getAllConversations().then((response) => {
  const data = response.data;
  console.log(data.conversations);
});
```

### Using `GetAllConversations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAllConversationsRef } from '@firebasegen/default-connector';


// Call the `getAllConversationsRef()` function to get a reference to the query.
const ref = getAllConversationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAllConversationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.conversations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.conversations);
});
```

## GetAuditLogs
You can execute the `GetAuditLogs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getAuditLogs(vars?: GetAuditLogsVariables): QueryPromise<GetAuditLogsData, GetAuditLogsVariables>;

interface GetAuditLogsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetAuditLogsVariables): QueryRef<GetAuditLogsData, GetAuditLogsVariables>;
}
export const getAuditLogsRef: GetAuditLogsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAuditLogs(dc: DataConnect, vars?: GetAuditLogsVariables): QueryPromise<GetAuditLogsData, GetAuditLogsVariables>;

interface GetAuditLogsRef {
  ...
  (dc: DataConnect, vars?: GetAuditLogsVariables): QueryRef<GetAuditLogsData, GetAuditLogsVariables>;
}
export const getAuditLogsRef: GetAuditLogsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAuditLogsRef:
```typescript
const name = getAuditLogsRef.operationName;
console.log(name);
```

### Variables
The `GetAuditLogs` query has an optional argument of type `GetAuditLogsVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAuditLogsVariables {
  limit?: number | null;
}
```
### Return Type
Recall that executing the `GetAuditLogs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAuditLogsData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetAuditLogsData {
  auditLogs: ({
    id: string;
    action: string;
    userId?: string | null;
    timestamp: TimestampString;
    severity: string;
  } & AuditLog_Key)[];
}
```
### Using `GetAuditLogs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAuditLogs, GetAuditLogsVariables } from '@firebasegen/default-connector';

// The `GetAuditLogs` query has an optional argument of type `GetAuditLogsVariables`:
const getAuditLogsVars: GetAuditLogsVariables = {
  limit: ..., // optional
};

// Call the `getAuditLogs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAuditLogs(getAuditLogsVars);
// Variables can be defined inline as well.
const { data } = await getAuditLogs({ limit: ..., });
// Since all variables are optional for this query, you can omit the `GetAuditLogsVariables` argument.
const { data } = await getAuditLogs();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAuditLogs(dataConnect, getAuditLogsVars);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
getAuditLogs(getAuditLogsVars).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

### Using `GetAuditLogs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAuditLogsRef, GetAuditLogsVariables } from '@firebasegen/default-connector';

// The `GetAuditLogs` query has an optional argument of type `GetAuditLogsVariables`:
const getAuditLogsVars: GetAuditLogsVariables = {
  limit: ..., // optional
};

// Call the `getAuditLogsRef()` function to get a reference to the query.
const ref = getAuditLogsRef(getAuditLogsVars);
// Variables can be defined inline as well.
const ref = getAuditLogsRef({ limit: ..., });
// Since all variables are optional for this query, you can omit the `GetAuditLogsVariables` argument.
const ref = getAuditLogsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAuditLogsRef(dataConnect, getAuditLogsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.auditLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLogs);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateConversation
You can execute the `CreateConversation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createConversation(vars: CreateConversationVariables): MutationPromise<CreateConversationData, CreateConversationVariables>;

interface CreateConversationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateConversationVariables): MutationRef<CreateConversationData, CreateConversationVariables>;
}
export const createConversationRef: CreateConversationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createConversation(dc: DataConnect, vars: CreateConversationVariables): MutationPromise<CreateConversationData, CreateConversationVariables>;

interface CreateConversationRef {
  ...
  (dc: DataConnect, vars: CreateConversationVariables): MutationRef<CreateConversationData, CreateConversationVariables>;
}
export const createConversationRef: CreateConversationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createConversationRef:
```typescript
const name = createConversationRef.operationName;
console.log(name);
```

### Variables
The `CreateConversation` mutation requires an argument of type `CreateConversationVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateConversationVariables {
  userId: string;
  sessionId: string;
  message: string;
  response: string;
}
```
### Return Type
Recall that executing the `CreateConversation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateConversationData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateConversationData {
  conversation_insert: Conversation_Key;
}
```
### Using `CreateConversation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createConversation, CreateConversationVariables } from '@firebasegen/default-connector';

// The `CreateConversation` mutation requires an argument of type `CreateConversationVariables`:
const createConversationVars: CreateConversationVariables = {
  userId: ..., 
  sessionId: ..., 
  message: ..., 
  response: ..., 
};

// Call the `createConversation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createConversation(createConversationVars);
// Variables can be defined inline as well.
const { data } = await createConversation({ userId: ..., sessionId: ..., message: ..., response: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createConversation(dataConnect, createConversationVars);

console.log(data.conversation_insert);

// Or, you can use the `Promise` API.
createConversation(createConversationVars).then((response) => {
  const data = response.data;
  console.log(data.conversation_insert);
});
```

### Using `CreateConversation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createConversationRef, CreateConversationVariables } from '@firebasegen/default-connector';

// The `CreateConversation` mutation requires an argument of type `CreateConversationVariables`:
const createConversationVars: CreateConversationVariables = {
  userId: ..., 
  sessionId: ..., 
  message: ..., 
  response: ..., 
};

// Call the `createConversationRef()` function to get a reference to the mutation.
const ref = createConversationRef(createConversationVars);
// Variables can be defined inline as well.
const ref = createConversationRef({ userId: ..., sessionId: ..., message: ..., response: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createConversationRef(dataConnect, createConversationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.conversation_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.conversation_insert);
});
```

## CreateAuditLog
You can execute the `CreateAuditLog` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createAuditLog(vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface CreateAuditLogRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
}
export const createAuditLogRef: CreateAuditLogRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAuditLog(dc: DataConnect, vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface CreateAuditLogRef {
  ...
  (dc: DataConnect, vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
}
export const createAuditLogRef: CreateAuditLogRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAuditLogRef:
```typescript
const name = createAuditLogRef.operationName;
console.log(name);
```

### Variables
The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateAuditLogVariables {
  action: string;
  severity: string;
  userId?: string | null;
  details?: string | null;
}
```
### Return Type
Recall that executing the `CreateAuditLog` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAuditLogData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAuditLogData {
  auditLog_insert: AuditLog_Key;
}
```
### Using `CreateAuditLog`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAuditLog, CreateAuditLogVariables } from '@firebasegen/default-connector';

// The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`:
const createAuditLogVars: CreateAuditLogVariables = {
  action: ..., 
  severity: ..., 
  userId: ..., // optional
  details: ..., // optional
};

// Call the `createAuditLog()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAuditLog(createAuditLogVars);
// Variables can be defined inline as well.
const { data } = await createAuditLog({ action: ..., severity: ..., userId: ..., details: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAuditLog(dataConnect, createAuditLogVars);

console.log(data.auditLog_insert);

// Or, you can use the `Promise` API.
createAuditLog(createAuditLogVars).then((response) => {
  const data = response.data;
  console.log(data.auditLog_insert);
});
```

### Using `CreateAuditLog`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAuditLogRef, CreateAuditLogVariables } from '@firebasegen/default-connector';

// The `CreateAuditLog` mutation requires an argument of type `CreateAuditLogVariables`:
const createAuditLogVars: CreateAuditLogVariables = {
  action: ..., 
  severity: ..., 
  userId: ..., // optional
  details: ..., // optional
};

// Call the `createAuditLogRef()` function to get a reference to the mutation.
const ref = createAuditLogRef(createAuditLogVars);
// Variables can be defined inline as well.
const ref = createAuditLogRef({ action: ..., severity: ..., userId: ..., details: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAuditLogRef(dataConnect, createAuditLogVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.auditLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.auditLog_insert);
});
```

