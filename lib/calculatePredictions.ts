import { Race, RaceTable, Result } from 'interfaces/raceResults'
import { Predictions } from 'interfaces/userPredictions'

function calculatePredictions(predictions: Predictions, respuestaAPI: RaceTable) {
  
  const carrera =getCarreraApiByPrediction(predictions, respuestaAPI)

  if (!carrera) {
    const msjError = 'No se encontró la carrera especificada en la respuesta de la API'
    console.error(msjError)
    throw new Error(msjError)
  }
  
  const pilotosAbandonos = getPilotosAbandonoResults(carrera);
  pilotosAbandonos.map(x => console.log('Abandono: ', x.Driver.code, x.status))

  const allPilots = getAllPilotosResults(carrera);

  const raceTotalLaps = Number(carrera.Results?.find(x => x.position == "1")?.laps ?? 0)
  console.log('Race total Laps: ', raceTotalLaps)

  //No se corrió la carrera o paso algo
  if(raceTotalLaps === 0) return 0;

  let puntos = 0
  let puntosAbandonos = 0
  let penalidadAbandonos = 0
  let multiplicadorAbandono = 0

  const puntosAciertos = getPointsAciertos(predictions, carrera)
  puntos += puntosAciertos
  
  const puntosAciertosOrden = getPointsAciertosByOrder(predictions, carrera)
  puntos += puntosAciertosOrden

  const aciertosAbandonos = getCantidadAciertosAbandono(predictions, pilotosAbandonos)
  puntosAbandonos = ReglaPuntajeAbandono.get(aciertosAbandonos) ?? 0

  multiplicadorAbandono += getMultiplicadorAbandonos(predictions, pilotosAbandonos, raceTotalLaps)
  puntosAbandonos *= multiplicadorAbandono

  penalidadAbandonos += getPenalidadAbandonos(predictions, pilotosAbandonos, allPilots)
  
  const total = (puntos + puntosAbandonos) - penalidadAbandonos;

  console.table([
    ["Aciertos", puntosAciertos],
    ["Aciertos Orden", puntosAciertosOrden],
    ["Total Puntos Acierto Y Orden", puntos],
    ["Puntos Abandonos", ReglaPuntajeAbandono.get(aciertosAbandonos) ?? 0],
    ["Total Mult. Abandonos", multiplicadorAbandono],
    ["Total Puntos Abandonos", puntosAbandonos],
    ["Total Penal. Abandonos", penalidadAbandonos],
    ["Total de los Totales", total]
  ])
  
  if(ReglaCarrerasPuntajeDoble.get(carrera.Circuit.circuitId) !== undefined){
    return total * 2
  }

  return total
}

const statusAbandonos = new Map<string, string>([
  ["Finished", "Finished"],
  ["Lapped", "Lap"],
])

const ReglaPuntajeAciertos = new Map<number, number>([
  [1, 1],
  [2, 3],
  [3, 6],
  [4, 12],
  [5, 20],
])

const ReglaPuntajeAbandono =  new Map<number, number>([
  [1, 1],
  [2, 4],
  [3, 6]
])

const ReglaPuntajePenalidadAbandonos =  new Map<number, number>([
  [1, 1],
  [2, 3],
  [3, 6],
  [4, 10],
  [5, 20]
])

const ReglaCarrerasPuntajeDoble =  new Map<string, string>([
  ["yas_marina", "Yas Marina"],
  ["monaco", "Monaco"],
  ["baku", "Baku"],
])


const getPilotosAbandonoResults = (carrera: Race)  => {
  //carrera.result.status != 'Finished' && !carrera.result.status.contains('Lap') para resultado "+1 Lap"
  return carrera.Results.filter(
   (result) => result.status !== statusAbandonos.get("Finished") && (result.status.indexOf(statusAbandonos.get("Lapped") ?? "Lap") == -1)
)}

const getAllPilotosResults = (carrera: Race)  => {
  //carrera.result.status != 'Finished' && !carrera.result.status.contains('Lap') para resultado "+1 Lap"
  return carrera.Results
}

const getMultiplicadorAbandonos = (predictions: Predictions, pilotosAbandono: Result[], raceTotalLaps: number) => {
  // Multiplicar el total o que ?? como no entiendo devuelvo el multiplicador
  let multiplicador = 1

  // Si los tres corredores q pusieron para abandonar lo hacen antes de mitad de carrera multiplicara x 4.
  const aciertosAbandonoMitadCarrera = getCantidadAciertosAbandonoMitadCarrera(predictions, pilotosAbandono, raceTotalLaps)
  if(aciertosAbandonoMitadCarrera === 3) multiplicador = 4

  // Si los 3 corredores no llegan a completar 1 vuelta se multiplicara x 5
  let aciertosAbandonoCaotico = getCantidadAciertosAbandonoCaotico(predictions, pilotosAbandono, raceTotalLaps)
  if(aciertosAbandonoCaotico === 3)
  {
    multiplicador = 5 //Me cago de risa si esto pasa
    console.log("PENTAKILL !")
  }
  
  return multiplicador
}

