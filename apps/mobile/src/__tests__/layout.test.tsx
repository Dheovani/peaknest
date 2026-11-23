import React from "react";
import { render } from "@testing-library/react-native";
import RootLayout from "../app/_layout";

jest.mock("expo-router", () => ({ Stack: () => null }));
jest.mock("expo-status-bar", () => ({ StatusBar: () => null }));

test("mounts the native root layout", async () => {
  expect((await render(<RootLayout />)).toJSON()).toBeNull();
});
