import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";

it("has a Login component", () => {
  const { getByText } = render(<Login />);
  expect(getByText("Login")).toBeInTheDocument();
});
