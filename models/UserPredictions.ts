import mongoose from 'mongoose'

const Schema = mongoose.Schema

const predictionsSchema = new Schema({
  idCarrera: {
    type: String,
    required: true,
  },
  puntaje: {
    type: Number,
    default: 0,
  },
  year: {
    type: Number,
    default: 0,
  },
  pilotosTop: [
    {
      posicion: {
        type: Number,
        required: true,
      },
      pilotoId: {
        type: String,
        required: true,
      },
      nombrePiloto: {
        type: String,
        required: true,
      },
    },
  ],
  pilotosAbandono: {
    type: [String],
  },
})

const usuarioPrediccionsSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  predictions: {
    type: [predictionsSchema],
    required: true,
  },
})

export const UserPredictions =
  mongoose.models.UserPredictions ||
  mongoose.model('UserPredictions', usuarioPrediccionsSchema)

export const Predictions =
  mongoose.models.Predictions ||
  mongoose.model('Predictions', predictionsSchema)
