import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders border-radius app", () => {
  render(<App />);
  const linkElement = screen.getByText(/Fancy-Border-Radius/i);
  expect(linkElement).toBeInTheDocument();
});
