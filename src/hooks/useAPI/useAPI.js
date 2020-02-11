import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";

import useData, { useDataPropTypes, getUseDataHookProps } from "../useData";

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
  }
};

/**
 * The API specific fetcher function
 */
const fetcher = async ({ params }) => {
  const { init, queryParams } = params;

  const encodedQueryParams = queryParams
    ? `?${queryString.stringify(queryParams)}`
    : "";
  const pathToResource = `${url}/${version}/${endpoint}${encodedQueryParams}`;

  const response = await fetch(pathToResource, init);

  if (response && response.status === "error")
    throw new Error(`Error: ${response}`);

  return response.json();
};

/**
 * Displays the component
 */
const useAPI = props => {
  const [result, setResult] = useState(null);

  const { data, error } = useData(props);

  useEffect(() => {}, [data, error]);

  return result;
};

useAPI.propTypes = propTypes;
useAPI.defaultProps = defaultProps;

export default useAPI;
export { propTypes as useAPIPropTypes, defaultProps as useAPIDefaultProps };
