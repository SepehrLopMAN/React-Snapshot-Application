import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Snap Shot app", () => {
  render(<App />);
  const linkElement = screen.getByText(/Snap Shot/i);
  expect(linkElement).toBeInTheDocument();
});
