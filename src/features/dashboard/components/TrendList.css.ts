import { style } from "@vanilla-extract/css";
import { colorVars } from "@/styles/theme.css";

export const list = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const item = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "0.375rem",
  border: `1px solid var(${colorVars.zinc100})`,
  padding: "0.5rem 0.75rem",
});

export const itemWithRank = style({
  paddingLeft: "2.25rem",
});

export const itemLeft = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "0.25rem 0.5rem",
});

export const rankBadge = style({
  position: "absolute",
  left: "0.75rem",
  top: "50%",
  transform: "translateY(-50%)",
  width: "1.25rem",
  height: "1.25rem",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.6875rem",
  fontWeight: 700,
  color: "#ffffff",
  flexShrink: 0,
});

export const rank1 = style([rankBadge, { background: "linear-gradient(135deg, #d4af37 0%, #f4e4a6 100%)", color: "#5c4a1a" }]);
export const rank2 = style([rankBadge, { background: "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%)", color: "#3d3d3d" }]);
export const rank3 = style([rankBadge, { background: "linear-gradient(135deg, #cd7f32 0%, #e8a87c 100%)", color: "#4a2c0a" }]);

export const itemName = style({
  fontWeight: 500,
  color: colorVars.foreground,
});

export const itemCategory = style({
  fontSize: "0.75rem",
  color: colorVars.zinc500,
});

export const itemRight = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const itemScore = style({
  fontSize: "0.875rem",
  fontFamily: "var(--font-geist-mono), monospace",
  color: colorVars.zinc700,
});

export const itemChangePositive = style({
  fontSize: "0.875rem",
  fontWeight: 500,
  color: colorVars.tossBlue,
});

export const itemChangeNegative = style({
  fontSize: "0.875rem",
  color: colorVars.rose600,
});
