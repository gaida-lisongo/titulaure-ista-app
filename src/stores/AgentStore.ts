import { Agent } from "@/types/agents";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AgentStore {
    infoPerso: Agent | null;
    isToken: boolean;
    loading: boolean;
    setInfoPerso: (agent: Agent) => void;
    setIsToken: (isToken: boolean) => void;
    setLoading: (loading: boolean) => void;
    clearInfoPerso: () => void;
}

const useAgentStore = create<AgentStore>()(
    persist(
        (set) => ({
            infoPerso: null,
            isToken: false,
            loading: false,
            setInfoPerso: (agent) => set({ infoPerso: agent }),
            setIsToken: (isToken) => set({ isToken }),
            setLoading: (loading) => set({ loading }),
            clearInfoPerso: () => set({ infoPerso: null, isToken: false }),
        }),
        {
            name: "agent-storage", // unique name
        }
    )
);

export default useAgentStore;