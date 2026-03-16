import { style } from "@vanilla-extract/css";
import { colorVars } from "@/styles/theme.css";

export const root = style({
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  background: colorVars.zinc50,
});

export const text = style({
  color: colorVars.zinc500,
});
