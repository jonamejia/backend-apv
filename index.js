import express from "express";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";

const app = express();
app.use(express.json());
conectarDB();

console.log(process.env.MOMGO_URI);

app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/veterinarios/login", veterinarioRoutes);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando por: ${PORT}`);
});
