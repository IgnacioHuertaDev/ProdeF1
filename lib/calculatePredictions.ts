// interface IPrediccion extends Document {
//   idCarrera: string;
//   puntaje: number;
//   pilotosTop: { posicion: number, idpiloto: string }[];
//   pilotosAbandono: string[];
// }

// interface IUsuario extends Document {
//   Usuario: string;
//   Predicciones: IPrediccion[];
// }

// interface ICarrera {
//   raceId: string;
//   Results: {
//     position: string;
//     Driver: { driverId: string };
//   }[];
// }

// Schema de Predicciones
// const PrediccionSchema: Schema = new mongoose.Schema({
//   idCarrera: { type: String, required: true },
//   puntaje: { type: Number, default: 0 },
//   pilotosTop: [{
//     posicion: { type: Number, required: true },
//     idpiloto: { type: String, required: true }
//   }],
//   pilotosAbandono: { type: [String], required: true }
// });

// // Schema de Usuario
// const UsuarioSchema: Schema = new mongoose.Schema({
//   Usuario: { type: String, required: true },
//   Predicciones: { type: [PrediccionSchema], required: true }
// });

// Modelo de Usuario
// const Usuario: Model<IUsuario> = mongoose.model<IUsuario>('Usuario', UsuarioSchema);

// Función para calcular el puntaje de una predicción
// const calcularPuntaje = async (prediccion: IPrediccion, carrera: ICarrera): Promise<number> => {
const calcularPuntaje = async () => {
  let puntajeTotal = 0

  // Verificar si la carrera es la misma de la predicción
  // if (prediccion.idCarrera !== carrera.raceId) {
  //   return puntajeTotal;
  // }

  // // Calcular los puntos por aciertos
  // const pilotosTopIds = prediccion.pilotosTop.map(piloto => piloto.idpiloto);
  // const pilotosTopResultados = carrera.Results.slice(0, 5).map(resultado => resultado.Driver.driverId);

  // const aciertos = pilotosTopIds.filter(id => pilotosTopResultados.includes(id)).length;
  // puntajeTotal += aciertos === 1 ? 1 : aciertos === 2 ? 3 : aciertos === 3 ? 6 : aciertos === 4 ? 12 : aciertos === 5 ? 20 : 0;

  // // Calcular puntos por acierto de posición
  // const aciertosPosicion = prediccion.pilotosTop.filter(piloto => {
  //   const resultado = carrera.Results.find(resultado => resultado.Driver.driverId === piloto.idpiloto);
  //   return resultado ? resultado.position === piloto.posicion : false;
  // }).length;
  // puntajeTotal += aciertosPosicion * 2;

  // // Calcular puntos por acierto de podio
  // const podioPrediccion = [pilotosTopIds[0], pilotosTopIds[1], pilotosTopIds[2]];
  // const podioResultado = [pilotosTopResultados[0], pilotosTopResultados[1], pilotosTopResultados[2]];
  // if (JSON.stringify(podioPrediccion) === JSON.stringify(podioResultado)) {
  //   puntajeTotal += 10;
  // }
}

export default calcularPuntaje
