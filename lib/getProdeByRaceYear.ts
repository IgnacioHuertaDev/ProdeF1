import dashboardConfig from 'dashboardConfig'
import { UserPredictions as IUserPredictions } from 'interfaces/userPredictions'

async function getProdeByRaceYear(
  raceId: string,
  year = dashboardConfig.currentYear
) {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let body = JSON.stringify({
    raceId: raceId,
    year: year,
  })

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  }

  const response: IUserPredictions[] = await fetch(
    `${process.env.NEXT_PUBLIC_PRODE_F1_URL}/api/getProdeByRaceYear`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => json.obj)

  return response
}
export default getProdeByRaceYear
