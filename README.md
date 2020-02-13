# use-api

A React hook for REST APIs.

## Why?

- REST is more complicated than GraphQL
- Both of them are built on a hook like `use-data` but managing REST API calls are more verbose
- This hook tries to abstract that verbosity away and offer slim components also for REST APIs.

See the [Examples](#examples) for details

## Approach

- It's not a general, reusable hook (as expected) but a general, reusable way to handle REST APIs
- For every new API this hook has to be customized. But the general logic, the hook skeleton stays the same fro API to API

## This project

Gives you the API hook set up for a special API (`/src/hooks/useAPI`) and the test components for login, register etc in `src/components`.

## Usage

1. Copy the `src/hooks` folder into your app
2. Set up the API according to your needs.
3. Use it as seen in the test components.

## Examples

### GraphQL

Done in a few easy steps:

1. Setup the call
2. Do the call
3. Parse the results: the data received will follow the shape of the setup

```js
// In GraphQL an API call is simple like:

/**
 * Defines the database query.
 */
const query = gql`
  query Categories($hideEmpty: Boolean) {
    categories(where: { hideEmpty: $hideEmpty, orderby: TERM_ORDER }) {
      edges {
        node {
          ...CategoryNode
        }
      }
    }
  }
`;

/**
 * Loads data from the database.
 */
const Categories = props => {
  const { edges, variables } = props;

  return useData(edges, query, "categories", variables);
};
```

### REST

Done in a few more steps:

1. Set up the call with data loader library specific params
2. Extend the data loader library with an API specific fetcher
3. Do the call
4. Parse the results:
   - Parse the status part of the result
   - Parse the data part of the result; shape unknown

```js
// REST APIs are more complicated

/**
 * API specific fetcher
 */
const fetcherLogin = async ({ user }) => {
  const encodedParams = queryString.stringify(user);

  const response = await fetch(`http://api.xxxx.com/v1/login?${encodedParams}`);

  if (response && response.status === "error")
    throw new Error(`Error: ${response}`);

  return response.json();
};

/**
 * Data loader specific setup (`react-async`, in this example)
 */
const options = {
  promiseFn: fetcherLogin,
  promiseFnParams: { user: user },
  initialValue: { message: "Logging in ..." },
  watch: user
};

/**
 * Performs an API call
 */
const { data, error, timestamp } = useData(options);

/**
 * Special parsing of the `data` part of the `response`
 * - The `status` part of the `response` has to be also parsed, it is done elsewhere
 */
const authenticated = data.status === "ok";
const token = data.token ? data.token : "";
```

### `useAPI()`

Done - again - in a few easy steps:

1. Setup the call
2. Do the call
3. Parse the results: the data received will follow the shape of the setup

```js
// with `use-api` REST API calls become simple again

/**
 * Defines the default props
 */
const defaultProps = {
  apiCall: {
    path: {
      endpoint: "login"
    },
    params: {
      queryParams: {
        email: "xxx@xxx.xxx",
        password: "test123"
      }
    },
    defaultData: "Logging in ..."
  }
};

/**
 * Do the call
 */
const { data } = useAPI(params);

/**
 * Handling response status, etc is done with helpers abstracted into `useAPI`
 */
useEffect(() => {
  if (isApiError(data)) {
    ...
  } else {
    ....
  }
}, [data]);
```
