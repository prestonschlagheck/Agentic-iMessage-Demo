let context: AudioContext | null = null;

/**
 * The page's one AudioContext, for the meters and every sound cue alike. Made and resumed on the first gesture
 * (sounds.unlock), long before a call's audio plays: a context made or resumed later can reconfigure the output
 * device and glitch the agent's voice already playing.
 */
export function audioContext() {
  if (context?.state === "closed") context = null;
  context ??= new AudioContext();
  wake(context);
  return context;
}

// Safari reports "interrupted" rather than "suspended" when a call takes the audio session; either needs a resume,
// and a meter on a context that isn't running reads silence. Asked at most once a second, since meters read per frame.
let wokenAt = 0;
export function wake(ctx: AudioContext) {
  if (ctx.state === "running" || performance.now() - wokenAt < 1_000) return;
  wokenAt = performance.now();
  void ctx.resume().catch(() => undefined);
}
