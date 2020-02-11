import React from "react";
import Login from "./Login";
import ApiDoc from "./Login.md";

export default {
  component: Login,
  title: "Login",
  parameters: { notes: ApiDoc }
};

export const Default = () => <Login />;
