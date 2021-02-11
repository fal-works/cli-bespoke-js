import type { ErrorSender } from "../types";

export const validValues = <T>(candidates: readonly T[]) => (
  value: unknown,
  sendError: ErrorSender
): T => {
  for (const candidate of candidates) if (value === candidate) return candidate;

  sendError(new Error(`Invalid value "${String(value)}"`));
};
