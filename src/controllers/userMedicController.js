import * as medic from "../repositories/authRepository";

export async function addAvailability(req, res) {
  const medicId = res.locals.auth;
  const { available_date, available_time } = req.body;

  try {
    await medic.addAvailability(medicId.id, available_date, available_time);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
export async function getAllMineAppointments(req, res) {
  const user = res.locals?.auth;

  try {
    const consults = await medic.getAllMineConsults(user.id);
    return res.status(2000).send(consults);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
export async function getAllMineFinishedAppointments(req, res) {
  const user = res.locals?.auth;

  try {
    const consults = await medic.getAllMineFinishedConsults(user.id);
    return res.status(2000).send(consults);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
export async function updateMineConsult(req, res) {
  const consult = req.params?.id;
  const update = req.body?.stats;
  try {
    await medic.updateConsult(consult, update);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
export async function finishConsult(req, res) {
  const { id } = req.params;

  try {
    const result = medic.finishConsult(id);

    return res.status(200).json({
      message: `Consulta com id ${id} finalizada com sucesso.`,
      result: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocorreu um erro ao finalizar a consulta.",
      error: error.message,
    });
  }
}

// start of interations of user with medic
export async function findMedics(req, res) {
  const consult = req.body?.consult;
  try {
    const medics = await medic.findMedics(consult);
    if (medic.rows.length === 0) {
      return res.status(404).send("Nenhum horário disponível encontrado");
    }
    return res.send(medics.rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
export async function findAppointments(req, res) {
  const medicId = req.params.id;
  try {
    const appointments = await medic.findAppointmentsByMedicId(medicId);
    if (appointments.rows.length === 0) return res.sendStatus(404);
    return res.send(appointments.rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
export async function scheduleAppointment(req, res) {
  try {
    const user = res.locals.auth;
    const medicId = res.params?.id;
    const date = req.body;
    const finishDate = `${date.date} ${date.time}`;

    await medic.createAppointment(user, medicId, finishDate);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
// finish of interations of user with medic
