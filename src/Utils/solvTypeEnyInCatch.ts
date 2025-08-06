export function solvTypeEnyInCatch(error: unknown): string {
  const err = error as { response?: { data?: { message?: string } } };
  return err.response?.data?.message || "Something went wrong.";
}
