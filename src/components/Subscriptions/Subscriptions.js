import React from "react";
import PropTypes from "prop-types";

import { useAPI, useAPIPropTypes, useAPIDefaultProps } from "../../hooks";

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
    ...useAPIDefaultProps,
    path: {
      endpoint: "subscription.php?action=list"
    },
    result: {
      message: "Loading subscriptions"
    }
  }
};

/**
 * Displays the component
 */
const Subscriptions = props => {
  const { apiCall } = props;
  const token = "Should come from auth";

  const result = useAPI({
    ...apiCall,
    params: { init: { body: JSON.stringify(token) } }
  });

  const { data, message } = result;

  return (
    <div className="Subscriptions">
      <h3>Subscriptions</h3>
      <ul>
        <li>Data: {data}</li>
        <li>Message: {message}</li>
      </ul>
    </div>
  );
};

Subscriptions.propTypes = propTypes;
Subscriptions.defaultProps = defaultProps;

export default Subscriptions;
export {
  propTypes as SubscriptionsPropTypes,
  defaultProps as SubscriptionsDefaultProps
};
