import db from "../config/databaseConnection.js";

export default async function auth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  const session = await db.query("SELECT * FROM sessions WHERE token = $1", [
    token,
  ]);

  if (session.rows.length === 0) return res.sendStatus(401);
  const user = await db.query("SELECT * FROM users WHERE id = $1", [
    session.rows[0].userId,
  ]);

  res.locals.auth = user.rows[0];

  return next();
}
