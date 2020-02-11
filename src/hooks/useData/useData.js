/**
 * A hook for working with data
 *
 * @see useData.md
 */
import PropTypes from "prop-types";

/**
 * Imports a strategy / library.
 *
 * - This can be replaced anytime
 */
import useDataAsync, {
  useDataAsyncPropTypes,
  useDataAsyncDefaultProps,
  getHookPropsUseDataAsync,
  getInitialValueUseDataAsync
} from "./strategies/useDataAsync";

/**
 * Defines the prop types
 */
const propTypes = PropTypes.shape(useDataAsyncPropTypes);

/**
 * Defines the default props
 */
const defaultProps = useDataAsyncDefaultProps;

/**
 * Implements the hook
 */
const useData = props => {
  /**
   * Prepares the props
   *
   * - This step has to be performed to map a strategy to the hook code below
   */
  const initialValue = getInitialValueUseDataAsync(props);
  const hookProps = getHookPropsUseDataAsync(props);

  /**
   * Prepares a timestamp
   *
   * Sometimes after an API call the data is not changed, ie the same data is returned.
   * In this case the UI is not refreshed with `useEffect(()=>{...}, [data])`
   * If one wants to refresh the UI timestamp can help: `useEffect(()=>{...}, [data, timestamp])`
   */
  const timestamp = +new Date();

  /**
   * Queries the API
   */
  const { data, error, reload, cancel } = useDataAsync(hookProps);

  /**
   * Returns default data while real data is loaded from the API
   */
  if (data === undefined) {
    return { data: initialValue, error, reload, cancel, timestamp };
  }

  /**
   * Returns the error
   */
  if (error) {
    return { data: null, error, reload, cancel, timestamp };
  }

  /**
   * Returns data and functions
   */
  return { data: data, reload, cancel, timestamp };
};

useData.propTypes = propTypes;
useData.defaultProps = defaultProps;

export default useData;
export {
  propTypes as useDataPropTypes,
  defaultProps as useDataDefaultProps,
  getHookPropsUseDataAsync as getUseDataHookProps,
  getInitialValueUseDataAsync as getUseDataInitialValue
};
