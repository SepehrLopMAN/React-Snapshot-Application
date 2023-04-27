import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Snapshot app", () => {
  render(<App />);
  const linkElement = screen.getByText(/Snapshot/i);
  expect(linkElement).toBeInTheDocument();
});
