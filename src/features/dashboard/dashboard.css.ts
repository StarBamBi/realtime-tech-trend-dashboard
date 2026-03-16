import { style, globalStyle } from "@vanilla-extract/css";
import { colorVars } from "@/styles/theme.css";

export const root = style({
  minHeight: "100vh",
  background: colorVars.zinc50,
});

export const header = style({
  position: "sticky",
  top: 0,
  zIndex: 10,
  borderBottom: "none",
  background: "#0064FF",
  padding: "0.75rem 1rem",
  "@media": {
    "screen and (min-width: 640px)": {
      padding: "1rem 1.5rem",
    },
  },
});

export const headerInner = style({
  maxWidth: "80rem",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  "@media": {
    "screen and (min-width: 640px)": {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
});

export const title = style({
  fontSize: "1rem",
  fontWeight: 600,
  color: "#ffffff",
  "@media": {
    "screen and (min-width: 640px)": {
      fontSize: "1.25rem",
    },
  },
});

export const headerMeta = style({
  display: "flex",
  minHeight: 44,
  alignItems: "center",
  gap: "0.75rem",
  "@media": {
    "screen and (min-width: 640px)": {
      gap: "1rem",
    },
  },
});

export const headerMetaText = style({
  color: "#ffffff",
});

globalStyle(`${headerMetaText} *`, { color: "inherit" });

export const lastUpdated = style({
  fontSize: "0.75rem",
  color: "#ffffff",
});

export const main = style({
  maxWidth: "80rem",
  margin: "0 auto",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  "@media": {
    "screen and (min-width: 640px)": {
      padding: "1.5rem",
      gap: "1.5rem",
    },
    "screen and (min-width: 1024px)": {
      gap: "2rem",
      paddingBlock: "2rem",
    },
  },
});

export const sectionTitle = style({
  marginBottom: "0.75rem",
  fontSize: "1rem",
  fontWeight: 600,
  color: colorVars.zinc800,
  "@media": {
    "screen and (min-width: 640px)": {
      fontSize: "1.125rem",
    },
  },
});
