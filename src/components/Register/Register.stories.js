import React from "react";
import Register from "./Register";
import ApiDoc from "./Register.md";

export default {
  component: Register,
  title: "Register",
  parameters: { notes: ApiDoc }
};

export const Default = () => <Register />;
