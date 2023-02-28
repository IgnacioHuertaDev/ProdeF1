import {
  Predictions as IPredictions,
  UserPredictions as IUserPredictions,
} from 'interfaces/userPredictions'
import dbConnect from 'lib/dbConnect'
import { UserPredictions } from 'models/UserPredictions'
import type { NextApiRequest, NextApiResponse } from 'next'

interface ResponseData {
  error?: string
  msg?: string
  obj?: IPredictions | undefined
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
  const { raceId, year, userName } = req.body

  await dbConnect()

  try {
    // buscar el documento UserPredictions correspondiente al usuario
    const userPredictions: IUserPredictions | null =
      await UserPredictions.findOne({
        usuario: userName,
      })

    if (userPredictions) {
      const existingPrediction = userPredictions.predictions.find(
        (pred) => pred.idCarrera === raceId && pred.year == year
      )
      res.status(200).json({
        msg: 'Successfuly get existing Prediction',
        obj: existingPrediction,
      })
    } else {
      res.status(200).json({
        msg: 'Error on get existing Prediction',
      })
    }
  } catch (error: any) {
    res.status(400).json({
      error: "Error on '/api/getProdeByRaceYearUser': " + error,
    })
  }
}
