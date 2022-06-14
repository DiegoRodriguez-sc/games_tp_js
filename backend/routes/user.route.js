const { Router } = require("express");
const { check } = require("express-validator");
const { getUserById, putUser, deleteUser } = require("../controllers/user.controller");
const { idUserExists } = require("../security/dbValidator");
const { validateData } = require("../security/validateData");
const validateJWT = require("../security/validateJWT");


const router = Router();


router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idUserExists),
    validateData,
  ],
  getUserById
);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idUserExists),
    validateData,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idUserExists),
    validateData,
  ],
  deleteUser
);

module.exports = router;