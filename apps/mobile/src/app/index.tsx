import { View, Text, useColorScheme } from "react-native";
import { Button } from "@peaknest/ui-mobile/button";
import { ptBR } from "@peaknest/config/messages";
import { tokens } from "@peaknest/design-tokens";

const copy = ptBR.foundation;

export default function HomeScreen() {
  const mode = useColorScheme() === "dark" ? "dark" : "light";
  const colors = tokens.color[mode];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: tokens.spacing.lg,
        gap: tokens.spacing.lg,
        backgroundColor: colors.background,
      }}
    >
      <Text
        accessibilityRole="header"
        style={{
          color: colors.foreground,
          fontSize: tokens.typography.title,
          fontWeight: "700",
        }}
      >
        {copy.title}
      </Text>
      <Text
        style={{
          color: colors.muted,
          fontSize: tokens.typography.body,
          lineHeight: 24,
        }}
      >
        {copy.description}
      </Text>
      <Button label={copy.action} disabled accessibilityLabel={copy.action} />
    </View>
  );
}
