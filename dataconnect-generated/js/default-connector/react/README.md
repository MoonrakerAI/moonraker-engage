# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`default-connector/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/default-connector/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetConversations*](#getconversations)
  - [*GetAllConversations*](#getallconversations)
  - [*GetAuditLogs*](#getauditlogs)
- [**Mutations**](#mutations)
  - [*CreateConversation*](#createconversation)
  - [*CreateAuditLog*](#createauditlog)

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `default`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `default` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetConversations
You can execute the `GetConversations` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetConversations(dc: DataConnect, vars: GetConversationsVariables, options?: useDataConnectQueryOptions<GetConversationsData>): UseDataConnectQueryResult<GetConversationsData, GetConversationsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetConversations(vars: GetConversationsVariables, options?: useDataConnectQueryOptions<GetConversationsData>): UseDataConnectQueryResult<GetConversationsData, GetConversationsVariables>;
```

### Variables
The `GetConversations` Query requires an argument of type `GetConversationsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetConversationsVariables {
  userId: string;
}
```
### Return Type
Recall that calling the `GetConversations` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetConversations` Query is of type `GetConversationsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetConversationsData {
  conversations: ({
    id: string;
    message: string;
    response: string;
    createdAt: TimestampString;
  } & Conversation_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetConversations`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetConversationsVariables } from '@firebasegen/default-connector';
import { useGetConversations } from '@firebasegen/default-connector/react'

export default function GetConversationsComponent() {
  // The `useGetConversations` Query hook requires an argument of type `GetConversationsVariables`:
  const getConversationsVars: GetConversationsVariables = {
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetConversations(getConversationsVars);
  // Variables can be defined inline as well.
  const query = useGetConversations({ userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetConversations(dataConnect, getConversationsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetConversations(getConversationsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetConversations(dataConnect, getConversationsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.conversations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAllConversations
You can execute the `GetAllConversations` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetAllConversations(dc: DataConnect, options?: useDataConnectQueryOptions<GetAllConversationsData>): UseDataConnectQueryResult<GetAllConversationsData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAllConversations(options?: useDataConnectQueryOptions<GetAllConversationsData>): UseDataConnectQueryResult<GetAllConversationsData, undefined>;
```

### Variables
The `GetAllConversations` Query has no variables.
### Return Type
Recall that calling the `GetAllConversations` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAllConversations` Query is of type `GetAllConversationsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAllConversations`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { useGetAllConversations } from '@firebasegen/default-connector/react'

export default function GetAllConversationsComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAllConversations();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAllConversations(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllConversations(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAllConversations(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.conversations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAuditLogs
You can execute the `GetAuditLogs` Query using the following Query hook function, which is defined in [default-connector/react/index.d.ts](./index.d.ts):

```javascript
useGetAuditLogs(dc: DataConnect, vars?: GetAuditLogsVariables, options?: useDataConnectQueryOptions<GetAuditLogsData>): UseDataConnectQueryResult<GetAuditLogsData, GetAuditLogsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAuditLogs(vars?: GetAuditLogsVariables, options?: useDataConnectQueryOptions<GetAuditLogsData>): UseDataConnectQueryResult<GetAuditLogsData, GetAuditLogsVariables>;
```

### Variables
The `GetAuditLogs` Query has an optional argument of type `GetAuditLogsVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAuditLogsVariables {
  limit?: number | null;
}
```
### Return Type
Recall that calling the `GetAuditLogs` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAuditLogs` Query is of type `GetAuditLogsData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAuditLogs`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAuditLogsVariables } from '@firebasegen/default-connector';
import { useGetAuditLogs } from '@firebasegen/default-connector/react'

export default function GetAuditLogsComponent() {
  // The `useGetAuditLogs` Query hook has an optional argument of type `GetAuditLogsVariables`:
  const getAuditLogsVars: GetAuditLogsVariables = {
    limit: ..., // optional
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAuditLogs(getAuditLogsVars);
  // Variables can be defined inline as well.
  const query = useGetAuditLogs({ limit: ..., });
  // Since all variables are optional for this Query, you can omit the `GetAuditLogsVariables` argument.
  // (as long as you don't want to provide any `options`!)
  const query = useGetAuditLogs();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAuditLogs(dataConnect, getAuditLogsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAuditLogs(getAuditLogsVars, options);
  // If you'd like to provide options without providing any variables, you must
  // pass `undefined` where you would normally pass the variables.
  const query = useGetAuditLogs(undefined, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAuditLogs(dataConnect, getAuditLogsVars /** or undefined */, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.auditLogs);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `default` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## CreateConversation
You can execute the `CreateConversation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateConversation(options?: useDataConnectMutationOptions<CreateConversationData, FirebaseError, CreateConversationVariables>): UseDataConnectMutationResult<CreateConversationData, CreateConversationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateConversation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateConversationData, FirebaseError, CreateConversationVariables>): UseDataConnectMutationResult<CreateConversationData, CreateConversationVariables>;
```

### Variables
The `CreateConversation` Mutation requires an argument of type `CreateConversationVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateConversationVariables {
  userId: string;
  sessionId: string;
  message: string;
  response: string;
}
```
### Return Type
Recall that calling the `CreateConversation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateConversation` Mutation is of type `CreateConversationData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateConversationData {
  conversation_insert: Conversation_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateConversation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateConversationVariables } from '@firebasegen/default-connector';
import { useCreateConversation } from '@firebasegen/default-connector/react'

export default function CreateConversationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateConversation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateConversation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateConversation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateConversation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateConversation` Mutation requires an argument of type `CreateConversationVariables`:
  const createConversationVars: CreateConversationVariables = {
    userId: ..., 
    sessionId: ..., 
    message: ..., 
    response: ..., 
  };
  mutation.mutate(createConversationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., sessionId: ..., message: ..., response: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createConversationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.conversation_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateAuditLog
You can execute the `CreateAuditLog` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [default-connector/react/index.d.ts](./index.d.ts)):
```javascript
useCreateAuditLog(options?: useDataConnectMutationOptions<CreateAuditLogData, FirebaseError, CreateAuditLogVariables>): UseDataConnectMutationResult<CreateAuditLogData, CreateAuditLogVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateAuditLog(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAuditLogData, FirebaseError, CreateAuditLogVariables>): UseDataConnectMutationResult<CreateAuditLogData, CreateAuditLogVariables>;
```

### Variables
The `CreateAuditLog` Mutation requires an argument of type `CreateAuditLogVariables`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateAuditLogVariables {
  action: string;
  severity: string;
  userId?: string | null;
  details?: string | null;
}
```
### Return Type
Recall that calling the `CreateAuditLog` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateAuditLog` Mutation is of type `CreateAuditLogData`, which is defined in [default-connector/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateAuditLogData {
  auditLog_insert: AuditLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateAuditLog`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateAuditLogVariables } from '@firebasegen/default-connector';
import { useCreateAuditLog } from '@firebasegen/default-connector/react'

export default function CreateAuditLogComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateAuditLog();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateAuditLog(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAuditLog(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAuditLog(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateAuditLog` Mutation requires an argument of type `CreateAuditLogVariables`:
  const createAuditLogVars: CreateAuditLogVariables = {
    action: ..., 
    severity: ..., 
    userId: ..., // optional
    details: ..., // optional
  };
  mutation.mutate(createAuditLogVars);
  // Variables can be defined inline as well.
  mutation.mutate({ action: ..., severity: ..., userId: ..., details: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createAuditLogVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.auditLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

