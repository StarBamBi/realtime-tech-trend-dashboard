import { style } from "@vanilla-extract/css";
import { colorVars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  minHeight: 44,
  alignItems: "center",
  gap: "0.5rem",
  "@media": {
    "screen and (min-width: 640px)": {
      gap: "0.75rem",
    },
  },
});

export const label = style({
  fontSize: "0.75rem",
  color: colorVars.zinc500,
  "@media": {
    "screen and (min-width: 640px)": {
      fontSize: "0.875rem",
    },
  },
});

export const group = style({
  display: "flex",
  borderRadius: "0.5rem",
  border: `1px solid var(${colorVars.zinc200})`,
  padding: "2px",
  background: colorVars.white,
});

export const button = style({
  minHeight: 36,
  borderRadius: "0.375rem",
  padding: "0 0.75rem",
  fontSize: "0.875rem",
  fontWeight: 500,
  border: "none",
  cursor: "pointer",
  background: "transparent",
  color: colorVars.zinc600,
  transition: "background-color 0.15s, color 0.15s",
  "@media": {
    "screen and (min-width: 640px)": {
      minHeight: 40,
      padding: "0 1rem",
    },
  },
  ":hover": {
    background: colorVars.zinc100,
  },
});

export const buttonActive = style({
  background: colorVars.buttonActiveBg,
  color: colorVars.buttonActiveText,
  ":hover": {
    background: colorVars.buttonActiveBg,
    color: colorVars.buttonActiveText,
  },
});
