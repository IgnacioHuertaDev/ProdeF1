import { Types } from 'mongoose'

export interface PilotosTop {
  _id: Types.ObjectId
  posicion: number
  pilotoId: string
  nombrePiloto: string
}

export interface Predictions {
  _id: Types.ObjectId
  idCarrera: string
  puntaje: number
  pilotosTop: PilotosTop[]
  pilotosAbandono: string[]
  year: number
}

export interface UserPredictions {
  _id: Types.ObjectId
  usuario: string
  predictions: Predictions[]
}
