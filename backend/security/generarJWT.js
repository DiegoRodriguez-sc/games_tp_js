const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const comprobarJWT = (token = "") =>{
  try {
    const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY);
    return [true, uid];
  } catch (error) {
    return [ false, null];
  }
};

module.exports = {
  generarJWT,
  comprobarJWT
};