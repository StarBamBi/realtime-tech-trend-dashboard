import { globalStyle } from "@vanilla-extract/css";
import { colorVars, darkTheme } from "./theme.css";

globalStyle(":root", {
  "@media": {
    "screen and (prefers-color-scheme: dark)": {
      vars: darkTheme,
    },
  },
});

globalStyle("body", {
  margin: 0,
  background: colorVars.background,
  color: colorVars.foreground,
  fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("html", {
  fontSize: "16px",
});
