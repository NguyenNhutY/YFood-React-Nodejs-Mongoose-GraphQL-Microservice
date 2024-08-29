// src/components/MusicBar/PlayerStateContext.tsx
import React, { createContext, useContext, useState } from "react";

interface PlayerState {
  isPlaying: boolean;
  volume: number;
}

const PlayerStateContext = createContext<PlayerState | undefined>(undefined);

export const PlayerStateProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<PlayerState>({
    isPlaying: true,
    volume: 0.5,
  });

  return (
    <PlayerStateContext.Provider value={state}>
      {children}
    </PlayerStateContext.Provider>
  );
};

export const usePlayerState = () => {
  const context = useContext(PlayerStateContext);
  if (!context)
    throw new Error("usePlayerState must be used within a PlayerStateProvider");
  return context;
};
