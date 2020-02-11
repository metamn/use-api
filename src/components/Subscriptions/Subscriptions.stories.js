import React from "react";
import Subscriptions from "./Subscriptions";
import ApiDoc from "./Subscriptions.md";

export default {
  component: Subscriptions,
  title: "Subscriptions",
  parameters: { notes: ApiDoc }
};

export const Default = () => <Subscriptions />;
