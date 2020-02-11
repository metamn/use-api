import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fromJS, mergeDeep } from "immutable";

import {
  useAPI,
  useAPIPropTypes,
  useAPIDefaultProps,
  isApiError,
  getApiErrorMessage
} from "../../hooks";

/**
 * Defines the prop types
 */
const propTypes = {
  apiCall: PropTypes.shape(useAPIPropTypes)
};

/**
 * Defines the default props
 */
const defaultProps = {
  apiCall: {
    path: {
      endpoint: "register"
    },
    params: {
      queryParams: {
        name: "test2",
        email: "test2@test.com",
        password: "test12345",
        recaptcha_ignore: "293kwlxh"
      }
    },
    defaultData: "Registering ..."
  }
};

/**
 * Displays the component
 */
const Register = props => {
  const { apiCall } = props;

  const [results, setResults] = useState({});
  const [message, setMessage] = useState("No message");

  const params = mergeDeep(fromJS(useAPIDefaultProps), fromJS(apiCall)).toJS();
  const { data } = useAPI(params);

  useEffect(() => {
    if (isApiError(data)) {
      setMessage(getApiErrorMessage(data));
    } else {
      setResults(data);
      setMessage("API request was successful");
    }
  }, [data]);

  return (
    <div className="Register">
      <h3>Register</h3>
      <ul>
        <li>Register: {JSON.stringify(results)}</li>
        <li>Message: {JSON.stringify(message)}</li>
      </ul>
    </div>
  );
};

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
export { propTypes as RegisterPropTypes, defaultProps as RegisterDefaultProps };
