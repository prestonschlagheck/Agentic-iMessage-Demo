"use client";

import { cx } from "@/components/ios/ui";
import { useStartOver } from "@/lib/client/use-start-over";
import { ConfirmIcon, RestartIcon } from "./control-bar-icons";
import styles from "./control-bar.module.css";
import { Segment } from "./segment";

export function StartOver({ className }: { className?: string }) {
  const { armed, erasing, label, press, disarm } = useStartOver();
  return (
    <Segment
      wide
      tone={armed ? "danger" : undefined}
      disabled={erasing}
      className={className}
      aria-label={armed ? "Confirm: erase this session" : undefined}
      onClick={press}
      onBlur={disarm}
      onKeyDown={(event) => event.key === "Escape" && disarm()}
    >
      {armed ? <ConfirmIcon /> : <RestartIcon />}
      {label}
    </Segment>
  );
}

// The same two presses as a menu row. Escape is left to the menu, which closes and so disarms it.
export function StartOverItem({ onErased }: { onErased: () => void }) {
  const { armed, erasing, label, press, disarm } = useStartOver(onErased);
  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      aria-disabled={erasing}
      className={cx(styles.item, styles.action, armed && styles.danger)}
      onClick={() => !erasing && press()}
      onBlur={disarm}
    >
      {armed ? "Confirm: erase session" : label}
    </button>
  );
}
