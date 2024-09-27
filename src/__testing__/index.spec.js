import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
// import { useRouter } from "next/navigation";
import HomePage from "../app/testing/page";

//Mock useRouter Hook
const mockRouter = {
  push: jest.fn(),
  refresh: jest.fn(),
};

//Melakukan mocking untuk next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));
describe("Testing Page", () => {
  it("Renders testing page correctly", () => {
    //Render komponen Home
    render(<HomePage />);
    //Assertions
    expect(screen.getByText("Welcome to Next.js App")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("Navigates to About Page on Button Click", () => {
    //Render komponen HomePage
    render(<HomePage />);
    //Simulasi klik pada tombol "Go to About"
    fireEvent.click(screen.getByText("Go to About"));
    //Assertions
    expect(mockRouter.push).toHaveBeenCalledWith("/about");
  });
});
