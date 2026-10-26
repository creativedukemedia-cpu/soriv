/**
 * Optional typed input (client must approve). Default off.
 * Set VITE_ENABLE_TEXT_INPUT=true in env to enable match-and-return.
 */
export function isTextInputEnabled(): boolean {
  try {
    // Vite injects import.meta.env; plain node tests may not.
    const env = (import.meta as ImportMeta & { env?: Record<string, string> })
      .env;
    return env?.VITE_ENABLE_TEXT_INPUT === "true";
  } catch {
    return false;
  }
}
