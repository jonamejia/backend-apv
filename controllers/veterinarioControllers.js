const registrar = (req, res) => {

  console.log(req.body);
  res.send({msg: "Desde API/VETERINARIOS"});
};

const perfil = (req, res) => {
  res.send({url: "desde la api/veterinarios/perfil"});
};

export { registrar, perfil };
