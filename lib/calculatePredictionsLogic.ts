import { Race, RaceTable, Result } from 'interfaces/raceResults'
import {
    ReglaCantidadAciertosAbandonoCaoticoParaGanar,
    ReglaCantidadAciertosMitadCarreraParaGanar,
    ReglaCantidadPuntosPenalidadPorCadaAbandono,
    ReglaMultiplicadorAbandonoCaotico,
    ReglaMultiplicadorAbandonoMitadCarrera,
    ReglaPuntajeAciertos, ReglaPuntajePenalidadAbandonos, StatusAbandonos
} from 'interfaces/rulesParameters'
import { Predictions } from 'interfaces/userPredictions'

export const getPilotosAbandonoResults = (carrera: Race)  => {
    //carrera.result.status != 'Finished' && !carrera.result.status.contains('Lap') para resultado "+1 Lap"
    return carrera.Results.filter(
    (result) =>
        result.status !== StatusAbandonos.get('Finished') &&
        result.status.indexOf(StatusAbandonos.get('Lapped') ?? 'Lap') == -1
    )
}

export const getAllPilotosResults = (carrera: Race)  => carrera.Results

export const getMultiplicadorAbandonos = (predictions: Predictions, pilotosAbandono: Result[], raceTotalLaps: number) => {
    let multiplicador = 1
    // Si los tres corredores q pusieron para abandonar lo hacen antes de mitad de carrera multiplicara x 4.
    const aciertosAbandonoMitadCarrera = getCantidadAciertosAbandonoMitadCarrera(predictions, pilotosAbandono, raceTotalLaps)
    if(aciertosAbandonoMitadCarrera === ReglaCantidadAciertosMitadCarreraParaGanar){
        multiplicador = ReglaMultiplicadorAbandonoMitadCarrera
    } 
    
    // Si los 3 corredores no llegan a completar 1 vuelta se multiplicara x 5
    let aciertosAbandonoCaotico = getCantidadAciertosAbandonoCaotico(predictions, pilotosAbandono, raceTotalLaps)
    if(aciertosAbandonoCaotico === ReglaCantidadAciertosAbandonoCaoticoParaGanar)
    {
        multiplicador = ReglaMultiplicadorAbandonoCaotico //Me cago de risa si esto pasa
        console.log("PENTAKILL !")
    }
    return multiplicador
}

