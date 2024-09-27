import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductPage from "./page";
import { db } from "../../lib/db";

jest.mock("next/navigation");

// Mock db.product.findMany
jest.mock("../../lib/db", () => ({
  db: {
    product: {
      findMany: jest.fn(),
    },
  },
}));

describe("ProductPage", () => {
  it("renders categories correctly", async () => {
    // Mock data categories
    const mockProduct = [
      {
        id: 1,
        title: "Product 1",
        price: 1000,
        description: "Desc 1",
        category_id: 1,
        company: "Company 1",
        user_id: 1,
        stock: 100,
        shipping: true,
        featured: true,
        colors: ["#ff0000"],
        images: [
          "1725246109623anniversary-celebration-32nd-6904d39b-a6d1-4f04-af71-30b6ce78e18e.jpg",
        ],
        created_at: new Date("2024-07-15"),
        category: { name: "Perkakas" },
      },
      {
        id: 2,
        title: "Product 2",
        price: 2000,
        description: "Desc 2",
        category_id: 2,
        company: "Company 2",
        user_id: 2,
        stock: 200,
        shipping: true,
        featured: true,
        colors: ["#ff0000"],
        images: [
          "1725246109623anniversary-celebration-32nd-6904d39b-a6d1-4f04-af71-30b6ce78e18e.jpg",
        ],
        created_at: new Date("2024-07-16"),
        category: { name: "Perkakas" },
      },
    ];

    // Mock implementation for db.product.findMany
    db.product.findMany.mockResolvedValue(mockProduct);

    // Render ProductPage
    render(await (async () => await ProductPage())());

    // Wait for categories to be loaded
    const product1 = await screen.findByText("Product 1");
    const product2 = await screen.findByText("Product 2");

    // Assertions
    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });
});
