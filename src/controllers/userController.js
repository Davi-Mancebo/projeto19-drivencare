import {
  loginUser,
  createUser,
  userExists,
  deleteToken,
} from "../repositories/authRepository.js";
import bcrypt from "bcrypt";
import uuidV4 from "uuid4";

//local user
export async function signUp(req, res) {
  const { email, password, username, ismedic, speciality} = req.body;
  const encryptedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await userExists(email);

    if (user.rowCount > 0) {
      return res.status(409).send("This e-mail is already registered!");
    }

    await createUser(email, encryptedPassword, username, ismedic, speciality);

    return res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function signIn(req, res) {
  const { email, password } = req.body;
  const token = uuidV4();

  try {
    const user = await userExists(email);
    if (
      user.rowCount === 0 ||
      !bcrypt.compareSync(password, user.rows[0].password)
    ) {
      return res.status(401).send("Email or password are invalid!");
    }

    await loginUser(token, user.rows[0].id);
    const objectUser = {
      name: user.rows[0].name,
      isMedic: user.rows[0].ismedic,
      speciality: user.rows[0].speciality,
      token: token,
    }
    res.status(200).send(objectUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function logout(req, res) {
  const user = res.locals.auth;
  try {
    await deleteToken(user.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
//db user