export const getCantidadAciertosAbandono = (
    predictions: Predictions,
    pilotosAbandono: Result[]
) => {
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

export const getCantidadAciertosAbandonoMitadCarrera = (predictions: Predictions, pilotosAbandono: Result[], raceTotalLaps: number) => {
    return predictions.pilotosAbandono.reduce(
    (aciertos = 0, pilotoPrediccion) => {
        const pilotosMatch = pilotosAbandono
        .filter((x) => Number(x.laps) <= raceTotalLaps / 2)
        .find((r) => r.Driver.code === pilotoPrediccion)
        if (!pilotosMatch) {
        return aciertos
        }
        return aciertos + 1
    },
    0
    )
}

export const getCantidadAciertosAbandonoCaotico = (
    predictions: Predictions,
    pilotosAbandono: Result[],
    raceTotalLaps: number
) => {
    return predictions.pilotosAbandono.reduce(
    (aciertos = 0, pilotoPrediccion) => {
        const pilotosMatch = pilotosAbandono
        .filter((x) => Number(x.laps) < 1)
        .find((r) => r.Driver.code === pilotoPrediccion)
        if (!pilotosMatch) {
        return aciertos
        }
        return aciertos + 1
    },
    0
    )
}

export const getPenalidadAbandonos = (predictions: Predictions, pilotosAbandono: Result[], allPilotosResult: Result[]) => {
    // Si los corredores que pusieron para llegar del 1ro al 5to abandonan durante la carrera recibiran las siguientes penalidades:
    const cantidadPilotosAbandonoMatch = getCantidadPenalidadAbandonosMatch(predictions, pilotosAbandono)
    
    let puntosPenalidad = ReglaPuntajePenalidadAbandonos.get(cantidadPilotosAbandonoMatch) ?? 0
    
    // Si abandona antes de la primera vuelta 
    const cantidadPenalidadesAbandonosPrimerVuelta = getCantidadPenalidadAbandonosPrimerVuelta(predictions, pilotosAbandono)
    //no larga la carrera restara 5 pts mas por cada corredor
    const cantidadPenalidadesPilotoNoParticipo = getCantidadPenalidadPilotoNoParticipo(predictions, allPilotosResult)
    
    puntosPenalidad += (cantidadPenalidadesAbandonosPrimerVuelta + cantidadPenalidadesPilotoNoParticipo) * ReglaCantidadPuntosPenalidadPorCadaAbandono

    return puntosPenalidad
}

export const getCantidadPenalidadAbandonosMatch = (predictions: Predictions, pilotosAbandono: Result[]) => {
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

export const getCantidadPenalidadAbandonosPrimerVuelta = (predictions: Predictions, pilotosAbandono: Result[]) => {
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

export const getCarreraApiByPrediction = (
    predictions: Predictions,
    respuestaAPI: RaceTable
) => {
    return respuestaAPI.Races.find(
    (r) =>
        r.Circuit.circuitId === predictions.idCarrera &&
        Number(r.season) == predictions.year
    )
}

export const getPointsAciertos = (predictions: Predictions, carrera: Race) => {
    const cantidadAciertos = getCantidadAciertos(predictions, carrera)

    return ReglaPuntajeAciertos.get(cantidadAciertos) ?? 0
}

export const getCantidadAciertos = (predictions: Predictions, carrera: Race) => {
    return predictions.pilotosTop.reduce((aciertos, pilotoPrediccion) => {
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
    }, 0)
}

export const getPointsAciertosByOrder = (predictions: Predictions, carrera: Race) => {
    const topFiveResults = getTopFiveResults(carrera)

    const cantidadAciertosPorPuesto = getCantidadAciertosPorPuesto(
    predictions,
    topFiveResults
    )
    const cantidadAciertosPodio = getCantidadAciertosPodio(
    predictions,
    topFiveResults
    )
    const cantidadAciertosExactos = getCantidadAciertosExactos(
    predictions,
    topFiveResults
    )

    const pointsPodio = getPuntajePorPodio(cantidadAciertosPodio)
    const pointsExacto = getPuntajeCantAciertosExactos(cantidadAciertosExactos)
    const pointsPorPuesto = getPuntajePorOrden(cantidadAciertosPorPuesto)

    return getPuntajeBonusCompleto(pointsPorPuesto, pointsExacto, pointsPodio)
}

// Si aciertan el puesto de un corredor reciben 2 pts.
export const getPuntajePorOrden = (cantAciertos: number) => cantAciertos * 2
// Si aciertan el podio de forma exacta 10pts.
export const getPuntajePorPodio = (cantAciertos: number) =>
    cantAciertos === 3 ? 10 : 0
// Si aciertan los 5 exactos  25 pts(no acumulativo con el de podio)
export const getPuntajeCantAciertosExactos = (cantAciertos: number) =>
    cantAciertos === 5 ? 25 : 0
// Realiza el calculo con los anteriores 3 puntajes
// Si gana bonus de 5 acierto no se otorgan puntos de Podio
export const getPuntajeBonusCompleto = (
    puntosPorPuesto: number,
    aciertosExactos: number,
    aciertoPuestos: number
) => puntosPorPuesto + (aciertosExactos != 0 ? aciertosExactos : aciertoPuestos)

export const getCantidadAciertosPorPuesto = (
    predictions: Predictions,
    topFiveResults: Result[]
) => {
    return predictions.pilotosTop.reduce((aciertos = 0, pilotoPrediccion) => {
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
    }, 0)
}

export const getCantidadAciertosPodio = (
    predictions: Predictions,
    topFiveResults: Result[]
) => {
    return predictions.pilotosTop
    .filter((x) => x.posicion <= 3)
    .reduce((aciertos = 0, pilotoPrediccion) => {
        const pilotosMatch = topFiveResults
        .filter((x) => Number(x.position) <= 3)
        .find(
            (r) =>
            r.Driver.code === pilotoPrediccion.pilotoId &&
            Number(r.position) === pilotoPrediccion.posicion
        )
        if (!pilotosMatch) {
        return aciertos
        }
        return aciertos + 1
    }, 0)
}

export const getCantidadAciertosExactos = (
    predictions: Predictions,
    topFiveResults: Result[]
) => {
    return predictions.pilotosTop.reduce((aciertos = 0, pilotoPrediccion) => {
    const pilotosMatch = topFiveResults.find(
        (r) =>
        r.Driver.code === pilotoPrediccion.pilotoId &&
        Number(r.position) === pilotoPrediccion.posicion
    )
    if (!pilotosMatch) {
        return aciertos
    }
    return aciertos + 1
    }, 0)
}

export const getTopFiveResults = (carrera: Race) => {
    return carrera.Results.filter((result) => Number(result.position) <= 5)
}