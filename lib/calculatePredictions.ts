import { RaceTable } from 'interfaces/raceResults'
import { Predictions } from 'interfaces/userPredictions'

function calculatePredictions(
  predictions: Predictions,
  respuestaAPI: RaceTable
) {
  const carrera = respuestaAPI.Races.find(
    (r) =>
      r.Circuit.circuitId === predictions.idCarrera &&
      Number(r.season) == predictions.year
  )

  if (!carrera) {
    throw new Error(
      'No se encontró la carrera especificada en la respuesta de la API'
    )
  }

  let puntos = 0
  let bonusAbandono = 1

  //Api
  //Max
  //Leclerc
  //Perez
  //sainz
  //Russell

  //prediccion
  //Max
  //Zhou
  //Perez
  //Sainz
  //Russel

  //20pts + abandonos

  // REGLAMEMTO
  // 1.Ordenar del 1ro al 5to puesto el resultado de carrera del domingo.
  // Se debe hacer antes de la clasificacion.

  // 2.Sin importar el orden de llegada se puntuara de la siguiente forma
  // 1 acierto 1 pto.
  // 2 aciertos 3 pts.
  // 3 aciertos 6 pts.
  // 4 aciertos 12 pts.
  // 5 aciertos 20 pts.

  // Bonus
  // Si aciertan el puesto de un corredor reciben 2 pts.

  // Si aciertan el podio de forma exacta 10pts.

  // Si aciertan los 5 exactos  25 pts(no acumulativo con el de podio)

  // 3.Bonus abandonos

  // Deberan dar 3 pilotos que a su entender abandonen la carrera. Otorgara un bonus de multiplicar x1 si aciertan 1...x2 si aciertan 2 y x3 si aciertan 3.
  // Los puntos se otorgan de la siguiente manera...
  // Si el que abandona se encuentra del puesto 11 al 20 les sumara 1 pto.
  // Del puesto 6 al 10 sumara 2 pts y del puesto 1 al 5 sumara 3 pts.

  // Si los tres corredores q pusieron para abandonar lo hacen antes de mitad de carrera multiplicara x 4.

  // Si los 3 corredores no llegan a completar 1 vuelta se multiplicara x 5 (si logra llevar el auto al box para abandonar se lo considerara vuelta cumplida y no multiplicara).

  // 4.Penalidades

  // Si los corredores que pusieron para llegar del 1ro al 5to abandonan durante la carrera recibiran las siguientes penalidades:

  // 1 abandono resta 1 pto
  // 2 abandonos resta 3 pts
  // 3 abandonos resta 6 pts
  // 4 abandonos resta 10pts
  // 5 abandonos resta 20pts

  // Si abandona antes de la primera vuelta o no larga la carrera  restara 5 pts mas por cada corredor(si logra llegar a box se considera vuelta lograda y no penalizara).

  // 5.Consideraciones

  // A) No se puede repetir el mismo corredor dentro del top 5 y abandonos, o se selecciona dentro del top 5 o en abandonos.

  // B) No hay puntos extras de copa de constructores

  // C)Hay 3 carreras con puntaje doble..
  // Monaco, a elegir y Yas Marina

  // const aciertosPosicion = predictions.pilotosTop.reduce(
  //   (aciertos, pilotoPrediccion) => {
  //     const resultado = carrera.Results.find(
  //       (r) => r.Driver.code === pilotoPrediccion.pilotoId
  //     )
  //     if (!resultado) {
  //       return aciertos
  //     }

  //     if (Number(resultado.position) === pilotoPrediccion.posicion) {
  //       puntos += 1
  //       return aciertos + 1
  //     }

  //     return aciertos
  //   },
  //   0
  // )

  // if (aciertosPosicion >= 2) {
  //   puntos += 2
  // }

  // if (aciertosPosicion >= 3) {
  //   puntos += 3
  // }

  // if (aciertosPosicion >= 4) {
  //   puntos += 6
  // }

  // if (aciertosPosicion === 5) {
  //   puntos += 5
  // }

  // const idsAbandono = new Set(predictions.pilotosAbandono)
  // const bonusAbandonoMap = new Map<number, number>([
  //   [1, 1],
  //   [2, 2],
  //   [3, 3],
  //   [4, 4],
  //   [5, 5],
  // ])

  // const abandonoMultiplicador =
  //   carrera.Results.reduce((multiplicador, resultado) => {
  //     if (idsAbandono.has(resultado.Driver.code)) {
  //       bonusAbandono += bonusAbandonoMap.get(Number(resultado.position)) || 0
  //       return multiplicador * bonusAbandonoMap.get(Number(resultado.position))!
  //     }

  //     return multiplicador
  //   }, 1) * bonusAbandono

  // if (abandonoMultiplicador === 4) {
  //   bonusAbandono = 4
  // } else if (abandonoMultiplicador === 5) {
  //   bonusAbandono = 5
  // }
  return puntos
}

export default calculatePredictions

// REGLAMEMTO
// 1.Ordenar del 1ro al 5to puesto el resultado de carrera del domingo.
// Se debe hacer antes de la clasificacion.

// 2.Sin importar el orden de llegada se puntuara de la siguiente forma
// 1 acierto 1 pto.
// 2 aciertos 3 pts.
// 3 aciertos 6 pts.
// 4 aciertos 12 pts.
// 5 aciertos 20 pts.

// Bonus
// Si aciertan el puesto de un corredor reciben 2 pts.

// Si aciertan el podio de forma exacta 10pts.

// Si aciertan los 5 exactos  25 pts(no acumulativo con el de podio)

// 3.Bonus abandonos

// Deberan dar 3 pilotos que a su entender abandonen la carrera. Otorgara un bonus de multiplicar x1 si aciertan 1...x2 si aciertan 2 y x3 si aciertan 3.
// Los puntos se otorgan de la siguiente manera...
// Si el que abandona se encuentra del puesto 11 al 20 les sumara 1 pto.
// Del puesto 6 al 10 sumara 2 pts y del puesto 1 al 5 sumara 3 pts.

// Si los tres corredores q pusieron para abandonar lo hacen antes de mitad de carrera multiplicara x 4.

// Si los 3 corredores no llegan a completar 1 vuelta se multiplicara x 5 (si logra llevar el auto al box para abandonar se lo considerara vuelta cumplida y no multiplicara).

// 4.Penalidades

// Si los corredores que pusieron para llegar del 1ro al 5to abandonan durante la carrera recibiran las siguientes penalidades:

// 1 abandono resta 1 pto
// 2 abandonos resta 3 pts
// 3 abandonos resta 6 pts
// 4 abandonos resta 10pts
// 5 abandonos resta 20pts

// Si abandona antes de la primera vuelta o no larga la carrera  restara 5 pts mas por cada corredor(si logra llegar a box se considera vuelta lograda y no penalizara).

// 5.Consideraciones

// A) No se puede repetir el mismo corredor dentro del top 5 y abandonos, o se selecciona dentro del top 5 o en abandonos.

// B) No hay puntos extras de copa de constructores

// C)Hay 3 carreras con puntaje doble..
// Monaco, a elegir y Yas Marina
