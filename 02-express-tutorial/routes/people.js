const express = require("express");
const router = express.Router();
const {
  createPerson,
  createPersonPostman,
  deletePerson,
  getPeople,
  updatePerson,
} = require("../controllers/people");

// one way setuping up routes same exact result

// router.get("/", getPeople);
// router.post("/", createPerson);
// router.put("/:id", updatePerson);
// router.delete("/:id", deletePerson);
// router.post("/postman", createPersonPostman);

// second way setuping up routes same exact result
// you can chain properties better like this
// gemini said chaining route handlers is more common  in larger express applications
// simply just group everything with their prefix

router.route("/").get(getPeople).post(createPerson);
router.route("/postman").post(createPersonPostman);
router.route("/:id").put(updatePerson).delete(deletePerson);

module.exports = router;
