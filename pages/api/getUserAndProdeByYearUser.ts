import { User as IUser } from 'interfaces/user'
import { UserPredictions as IUserPredictions } from 'interfaces/userPredictions'
import { UserProfile } from 'interfaces/userProfile'
import dbConnect from 'lib/dbConnect'
import User from 'models/User'
import { UserPredictions } from 'models/UserPredictions'
import type { NextApiRequest, NextApiResponse } from 'next'

interface ResponseData {
  error?: string
  msg?: string
  obj?: UserProfile | undefined
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // validate if it is a POST
  if (req.method !== 'POST') {
    return res.status(400).json({
      error: 'This API call only accepts POST methods',
    })
  }

  // get and validate body variables
  const { year, userName } = req.body

  await dbConnect()

  try {
    // buscar el documento User correspondiente al usuario
    const user: IUser | null = await User.findOne({
      name: userName,
    })

    // buscar el documento UserPredictions correspondiente al usuario
    const userPredictions: IUserPredictions | null =
      await UserPredictions.findOne({
        usuario: userName,
      })

    if (user) {
      if (userPredictions) {
        const existingPrediction = userPredictions.predictions.filter(
          (pred) => pred.year == year
        )

        const userProfile: UserProfile = {
          user,
          predictions: existingPrediction,
        }

        res.status(200).json({
          msg: 'Se a obtenido correctamente el perfil del usuario',
          obj: userProfile,
        })
      } else {
        res.status(400).json({
          error: 'El usuario no posee predicciones',
        })
      }
    } else {
      res.status(400).json({
        error: 'El usuario no existe',
      })
    }
  } catch (error: any) {
    res.status(400).json({
      error: "Error on '/api/getUserAndProdeByYearUser': " + error,
    })
  }
}
