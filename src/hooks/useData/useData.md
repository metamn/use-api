# useData

React data hook with pluggable strategies

## Why another library?

- The official [Suspense for data fetching](https://reactjs.org/docs/concurrent-mode-suspense.html) is experimental at this moment
- What's left is to use similar libraries (strategies) like SWR or `react-async`

## Approach

1. Build a general data hook
2. Integrate any library (strategy) like:

  - SWR
  - react-async
  - and more

No matter the strategy used the hook should always work the same way and return the same params.

1. Returns default data while real data is loaded from the API
2. Returns errors, if there are any
3. Returns the data once loaded from the API

## Strategies

Currently these strategies are implemented:

### react-async

See the [hook docs](../strategies/useDataAsync/useDataAsync.md) for details.

### useSWR

- https://swr.now.sh/
- It's complicated due to the cache. Sometimes the UI is not refreshed even if in the network tab we have a successful request returning status code 200.
