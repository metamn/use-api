import PropTypes from "prop-types";

import { useAsync } from "react-async";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * `useAsync` specific options
   *
   * @see https://docs.react-async.com/api/interfaces#useasync-hook
   */
  options: PropTypes.shape({
    /**
     * The fetcher function
     */
    promiseFn: PropTypes.func,
    /**
     * Params for the fetcher function, if any
     */
    promiseFnParams: PropTypes.any,
    /**
     * The default / initial data to be returned
     */
    initialValue: PropTypes.any,
    /**
     * Force the call if this value is changed.
     *
     * - Sometimes `useData` doesn't fetch the data just returns a cached value.
     * - To make it always fetch this `watch` prop can be used.
     * - Example: on consecutive logins only the first login does an XHR call. When the login credentials are passed through `watch` the XHR call is always done.
     *
     * - Caveat: because of referntial integrity checks consecutive calls with the same `watch` param might do an XHR call every time. To solve the problem use `watchFn` instead of `watch`.
     * Example: on consecutive logins with the same working credentials and `watch` holding these credential in all cases an XHR call is made. Instead only one XHR call should be made.
     *
     * @see https://docs.react-async.com/api/options#watch
     */
    watch: PropTypes.any
  })
};

/**
 * Defines the default props
 *
 * - These options are mandatory
 */
const defaultProps = {
  options: {
    promiseFn: () => console.log("Fetcher function for useDataAsync"),
    promiseFnParams: {},
    initialValue: "Loading ....",
    watch: null
  }
};

/**
 * Returns the initial value
 *
 * - Used in `useData` for mapping `initialValue`
 */
const getInitialValue = props => {
  const { options } = props;
  const { initialValue } = options;

  return initialValue;
};

/**
 * Returns the params to call the hook
 *
 * - Used in `useData` for mapping the params of the hook
 */
const getHookProps = props => {
  const { options } = props;

  return { options: options };
};

/**
 * Defines the hook functionality
 */
const useDataAsync = props => {
  const { options } = props;
  const { promiseFn, promiseFnParams, watch } = options;

  /**
   * Runs the query and returns various values
   *
   * @see https://docs.react-async.com/api/state - for return values
   * @see https://docs.react-async.com/guide/async-components#more-flexibility-with-useasync - for useAsync example
   */
  const { data, error, reload, cancel } = useAsync({
    promiseFn: promiseFn,
    watch: watch,
    ...promiseFnParams
  });

  return { data, error, reload, cancel };
};

useDataAsync.propTypes = propTypes;
useDataAsync.defaultProps = defaultProps;

export default useDataAsync;
export {
  propTypes as useDataAsyncPropTypes,
  defaultProps as useDataAsyncDefaultProps,
  getHookProps as getHookPropsUseDataAsync,
  getInitialValue as getInitialValueUseDataAsync
};
