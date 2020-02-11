import React from "react";
import useAPI from "./useAPI";
import ApiDoc from "./useAPI.md";

export default {
  component: useAPI,
  title: "useAPI",
  parameters: { notes: ApiDoc }
};

export const Default = () => <useAPI />;
