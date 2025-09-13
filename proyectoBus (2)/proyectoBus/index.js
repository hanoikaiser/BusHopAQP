const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const sequelize = require('./db');
const Ruta = require('./models/Ruta');
const Historial = require('./models/historial');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/rutas', async (req, res) => {
  const rutas = await Ruta.findAll();
  res.json(rutas);
});

app.post('/api/ruta', async (req, res) => {
  const { origen, destino } = req.body;

  try {
    const rutas = await Ruta.findAll({
      where: {
        origen: { [Op.iLike]: origen },
        destino: { [Op.iLike]: destino }
      }
    });

    const resultado = {
      origen,
      destino,
      ruta: rutas.map(r => ({
        linea: r.linea,
        desde: r.origen,
        hasta: r.destino
      })),
      tiempo_estimado_min: rutas.reduce((acc, r) => acc + r.tiempo_estimado_min, 0)
    };

    // GUARDAR EN EL HISTORIAL
    await Historial.create({
      origen,
      destino,
      resultado
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar la ruta' });
  }
});


sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
  });
});

const Historial = require('./models/historial');
await sequelize.sync();

