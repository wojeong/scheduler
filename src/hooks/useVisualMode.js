import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    replace ? setHistory(prev => [...prev.slice(0, history.length - 1), newMode]) : setHistory(prev => [...prev, newMode]);
  };

  const back = () => {
    if (history.length <= 1) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    const prevMode = newHistory[newHistory.length - 1];
    setMode(prevMode);
    setHistory(newHistory); 
  }

  return { mode, transition, back };

};

