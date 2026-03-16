import { style } from "@vanilla-extract/css";
import { colorVars } from "@/styles/theme.css";

export const card = style({
  borderRadius: "0.75rem",
  border: `1px solid var(${colorVars.zinc200})`,
  background: colorVars.white,
  padding: "1rem",
  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.06)",
});

export const cardHeader = style({
  marginBottom: "0.5rem",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: colorVars.zinc500,
});

export const cardTitle = style({
  fontSize: "1.125rem",
  fontWeight: 600,
  color: colorVars.foreground,
});
