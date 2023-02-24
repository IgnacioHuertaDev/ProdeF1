import dashboardConfig from 'dashboardConfig'
import { UserPrediccions } from 'interfaces/userPredictions'
import dbConnect from 'lib/dbConnect'
import { UserPredictions } from 'models/UserPredictions'
import type { NextApiRequest, NextApiResponse } from 'next'

interface ResponseData {
  error?: string
  msg?: string
}

const validatePrediction = async (topDrivers: any, dropouts: any) => {
  //   if (username.length < 3) {
  //     return { error: 'El nombre debe tener 3 caracteres o mas' }
  //   }

  await dbConnect()
  //   const emailUser = await User.findOne({ email: email })
  //   const userName = await User.findOne({ name: username })

  //   if (emailUser) {
  //     return { error: 'Este email ya esta registrado' }
  //   }

  //   if (userName) {
  //     return { error: 'Este nombre de usuario ya esta registrado' }
  //   }

  //   if (password.length < 6) {
  //     return { error: 'La contraseña debe tener 6 o mas caracteres' }
  //   }

  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a POST
  if (req.method !== 'POST') {
    return res.status(200).json({
      error: 'This API call only accepts POST methods',
    })
  }

  // get and validate body variables
  const { userName, raceId, topDrivers, dropouts } = req.body

  const errorMessage = await validatePrediction(topDrivers, dropouts)

  const idCarrera = `${raceId}${dashboardConfig.currentYear}`

  // create or update a Prediction on MongoDB
  const newPrediction = {
    idCarrera: idCarrera,
    puntaje: 0,
    pilotosTop: topDrivers,
    pilotosAbandono: dropouts.map((piloto: string) => piloto),
  }

  try {
    // buscar el documento UserPredictions correspondiente al usuario
    const userPredictions: UserPrediccions | null =
      await UserPredictions.findOne({
        usuario: userName,
      })

    if (userPredictions) {
      // buscar la predicción con el idCarrera especificado
      const existingPredictionIndex = userPredictions.predictions.findIndex(
        (pred) => pred.idCarrera === idCarrera
      )

      if (existingPredictionIndex >= 0) {
        // actualizar la predicción existente
        const result = await UserPredictions.updateOne(
          { _id: userPredictions._id },
          {
            $set: { [`predictions.${existingPredictionIndex}`]: newPrediction },
          }
        )
        res.status(200).json({
          msg: 'Successfuly updated existing Prediction' + result,
        })
      } else {
        // agregar la nueva predicción a la lista predictions
        const result = await UserPredictions.updateOne(
          { _id: userPredictions._id },
          { $push: { predictions: [newPrediction] } }
        )
        res.status(200).json({
          msg: 'Successfuly created new Prediction' + result,
        })
      }
    } else {
      res.status(200).json({
        msg: 'No se ha encontrado un userPrediction a actualizar',
      })
    }
  } catch (error: any) {
    res.status(400).json({
      error: "Error on '/api/savePrediction': " + error,
    })
  }
}
