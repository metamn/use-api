import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { Map, fromJS } from "immutable";

import useData, { getUseDataHookProps } from "../useData";

/**
 * Defines the prop types
 */
const propTypes = {
  path: PropTypes.shape({
    url: PropTypes.string,
    version: PropTypes.string,
    endpoint: PropTypes.string
  }),
  params: PropTypes.shape({
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    init: PropTypes.object,
    queryParams: PropTypes.object
  }),
  result: PropTypes.shape({
    data: PropTypes.object,
    initialData: PropTypes.object,
    message: PropTypes.string,
    handler: PropTypes.func
  })
};

/**
 * Defines the default props
 */
const defaultProps = {
  path: {
    url: "http://api.finsterdata.com",
    version: "v1",
    endpoint: "login"
  },
  params: {
    init: {},
    queryParams: {}
  },
  result: {
    data: {},
    message: "Default message",
    initialData: {},
    handler: () => {
      console.log("Default result handler");
    }
  }
};

/**
 * Checks is the request response is an error
 *
 * - This is highly API specific
 */
const isResponseError = response => {
  return response?.status === "error";
};

/**
 * A general fetcher function
 *
 * - Both `SWR` and `react-async` are built on `fetch`
 */
const fetcher = async ({ props }) => {
  const { path, params } = props;
  const { url, version, endpoint } = path;
  const { init, queryParams } = params;

  const encodedQueryParams = Map.isMap(fromJS(queryParams))
    ? `?${queryString.stringify(queryParams)}`
    : "";
  const pathToResource = `${url}/${version}/${endpoint}${encodedQueryParams}`;

  // TODO: With the second argument (init) fetch is not working
  const response = await fetch(pathToResource);

  /**
   * - `response` is standard, not API specific
   * - the error thrown can be catched in the `error` result of `useData` (THIS IS NOT SURE)
  if (!response.ok)
    throw new Error(
      `Network response was not ok (${response.status} - ${response.statusText} error).`
    );
*/

  return response.json();
};

/**
 * Displays the component
 */
const useAPI = props => {
  const { path, params, result } = props;
  const { data: defaultData, initialData, message, handler } = result;

  let ret = {
    data: defaultData,
    message: message
  };

  /**
   * This is useData strategy specific ...
   * // TODO: Make it strategy independent
   */
  const { data, error } = useData(
    getUseDataHookProps({
      options: {
        promiseFn: fetcher,
        promiseFnParams: { props: { path: path, params: params } },
        initialValue: initialData
      }
    })
  );

  useEffect(() => {
    if (error) {
      console.log("err");
      ret = {
        data: defaultData,
        message: JSON.stringify(error)
      };
      console.log("ret:", ret);
    } else {
      //ret = handler(data, error);
    }
  }, [data, error]);

  return ret;
};

useAPI.propTypes = propTypes;
useAPI.defaultProps = defaultProps;

export default useAPI;
export { propTypes as useAPIPropTypes, defaultProps as useAPIDefaultProps };
