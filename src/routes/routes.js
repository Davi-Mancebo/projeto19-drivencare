import express, { Router } from "express";
import cors from "cors";
import auth from "../middleware/authentication.js";
import { validateSchema } from "../middleware/validator.js";
import signUpSchema from "../schemas/signUpSchema.js";
import signInSchema from "../schemas/signInSchema.js";
import * as medic from "../controllers/userMedicController.js";
import * as users  from "../controllers/userController.js"
import { appoitmentSchema } from "../schemas/publishAppointmentSchema.js";

const router = express.Router();
router.use(cors());
router.use(express.json());

// START POST ROUTES
router.post("/signup", validateSchema(signUpSchema), users.signUp);
router.post("/signin", validateSchema(signInSchema), users.signIn);

// START GET ROUTES


// START DELETE ROUTES
router.delete("/logout", users.logout);

/* //IMPORTANT
    everything down below the line "router.use(auth)" will auto authenticate. Everything 
    in here will be pass thrugh the authentication.js 
    and if is correct the user information will be saved on "res.locals.auth" (use without "").

    EX: const user = res.locals.auth
*/

router.use(auth);

// START AUTH ROUTES GET
router.get("/medics", medic.findMedics);
router.get("/dates/avaiable/:id", medic.findAppointments)
router.get("/appointments", medic.getAllMineAppointments);
router.get("/appointments/finished", medic.getAllMineFinishedAppointments);

// START AUTH ROUTES POST
router.post("/finishappointment/id", medic.finishConsult);
router.post("/appointments", medic.addAvailability);

router.post("/appointment/add/:id",  validateSchema(appoitmentSchema), medic.scheduleAppointment)

// START AUTH DELETE ROUTE
router.delete("/logout", users.logout);

// START AUTH PUT ROUTES
router.put("/updateappointment/id", medic.updateMineConsult);

export default router;
