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
  if (!(data && data.status)) {
    const message = error ? JSON.stringify(error) : "Loading ...";
    return { data: {}, message: message };
  }

  const plan_id = data.plan_id
    ? `Plan id: ${data.plan_id}`
    : "No plan id for this account";

  const message = data.message
    ? data.message
    : data.user_message
    ? data.user_message
    : "No message from the API";

  return { data: plan_id, message: message };
};

/**
 * Displays the component
 */
const Subscriptions = props => {
  const { apiCall } = props;
  const token = "Should come from auth";

  const [subscriptions, setSubscriptions] = useState({
    data: {},
    message: "Loading subscriptions"
  });

  const params = mergeDeep(
    fromJS(useAPIDefaultProps),
    fromJS(apiCall),
    fromJS({
      params: { init: { body: JSON.stringify({ token: token }) } },
      result: { handler: handler }
    })
  ).toJS();

  const { data, message } = useAPI(params);

  useEffect(() => {
    console.log("subscription msg:", message);
  }, [data, message]);

  return (
    <div className="Subscriptions">
      <h3>Subscriptions</h3>
      <ul>
        <li>Data: {JSON.stringify(data)}</li>
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
