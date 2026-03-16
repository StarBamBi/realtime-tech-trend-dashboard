import { create } from "zustand";
import type { TechTrend } from "@/types";

export type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

interface AppState {
  trendCategoryFilter: string[];
  connectionStatus: ConnectionStatus;
  sidebarOpen: boolean;
  liveTrendsSnapshot: TechTrend[];
  likedRepos: string[];
  subscribedTechs: string[];
  setConnectionStatus: (status: ConnectionStatus) => void;
  setTrendCategoryFilter: (v: string[] | ((prev: string[]) => string[])) => void;
  setSidebarOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
  setLiveTrendsSnapshot: (v: TechTrend[] | ((prev: TechTrend[]) => TechTrend[])) => void;
  setLikedRepos: (v: string[] | ((prev: string[]) => string[])) => void;
  setSubscribedTechs: (v: string[] | ((prev: string[]) => string[])) => void;
}

export const useStore = create<AppState>((set) => ({
  trendCategoryFilter: [],
  connectionStatus: "disconnected",
  sidebarOpen: true,
  liveTrendsSnapshot: [],
  likedRepos: [],
  subscribedTechs: [],
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  setTrendCategoryFilter: (v) =>
    set((s) => ({ trendCategoryFilter: typeof v === "function" ? v(s.trendCategoryFilter) : v })),
  setSidebarOpen: (v) => set((s) => ({ sidebarOpen: typeof v === "function" ? v(s.sidebarOpen) : v })),
  setLiveTrendsSnapshot: (v) =>
    set((s) => ({ liveTrendsSnapshot: typeof v === "function" ? v(s.liveTrendsSnapshot) : v })),
  setLikedRepos: (v) => set((s) => ({ likedRepos: typeof v === "function" ? v(s.likedRepos) : v })),
  setSubscribedTechs: (v) =>
    set((s) => ({ subscribedTechs: typeof v === "function" ? v(s.subscribedTechs) : v })),
}));
