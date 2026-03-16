import { style, keyframes } from "@vanilla-extract/css";
import { colorVars } from "@/styles/theme.css";

const pulse = keyframes({
  "0%, 100%": { opacity: "1" },
  "50%": { opacity: "0.5" },
});

export const root = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.875rem",
  color: colorVars.zinc500,
});

export const dot = style({
  height: "0.5rem",
  width: "0.5rem",
  borderRadius: "9999px",
  backgroundColor: colorVars.zinc400,
});

export const dotConnected = style({
  backgroundColor: colorVars.tossBlue,
});

export const dotConnecting = style({
  backgroundColor: colorVars.amber500,
  animation: `${pulse} 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
});

export const dotError = style({
  backgroundColor: colorVars.rose500,
});
