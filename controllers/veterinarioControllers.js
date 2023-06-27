import Veterinario from "../models/Veterinario.js";

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

    res.send({ msg: "Registrando usuario" });
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  res.send({ url: "desde la api/veterinarios/perfil" });
};

export { registrar, perfil };
