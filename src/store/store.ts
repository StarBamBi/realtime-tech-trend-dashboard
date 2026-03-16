import { create } from "zustand";
import type { TechTrend } from "@/types";

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

export type TrendingSort = "stars" | "forks";

interface AppState {
  trendCategoryFilter: string[];
  connectionStatus: ConnectionStatus;
  sidebarOpen: boolean;
  liveTrendsSnapshot: TechTrend[];
  trendingSort: TrendingSort;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setTrendCategoryFilter: (v: string[] | ((prev: string[]) => string[])) => void;
  setSidebarOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  setLiveTrendsSnapshot: (v: TechTrend[] | ((prev: TechTrend[]) => TechTrend[])) => void;
  setTrendingSort: (v: TrendingSort) => void;
}

export const useStore = create<AppState>((set) => ({
  trendCategoryFilter: [],
  connectionStatus: "disconnected",
  sidebarOpen: true,
  liveTrendsSnapshot: [],
  trendingSort: "stars",
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  setTrendCategoryFilter: (v) =>
    set((s) => ({ trendCategoryFilter: typeof v === "function" ? v(s.trendCategoryFilter) : v })),
  setSidebarOpen: (v) => set((s) => ({ sidebarOpen: typeof v === "function" ? v(s.sidebarOpen) : v })),
  setLiveTrendsSnapshot: (v) =>
    set((s) => ({ liveTrendsSnapshot: typeof v === "function" ? v(s.liveTrendsSnapshot) : v })),
  setTrendingSort: (v) => set({ trendingSort: v }),
}));
