import { useState, useEffect } from "react";

// ----- TYPES --------
type Walk = {
  id: string;
  minutes: number;
  createdAt: number;
};

const STORAGE_KEY = "dog-walks"; //Key to store the walk history in localStorage

export const useWalks = () => {
  const [walks, setWalks] = useState<Walk[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(walks));
  }, [walks]);

  const addWalk = (minutes: number) => {
    const newWalk: Walk = {
      id: crypto.randomUUID(),
      minutes,
      createdAt: Date.now(),
    };

    setWalks((prev) => [...prev, newWalk]);
  };

  const deleteWalk = (id: string) => {
    setWalks((prev) => prev.filter((w) => w.id !== id));
  };

  return { walks, addWalk, deleteWalk };
};
