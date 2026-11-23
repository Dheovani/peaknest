import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Button } from "../../../../packages/ui-mobile/src/button";

test("native button exposes an action and handles a press", async () => {
  const onPress = jest.fn();
  await render(<Button label="Continuar" onPress={onPress} />);
  fireEvent.press(screen.getByRole("button", { name: "Continuar" }));
  expect(onPress).toHaveBeenCalledTimes(1);
});
