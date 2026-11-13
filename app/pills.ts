// Persona dashboard buttons, shared by the connect pages and the dashboard.

export const pill =
  "inline-flex h-11 items-center justify-center rounded-full px-6 text-[15px] font-semibold tracking-[-0.2px] transition-[opacity,background-color] duration-[140ms] ease-(--ease-standard)";

export const primaryPill = `${pill} bg-accent text-surface active:opacity-75`;
export const secondaryPill = `${pill} border border-button-border bg-surface text-ink hover:bg-sunken active:bg-tile`;
