import { RaceResultsResponse } from 'interfaces/raceResults'

async function getMostRecentRaceResult() {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
  }

  const response: RaceResultsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_F1}/current/last/results.json`,
    requestOptions
  ).then((res) => res.json())

  return response.MRData.RaceTable
}

export default getMostRecentRaceResult
