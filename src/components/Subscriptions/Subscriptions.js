import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fromJS, mergeDeep } from "immutable";

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
    path: {
      endpoint: "subscription.php"
    },
    params: {
      queryParams: {
        action: "list"
      }
    },
    result: {
      data: {},
      message: "Loading subscriptions"
    }
  }
};

/**
 * Handles the result of the API call
 */
const handler = (data, error) => {
  //
};

/**
 * Displays the component
 */
const Subscriptions = props => {
  const { apiCall } = props;
  const token = "Should come from auth";

  const [subscriptions, setSubscriptions] = useState({});
  const [message, setMessage] = useState("No message");

  const params = mergeDeep(
    fromJS(useAPIDefaultProps),
    fromJS(apiCall),
    fromJS({
      params: { init: { body: JSON.stringify({ token: token }) } },
      result: { handler: handler }
    })
  ).toJS();

  const { data } = useAPI(params);

  useEffect(() => {
    setSubscriptions(data);
    setMessage("Ola!");
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
