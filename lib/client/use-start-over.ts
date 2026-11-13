import { useEffect, useState, useTransition } from "react";
import { useOnboarding } from "@/lib/client/onboarding";

const CONFIRM_MS = 5000;

// Deleting the session is irreversible, so the first press only arms it. Escape, blur or a few seconds of
// waiting disarm it again.
export function useStartOver(onErased?: () => void) {
  const { reset } = useOnboarding();
  const [armed, setArmed] = useState(false);
  const [erasing, startErasing] = useTransition();

  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setArmed(false), CONFIRM_MS);
    return () => clearTimeout(timer);
  }, [armed]);

  const press = () => {
    if (!armed) return setArmed(true);
    startErasing(async () => {
      await reset();
      setArmed(false);
      onErased?.();
    });
  };

  const label = erasing ? "Erasing" : armed ? "Confirm" : "Restart";
  return { armed, erasing, label, press, disarm: () => setArmed(false) };
}
