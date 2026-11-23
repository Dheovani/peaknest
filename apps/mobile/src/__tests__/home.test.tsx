import React from "react";
import { render, screen } from "@testing-library/react-native";
import * as ReactNative from "react-native";
import HomeScreen from "../app/index";

test("shows the Portuguese foundation state and unavailable action", async () => {
  await render(<HomeScreen />);
  expect(
    screen.getByRole("header", { name: "Seu treino, no seu ritmo." }),
  ).toBeTruthy();
  expect(
    screen.getByRole("button", { name: "Entrar em breve" }).props
      .accessibilityState?.disabled,
  ).toBe(true);
});

test("uses the dark palette when the device is dark", async () => {
  jest.spyOn(ReactNative, "useColorScheme").mockReturnValue("dark");
  await render(<HomeScreen />);
  expect(
    screen.getByRole("header", { name: "Seu treino, no seu ritmo." }),
  ).toBeTruthy();
});
