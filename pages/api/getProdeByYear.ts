import { UserPrediccions } from 'interfaces/userPredictions'
import dbConnect from 'lib/dbConnect'
import { UserPredictions } from 'models/UserPredictions'
import type { NextApiRequest, NextApiResponse } from 'next'

interface ResponseData {
  error?: string
  msg?: string
  obj?: UserPrediccions[] | undefined
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
  const { year } = req.body

  await dbConnect()

  try {
    // buscar el documento UserPredictions correspondiente al usuario
    const usersPredictions: UserPrediccions[] | null =
      await UserPredictions.find({
        predictions: { $elemMatch: { year: year } },
      })

    if (usersPredictions) {
      res.status(200).json({
        msg: 'Successfuly get existing Prediction',
        obj: usersPredictions,
      })
    } else {
      res.status(200).json({
        msg: 'Error on get existing Prediction',
      })
    }
  } catch (error: any) {
    res.status(400).json({
      error: "Error on '/api/getProdeByRaceAndYear': " + error,
    })
  }
}
