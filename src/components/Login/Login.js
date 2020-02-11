import React from "react";
import PropTypes from "prop-types";

import { useAPI } from "../../hooks";

/**
 * Defines the prop types
 */
const propTypes = {};

/**
 * Defines the default props
 */
const defaultProps = {};

/**
 * Displays the component
 */
const Login = props => {
  return <div className="Login">Login</div>;
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
export { propTypes as LoginPropTypes, defaultProps as LoginDefaultProps };
