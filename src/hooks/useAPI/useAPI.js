import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";

/**
 * Defines the prop types
 */
const propTypes = {
  url: PropTypes.string,
  version: PropTypes.string,
  endpoint: PropTypes.string,
  fetchParams: PropTypes.shape({
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
  url: "http://api.finsterdata.com",
  version: "v1",
  endpoint: "login",
  fetchParams: {
    init: {},
    queryParams: {}
  }
};

/**
 * The API specific fetcher function
 */
const fetcher = async ({ fetchParams }) => {
  const { init, queryParams } = fetchParams;

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
  return <div className="useAPI">useAPI</div>;
};

useAPI.propTypes = propTypes;
useAPI.defaultProps = defaultProps;

export default useAPI;
export { propTypes as useAPIPropTypes, defaultProps as useAPIDefaultProps };
