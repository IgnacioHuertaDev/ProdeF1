import dashboardConfig from 'dashboardConfig'
import { Predictions as IPredictions } from 'interfaces/userPredictions'

interface ResponseData {
  error?: string
  msg?: string
  obj?: IPredictions | undefined
}

async function getProdeByRaceAndYear(
  raceId: string,
  year = dashboardConfig.currentYear,
  user: string | null | undefined
) {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let body = JSON.stringify({
    raceId: `${raceId}${year}`,
    userName: user,
  })

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  }

  const response: ResponseData = await fetch(
    `/api/getProdeByRaceAndYear`,
    requestOptions
  ).then((res) => res.json())

  return response
}
export default getProdeByRaceAndYear
