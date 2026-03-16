import { style } from "@vanilla-extract/css";
import { colorVars } from "@/styles/theme.css";

export const list = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gap: "0.5rem",
  gridTemplateColumns: "1fr",
  "@media": {
    "screen and (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "screen and (min-width: 1024px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
});

export const item = style({
  position: "relative",
  display: "block",
  borderRadius: "0.75rem",
  border: `1px solid var(${colorVars.zinc200})`,
  background: colorVars.white,
  padding: "0.75rem",
  boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "@media": {
    "screen and (min-width: 640px)": {
      padding: "1rem",
    },
  },
  ":hover": {
    transform: "scale(1.02)",
    boxShadow: "0 4px 12px 0 rgb(0 0 0 / 0.08)",
  },
});

export const itemWithRank = style({
  paddingLeft: "2.25rem",
  "@media": {
    "screen and (min-width: 640px)": {
      paddingLeft: "2.5rem",
    },
  },
});

export const rankBadge = style({
  position: "absolute",
  left: "0.75rem",
  top: "50%",
  transform: "translateY(-50%)",
  width: "1.5rem",
  height: "1.5rem",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "#ffffff",
  flexShrink: 0,
});

export const rank1 = style([rankBadge, { background: "linear-gradient(135deg, #d4af37 0%, #f4e4a6 100%)", color: "#5c4a1a" }]);
export const rank2 = style([rankBadge, { background: "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%)", color: "#3d3d3d" }]);
export const rank3 = style([rankBadge, { background: "linear-gradient(135deg, #cd7f32 0%, #e8a87c 100%)", color: "#4a2c0a" }]);

export const name = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: colorVars.zinc900,
  "@media": {
    "screen and (min-width: 640px)": {
      fontSize: "1rem",
    },
  },
});

export const meta = style({
  marginTop: "0.25rem",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.25rem 1rem",
  fontSize: "0.75rem",
  color: colorVars.zinc500,
  "@media": {
    "screen and (min-width: 640px)": {
      fontSize: "0.875rem",
    },
  },
});
