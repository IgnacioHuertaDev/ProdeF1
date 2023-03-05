import dashboardConfig from 'dashboardConfig'
import { UserPredictions as IUserPredictions } from 'interfaces/userPredictions'
import calculatePredictions from 'lib/calculatePredictions'
import getMostRecentRaceResult from 'lib/getMostRecentRaceResult'
import getProdeByRaceYear from 'lib/getProdeByRaceYear'
import { UserPredictions } from 'models/UserPredictions'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { APP_KEY } = process.env
  const ACTION_KEY = req.headers.authorization!.split(' ')[1]

  try {
    if (ACTION_KEY === APP_KEY) {
      // Process the POST request
      const raceResultsResponse = await getMostRecentRaceResult()

      const raceId = raceResultsResponse.Races[0].Circuit.circuitId
      const raceName = raceResultsResponse.Races[0].Circuit.circuitName

      const usersPredictions = await getProdeByRaceYear(
        raceId,
        dashboardConfig.currentYear
      )
      console.log(usersPredictions)

      usersPredictions.map(async (userPredictions) => {
        const points = calculatePredictions(
          userPredictions.predictions[0],
          raceResultsResponse
        )

        //Se busca el usuario a modificar
        const userPredictionsModel: IUserPredictions | null =
          await UserPredictions.findOne({
            usuario: userPredictions.usuario,
          })

        if (userPredictionsModel) {
          // Se busca la predicción con el idCarrera especificado
          const existingPredictionIndex = userPredictions.predictions.findIndex(
            (pred) => pred.idCarrera === raceId
          )

          // Se busca la predicción con el idCarrera especificado
          const existingPrediction = userPredictions.predictions.find(
            (pred) => pred.idCarrera === raceId
          )

          if (existingPredictionIndex >= 0 && existingPrediction) {
            existingPrediction.puntaje = points
            // Se actualiza la predicción existente
            await UserPredictions.updateOne(
              { _id: userPredictions._id },
              {
                $set: {
                  [`predictions.${existingPredictionIndex}`]:
                    existingPrediction,
                },
              }
            )
          }
        }
      })
      res.status(200).json({
        success: `The score for the race ${raceName} has been successfully processed.`,
      })
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (err) {
    res.status(500).json({ error: `Error: ${err}` })
  }
}
