import { useEffect, useState } from "react";

export const shades = [
  "purple",
  "red",
  "green",
  "blue",
  "cyan",
  "pink",
] as const;

export type IAccentShade = typeof shades[number];

export type IAccent = [IAccentShade, (e: IAccentShade) => void];

export default function useAccent(): IAccent {
  const shade = (localStorage.getItem("accent") ?? "blue") as IAccentShade;
  const [accent, setAccent] = useState(shade);

  function set(newAccent: IAccentShade) {
    try {
      localStorage.setItem("accent", newAccent);
      setAccent(newAccent);
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    const el = document.documentElement;
    el.dataset.accent = accent;
  }, [accent]);

  return [accent, set];
}
