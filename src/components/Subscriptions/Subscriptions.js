import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import {
  useAPI,
  useAPIPropTypes,
  isApiError,
  getApiErrorMessage,
  mergeApiParams
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
      endpoint: "subscription.php"
    },
    params: {
      queryParams: {
        action: "list"
      }
    },
    defaultData: "Loading subscriptions"
  }
};

/**
 * Displays the component
 */
const Subscriptions = props => {
  const { apiCall } = props;
  const token = "Should come from auth";

  const [subscriptions, setSubscriptions] = useState({});
  const [message, setMessage] = useState("No message");

  const params = mergeApiParams({
    requestProps: apiCall,
    requestLiveProps: {
      params: { init: { body: JSON.stringify({ token: token }) } }
    }
  });
  const { data } = useAPI(params);

  useEffect(() => {
    if (isApiError(data)) {
      setMessage(getApiErrorMessage(data));
    } else {
      setSubscriptions(data);
      setMessage("API request was successful");
    }
  }, [data]);

  return (
    <div className="Subscriptions">
      <h3>Subscriptions</h3>
      <ul>
        <li>Subscriptions: {JSON.stringify(subscriptions)}</li>
        <li>Message: {JSON.stringify(message)}</li>
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
