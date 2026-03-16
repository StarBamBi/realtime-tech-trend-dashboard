import { style } from "@vanilla-extract/css";
import { colorVars } from "@/styles/theme.css";

export const root = style({
  borderRadius: "0.75rem",
  border: `1px solid var(${colorVars.zinc200})`,
  background: colorVars.white,
  padding: "0.75rem",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.06)",
  "@media": {
    "screen and (min-width: 640px)": {
      padding: "1rem",
    },
  },
});

export const title = style({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: colorVars.zinc700,
});

export const description = style({
  marginBottom: "0.5rem",
  fontSize: "0.75rem",
  color: colorVars.zinc500,
  "@media": {
    "screen and (min-width: 640px)": {
      marginBottom: "0.75rem",
    },
  },
});
