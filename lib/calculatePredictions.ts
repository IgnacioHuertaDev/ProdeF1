import { RaceTable, Result } from 'interfaces/raceResults'
import {
  ReglaCarrerasPuntajeDoble, ReglaPuntajeAbandono
} from 'interfaces/rulesParameters'
import { Predictions } from 'interfaces/userPredictions'
import { getAllPilotosResults, getCantidadAciertosAbandono, getCarreraApiByPrediction, getMultiplicadorAbandonos, getPenalidadAbandonos, getPilotosAbandonoResults, getPointsAciertos, getPointsAciertosByOrder } from './calculatePredictionsLogic'

function calculatePredictions(predictions: Predictions, respuestaAPI: RaceTable) {
  
  const carrera = getCarreraApiByPrediction(predictions, respuestaAPI)
  
  if (!carrera) {
    const msjError = 'No se encontró la carrera especificada en la respuesta de la API'
    console.error(msjError)
    throw new Error(msjError)
  }
  const raceTotalLaps = Number(carrera.Results?.find(x => x.position == "1")?.laps ?? 0)
  //No se corrió la carrera o paso algo
  if(raceTotalLaps === 0) return 0;
  
  let puntos = 0
  let puntosAbandonos = 0
  let penalidadAbandonos = 0
  
  const pilotosAbandonos = getPilotosAbandonoResults(carrera);
  const allPilots = getAllPilotosResults(carrera)
  const puntosAciertos = getPointsAciertos(predictions, carrera)
  const puntosAciertosOrden = getPointsAciertosByOrder(predictions, carrera)
  const puntosAciertosMasOrden = puntosAciertos + puntosAciertosOrden;
  const aciertosAbandonos = getCantidadAciertosAbandono(predictions, pilotosAbandonos)
  const puntosAbandonosLog = ReglaPuntajeAbandono.get(aciertosAbandonos) ?? 0
  const multiplicadorAbandono = getMultiplicadorAbandonos(predictions, pilotosAbandonos, raceTotalLaps)
  penalidadAbandonos = getPenalidadAbandonos(predictions, pilotosAbandonos, allPilots)
  
  puntos += puntosAciertos
  puntos += puntosAciertosOrden
  puntosAbandonos = puntosAbandonosLog
  puntosAbandonos *= multiplicadorAbandono
  
  const total = (puntos + puntosAbandonos) - penalidadAbandonos;

  logResults(puntosAciertos, puntosAciertosOrden, puntosAciertosMasOrden, puntosAbandonosLog, multiplicadorAbandono, penalidadAbandonos, total, raceTotalLaps, pilotosAbandonos)
  
  if(ReglaCarrerasPuntajeDoble.get(carrera.Circuit.circuitId) !== undefined){
    return total * 2
  }else{
    return total
  }
}

const logResults = (
  aciertos: number, aciertosOrden: number, aciertosMasOrden: number, abandonos: number,
  multiplicadorAbandono: number, penalidadAbandonos: number, total:number, raceTotalLaps: number, pilotosAbandono: Result[]
) => {

  pilotosAbandono.map(x => console.log('Abandono: ', x.Driver.code, x.status))

  console.log('Race total Laps: ', raceTotalLaps)

  console.table([
    ["Aciertos", aciertos],
    ["Aciertos Orden", aciertosOrden],
    ["Total Puntos Acierto Y Orden", aciertosMasOrden],
    ["Puntos Abandonos", abandonos],
    ["Total Mult. Abandonos", multiplicadorAbandono],
    ["Total Puntos Abandonos", abandonos * multiplicadorAbandono],
    ["Total Penal. Abandonos", penalidadAbandonos],
    ["Total de los Totales", total]
  ])
}

export default calculatePredictions