const getCantidadAciertosAbandono = (predictions: Predictions, pilotosAbandono: Result[]) => {
  return predictions.pilotosAbandono.reduce(
    (aciertos = 0, pilotoPrediccion) => {
      const pilotosMatch = pilotosAbandono.find(
        (r) => r.Driver.code === pilotoPrediccion
      )
      if (!pilotosMatch) {
        return aciertos
      }
      return aciertos + 1
    },
    0
  )
}

const getCantidadAciertosAbandonoMitadCarrera = (predictions: Predictions, pilotosAbandono: Result[], raceTotalLaps: number) => {
  return predictions.pilotosAbandono.reduce(
    (aciertos = 0, pilotoPrediccion) => {
      const pilotosMatch = pilotosAbandono.filter(x => Number(x.laps) <= (raceTotalLaps / 2) ).find(
        (r) => r.Driver.code === pilotoPrediccion
      )
      if (!pilotosMatch) {
        return aciertos
      }
      return aciertos + 1
    },
    0
  )
}

const getCantidadAciertosAbandonoCaotico = (predictions: Predictions, pilotosAbandono: Result[], raceTotalLaps: number) => {
  return predictions.pilotosAbandono.reduce(
    (aciertos = 0, pilotoPrediccion) => {
      const pilotosMatch = pilotosAbandono.filter(x => Number(x.laps) < 1 ).find(
        (r) => r.Driver.code === pilotoPrediccion
      )
      if (!pilotosMatch) {
        return aciertos
      }
      return aciertos + 1
    },
    0
  )
}

const getPenalidadAbandonos = (predictions: Predictions, pilotosAbandono: Result[], allPilotosResult: Result[]) => {
  // Si los corredores que pusieron para llegar del 1ro al 5to abandonan durante la carrera recibiran las siguientes penalidades:
  const cantidadPilotosAbandonoMatch = getCantidadPenalidadAbandonosMatch(predictions, pilotosAbandono)
  
  let puntosPenalidad = ReglaPuntajePenalidadAbandonos.get(cantidadPilotosAbandonoMatch) ?? 0
  
  // Si abandona antes de la primera vuelta 
  const cantidadPenalidadesAbandonosPrimerVuelta = getCantidadPenalidadAbandonosPrimerVuelta(predictions, pilotosAbandono)
  //no larga la carrera restara 5 pts mas por cada corredor
  const cantidadPenalidadesPilotoNoParticipo = getCantidadPenalidadPilotoNoParticipo(predictions, allPilotosResult)

  puntosPenalidad += (cantidadPenalidadesAbandonosPrimerVuelta + cantidadPenalidadesPilotoNoParticipo) * 5

  return puntosPenalidad
}

const getCantidadPenalidadAbandonosMatch = (predictions: Predictions, pilotosAbandono: Result[]) => {
  return predictions.pilotosTop.reduce(
    (aciertos = 0, pilotoPrediccion) => {
      const pilotosMatch = pilotosAbandono.find(
        (r) => r.Driver.code === pilotoPrediccion.pilotoId
      )
      if (!pilotosMatch) {
        return aciertos
      }
      return aciertos + 1
    },
    0
  )
}

const getCantidadPenalidadAbandonosPrimerVuelta = (predictions: Predictions, pilotosAbandono: Result[]) => {
  return predictions.pilotosTop.reduce(
    (aciertos = 0, pilotoPrediccion) => {
      const pilotosMatch = pilotosAbandono.filter(x => Number(x.laps) < 1).find(
        (r) => r.Driver.code === pilotoPrediccion.pilotoId
      )
      if (!pilotosMatch) {
        return aciertos
      }
      return aciertos + 1
    },
    0
  )
}

const getCantidadPenalidadPilotoNoParticipo = (predictions: Predictions, allPilotosResult: Result[]) => {
  return predictions.pilotosTop.reduce(
    (aciertos = 0, pilotoPrediccion) => {
      const pilotosMatch = allPilotosResult.find(
        (r) => r.Driver.code === pilotoPrediccion.pilotoId
      )
      if (!pilotosMatch) {
        return aciertos +1
      }
      return aciertos
    },
    0
  )
}

const getCarreraApiByPrediction = (predictions: Predictions, respuestaAPI: RaceTable) => {
  return respuestaAPI.Races.find(
    (r) =>
      r.Circuit.circuitId === predictions.idCarrera &&
      Number(r.season) == predictions.year
  )
}

