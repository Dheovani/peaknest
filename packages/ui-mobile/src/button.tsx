import { Pressable, Text, type PressableProps } from "react-native";
import { tokens } from "@peaknest/design-tokens";

export function Button({
  label,
  ...props
}: PressableProps & { label: string }) {
  return (
    <Pressable
      accessibilityRole="button"
      className="min-h-11 items-center justify-center"
      style={{
        minHeight: 44,
        backgroundColor: tokens.color.light.primary,
        borderRadius: tokens.radius.md,
        paddingHorizontal: tokens.spacing.md,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: tokens.typography.body,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
