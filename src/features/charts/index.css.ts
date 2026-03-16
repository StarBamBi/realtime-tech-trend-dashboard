import { style } from "@vanilla-extract/css";

export const root = style({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1rem",
  "@media": {
    "screen and (min-width: 640px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "screen and (min-width: 1024px)": {
      gap: "1.5rem",
    },
  },
});
