I believe it is necessary to think about two concepts:

Server State vs Client State.

Client State is everything that has the app as its origin, like a toggle, opening a modal, etc. So for that React.useState/React.useReducer is enough. Also, to share indirectly down the tree, React.Context solves the problem.

Server State is all the state that the server has as its origin, such as the price of coins, user information, etc. Therefore, for this type of state, using libraries such as SWR/React Query is the simplest way to have requests on the client with a layer of caching above the entire application, which is automatically shared to any part of your application that you want to consume. In addition, these libraries have forms of data prefetch, which means that we can populate the initial "cache" of the request with data fetched from the server. This is extremely useful, for example, for us to know how many coins and what coins they are and display them in the first painting of the screen and in the client to update, showing the most updated prices. Or even, for requests that don't update frequently, we can fetch this data only from the server and we don't need to do anything on the client.

Finally, multiple providers around the application is something we should avoid. So using the in-memory cache on the client (SWR/React Query) as a way to share the Server State is the simplest, easiest and most performant way to deal with this type of situation. (same strategy used by any GraphQL clients). Thus, making the use of React.Context less necessary, making the actual status management simple and predictable.

Also, before I forget, with mutations, using these tools to create this cache layer, we can perform Optimistic UI in a simpler way, because we can only update the cache with the request in the background.
