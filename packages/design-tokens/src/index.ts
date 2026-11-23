export const tokens = {
  color: {
    light: {
      background: "#f8fafc",
      foreground: "#142532",
      primary: "#166534",
      surface: "#ffffff",
      muted: "#475569",
    },
    dark: {
      background: "#0b141b",
      foreground: "#f1f5f9",
      primary: "#4ade80",
      surface: "#17232d",
      muted: "#a5b4c2",
    },
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  radius: { sm: 8, md: 12, lg: 18 },
  typography: { body: 16, title: 28 },
} as const;
