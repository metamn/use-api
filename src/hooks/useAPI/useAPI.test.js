import React from "react";
import { render } from "@testing-library/react";
import useAPI from "./useAPI";

it("has a useAPI component", () => {
  const { getByText } = render(<useAPI />);
  expect(getByText("useAPI")).toBeInTheDocument();
});
