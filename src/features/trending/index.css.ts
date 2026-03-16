import { style } from "@vanilla-extract/css";
import { colorVars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  "@media": {
    "screen and (min-width: 640px)": {
      gap: "1rem",
    },
  },
});

export const loading = style({
  color: colorVars.zinc500,
});

export const errorBox = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  borderRadius: "0.5rem",
  border: `1px solid var(${colorVars.rose200})`,
  background: colorVars.rose100,
  padding: "1rem",
});

export const errorTitle = style({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: colorVars.rose800,
});

export const errorMessage = style({
  fontSize: "0.75rem",
  color: colorVars.rose600,
});

export const errorCode = style({
  borderRadius: "4px",
  background: colorVars.rose100,
  padding: "0 0.25rem",
  fontFamily: "var(--font-geist-mono), monospace",
});
