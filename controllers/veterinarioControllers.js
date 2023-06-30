import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  const { email } = req.body;
  //verificamos en la BD si existe el usuario
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    console.log(veterinarioGuardado);

    res.send({ msg: "Registrando usuario" });
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  res.send({ url: "desde la api/veterinarios/perfil" });
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Veterinario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();

    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await Veterinario.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  //Revisar el password

  if (await usuario.comprobarPassword(password)) {
    // Autenticar

    res.json({ token: generarJWT(usuario.id) });
  } else {
    const error = new Error("Tu password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

export { registrar, perfil, confirmar, autenticar };
