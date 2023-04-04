import dashboardConfig from 'dashboardConfig'
import { UserPredictions as IUserPredictions } from 'interfaces/userPredictions'

async function getProdeByYear(year = dashboardConfig.currentYear) {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let body = JSON.stringify({
    year: year,
  })

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  }

  const response: IUserPredictions[] = await fetch(
    `${process.env.NEXT_PUBLIC_PRODE_F1_URL}/api/getProdeByYear`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => json.obj)

  return response
}
export default getProdeByYear
