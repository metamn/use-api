import React from "react";
import { render } from "@testing-library/react";
import Subscriptions from "./Subscriptions";

it("has a Subscriptions component", () => {
  const { getByText } = render(<Subscriptions />);
  expect(getByText("Subscriptions")).toBeInTheDocument();
});
