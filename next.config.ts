import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

// Vanilla Extract: Turbopack은 실험적이므로 Webpack 사용 (package.json scripts에 --webpack 지정)
const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "off" },
});

const nextConfig: NextConfig = {};

export default withVanillaExtract(nextConfig);
