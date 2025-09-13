const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Ruta = sequelize.define('Ruta', {
  linea: DataTypes.STRING,
  origen: DataTypes.STRING,
  destino: DataTypes.STRING,
  parada_intermedia: DataTypes.STRING,
  tiempo_estimado_min: DataTypes.INTEGER
});

module.exports = Ruta;
