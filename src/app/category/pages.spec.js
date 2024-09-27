import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CategoryPage from "./page";
import { db } from "../../lib/db";

jest.mock("next/navigation");

// Mock db.category.findMany
jest.mock("../../lib/db", () => ({
  db: {
    category: {
      findMany: jest.fn(),
    },
  },
}));

describe("CategoryPage", () => {
  it("renders categories correctly", async () => {
    // Mock data categories
    const mockCategories = [
      { id: 1, name: "Category 1", created_at: new Date("2024-07-15") },
      { id: 2, name: "Category 2", created_at: new Date("2024-07-16") },
    ];

    // Mock implementation for db.category.findMany
    db.category.findMany.mockResolvedValue(mockCategories);

    // Render CategoryPage
    render(await (async () => await CategoryPage())());

    // Wait for categories to be loaded
    const category1 = await screen.findByText("Category 1");
    const category2 = await screen.findByText("Category 2");

    // Assertions
    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
  });
});
