// REGLAMENTO

// 1.ordenar del 1ro al 5to puesto el resultado de carrera del domingo.
// Se debe hacer antes de la clasificacion.

// 2.sin importar el orden de llegada se puntuara de la siguiente forma
// 1 acierto 1pto
// 2 aciertos 3 pts
// 3 aciertos 6 pts
// 4 aciertos 12 pts
// 5 aciertos 20 pts

// bonus

// Si aciertan el puesto de un corredor reciben 2 pts

// Si aciertan el podio de forma exacta 10pts

// Si aciertan los 5 exactos  25 pts(no acumulativo con el de podio)

// 3.bonus abandonos

// Deberan dar 3 pilotos q a su entender abandonen la carrera otorgara un bonus de multiplicar x1 si aciertan 1...x2 si aciertan 2 y x3 si aciertan 3..
// Los puntos se otorgan de la siguiente manera..
// Si el que abandona se encuentra del puesto 11 al 20 les sumara 1 pto
// Del puesto 6 al 10 sumara 2 pts y del puesto 1 al 5 sumara 3 pts.

// Si los tres corredores q pusieron para abandonar lo hacen antes de mitad de carrera multiplicara x 4

// Si los 3 corredores no llegan a completar 1 vuelta se multiplicara x 5 (si  logra llevar el auto al box para abandonar se lo considerara vuelta cumplida y no multiplicara)

// super bonus

// Cada jugador pondra q corredor abandonara primero la carrera..sumara 10 pts mas...
// Si hay un abandono simultaneo se considerara lo que marque la fia en la clasificacion oficial..en caso de ser en la misma vuelta se dividen los puntos segun los aciertos.

// 4.penalidades

// Si los corredores que pusieron para llegar del 1ro al 5to abandonan recibiran las siguientes penalidades

// 1 abandono resta 1 pto
// 2 abandonos resta 3 pts
// 3 abandonos resta 6 pts
// 4 abandonos resta 10pts
// 5 abandonos resta 20pts

// Si abandona antes de la primera vuelta o no larga la carrera  restara 5 pts mas x cada corredor(si logra llegar a box se considera vuelta lograda y no penalizara)

// 5.importante

// A..no se puede repetir el mismo corredor tanto para llegar como para abandonar...o llega del 1ro al 5to o lo ponen en abandonos

// B..no hay puntos extras de copa de constructores

// C..hay 3 carreras con puntaje doble..
// monaco otra a evaluar y la ultima del campeonato

// Cualquier duda lo vemos...

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