const getPointsAciertos = (predictions: Predictions, carrera: Race) => { 
  const cantidadAciertos = getCantidadAciertos(predictions, carrera)

  return ReglaPuntajeAciertos.get(cantidadAciertos) ?? 0
}

const getCantidadAciertos = (predictions: Predictions, carrera: Race) => {
  return predictions.pilotosTop.reduce(
    (aciertos, pilotoPrediccion) => {
      const pilotosMatch = carrera.Results.find(
        (r) => r.Driver.code === pilotoPrediccion.pilotoId
      )
      if (!pilotosMatch) {
        return aciertos
      }
      if (Number(pilotosMatch.position) <= 5) {
        return aciertos + 1
      }
      return aciertos
    },
    0
  )
}

const getPointsAciertosByOrder =  (predictions: Predictions, carrera: Race) => {
  const topFiveResults = getTopFiveResults(carrera);

  const cantidadAciertosPorPuesto = getCantidadAciertosPorPuesto(predictions, topFiveResults)
  const cantidadAciertosPodio = getCantidadAciertosPodio(predictions, topFiveResults)
  const cantidadAciertosExactos = getCantidadAciertosExactos(predictions, topFiveResults)
  
  const pointsPodio= getPuntajePorPodio(cantidadAciertosPodio)
  const pointsExacto = getPuntajeCantAciertosExactos(cantidadAciertosExactos)
  const pointsPorPuesto = getPuntajePorOrden(cantidadAciertosPorPuesto);

  return  getPuntajeBonusCompleto(pointsPorPuesto, pointsExacto, pointsPodio)

}

// Si aciertan el puesto de un corredor reciben 2 pts.
const getPuntajePorOrden = (cantAciertos: number) => cantAciertos * 2;
// Si aciertan el podio de forma exacta 10pts.
const getPuntajePorPodio = (cantAciertos: number) => cantAciertos === 3 ? 10 : 0;
// Si aciertan los 5 exactos  25 pts(no acumulativo con el de podio)
const getPuntajeCantAciertosExactos = (cantAciertos: number) => cantAciertos === 5 ? 25 : 0;
// Realiza el calculo con los anteriores 3 puntajes
// Si gana bonus de 5 acierto no se otorgan puntos de Podio
const getPuntajeBonusCompleto = (puntosPorPuesto: number, aciertosExactos: number, aciertoPuestos: number) => (
  puntosPorPuesto + (aciertosExactos != 0 ? aciertosExactos : aciertoPuestos)
)

const getCantidadAciertosPorPuesto = (predictions: Predictions, topFiveResults: Result[]) => {
  return predictions.pilotosTop.reduce(
    (aciertos = 0, pilotoPrediccion) => {
      const pilotosMatch = topFiveResults.find(
        (r) => r.Driver.code === pilotoPrediccion.pilotoId
      )
      if (!pilotosMatch) {
        return aciertos
      }
      if (Number(pilotosMatch.position) === pilotoPrediccion.posicion) {
        return aciertos + 1
      }
      return aciertos
    },
    0
  )
}

const getCantidadAciertosPodio = (predictions: Predictions, topFiveResults: Result[]) => {
  return predictions.pilotosTop.filter(x => x.posicion <= 3).reduce(
    (aciertos = 0, pilotoPrediccion) => {
      const pilotosMatch = topFiveResults.filter(x => Number(x.position) <= 3).find(
        (r) => r.Driver.code === pilotoPrediccion.pilotoId && Number(r.position) === pilotoPrediccion.posicion
      )
      if (!pilotosMatch) {
        return aciertos
      }
      return aciertos + 1
    },
    0
  )
}

const getCantidadAciertosExactos = (predictions: Predictions, topFiveResults: Result[]) => {
  return predictions.pilotosTop.reduce(
    (aciertos = 0, pilotoPrediccion) => {
      const pilotosMatch = topFiveResults.find(
        (r) => r.Driver.code === pilotoPrediccion.pilotoId && Number(r.position) === pilotoPrediccion.posicion
      )
      if (!pilotosMatch) {
        return aciertos
      }
      return aciertos + 1
    },
    0
  )
}

const getTopFiveResults = (carrera: Race) => {
  return carrera.Results.filter(
   (result) => Number(result.position) <= 5
)}

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

// Deberan dar 3 pilotos que a su entender abandonen la carrera. 
// Otorgara un bonus de multiplicar x1 si aciertan 1...x2 si aciertan 2 y x3 si aciertan 3.
// Los puntos se otorgan de la siguiente manera...
// DEPRECADO BEIBI
// Si el que abandona se encuentra del puesto 11 al 20 les sumara 1 pto.
// Del puesto 6 al 10 sumara 2 pts y del puesto 1 al 5 sumara 3 pts. 
// DEPRECADO BEIBI

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

export default calculatePredictions