import { func } from "joi";
import db from "../config/databaseConnection.js";

export async function createUser(
  email,
  encryptedPassword,
  username,
  ismedic,
  speciality
) {
  return db.query(`INSERT INTO users VALUES ($1, $2, $3, $4, $5);`, [
    email,
    encryptedPassword,
    username,
    ismedic,
    speciality,
  ]);
}
export async function userExists(email) {
  return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}
export async function loginUser(token, userId) {
  return db.query(`INSERT INTO sessions (token,"userId") VALUES ($1, $2)`, [
    token,
    userId,
  ]);
}
export async function deleteToken(userId) {
  return db.query(`DELETE FROM sessions WHERE userid = $1`, [userId]);
}

// start of dbs consults of medics
export function findMedics(params) {
  return db.query(
    `
  SELECT 
    u.id, 
    u.name, 
    u.specialty, 
    l.city 
  FROM users u 
  LEFT JOIN locations l ON u.id = l.userid
  WHERE u.ismedic = true 
  AND (u.name ILIKE '%' || $1 || '%' OR u.specialty ILIKE '%' || $1 || '%' OR l.city ILIKE '%' || $1 || '%');`,
    [params]
  );
}
export function findAppointmentsByMedicId(medicId) {
  return db.query(
    `
    SELECT date, time, u.name as medic_name, u.specialty 
    FROM appointments a
    INNER JOIN users u ON u.id = a.medicid
    WHERE a.medicid = $1 AND a.date >= NOW()
    ORDER BY a.date ASC, a.time ASC;
  `,
    [medicId]
  );
}
export function addDayforAppointments(id, date, time) {
  return db.query(`
    INSERT INTO appointments VALUES($1, $2, $3)
  `, [id, date, time]);
}
export function createAppointment(medicid, userid, date){
  db.query(`
    INSERT INTO medicalappointments VALUES ($1, $2, $3)
  `, [medicid, userid, date])
}
export async function getAllMineConsults(id) {
  return db.query(
    `
  SELECT 
    ma.date, 
    ma.confirmed, 
    ma.speciality, 
    p.name 
  FROM medicalappointments ma 
  JOIN users p ON ma.userid = p.id
  WHERE ma.userid = $1;`,
    [id]
  );
}
export async function getAllMineFinishedConsults(id) {
  return db.query(
    `
  SELECT 
    ma.date, 
    ma.confirmed, 
    ma.speciality, 
    p.name 
  FROM medicalappointments ma 
  JOIN users p ON ma.userid = p.id
  WHERE ma.userid = $1 AND ma.finished = true;`,
    [id]
  );
}
export async function updateConsult(id, stats) {
  return db.query(
    "UPDATE medicalappointments SET confirmed = $1, 'updatedAt' = NOW() WHERE id = $2",
    [stats, id]
  );
}
export async function finishConsult(id) {
  return db.query(
    'UPDATE medicalappointments SET finished = true, "updatedAt" = NOW() WHERE id = $1',
    [id]
  );
}
export async function addAvailability(id, date, time) {
  return db.query(
    `
  INSERT INTO appointments (medicid, date, time)
  VALUES ($1, $2, $3)
`,
    [id, date, time]
  );
}
// end db consults from medics
