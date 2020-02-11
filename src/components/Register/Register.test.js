import React from "react";
import { render } from "@testing-library/react";
import Register from "./Register";

it("has a Register component", () => {
  const { getByText } = render(<Register />);
  expect(getByText("Register")).toBeInTheDocument();
});
