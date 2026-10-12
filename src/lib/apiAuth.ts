/** ERP-facing read/write endpoints require `Authorization: Bearer <ERP_API_SECRET>`. */
export function isAuthorized(req: Request): boolean {
  const auth = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.ERP_API_SECRET}`;
  return Boolean(process.env.ERP_API_SECRET) && auth === expected;
}
