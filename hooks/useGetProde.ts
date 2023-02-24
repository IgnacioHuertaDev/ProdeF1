import dashboardConfig from 'dashboardConfig'
import { Predictions as IPredictions } from 'interfaces/userPredictions'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

interface ResponseData {
  error?: string
  msg?: string
  obj?: IPredictions | undefined
}

function useGetProde(
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

  let requestOptions: RequestInit = useMemo(
    () => ({
      method: 'POST',
      headers: myHeaders,
      body: body,
      redirect: 'follow',
    }),
    [raceId, year, user]
  )

  const fetcher = (apiURL: string, requestOptions: RequestInit) =>
    fetch(apiURL, requestOptions).then((res) => res.json())

  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  const { data, error } = useSWR<ResponseData>(
    [`/api/getProdeByRaceAndYear`, requestOptions],
    fetcher,
    {
      onLoadingSlow(key, config) {
        setIsLoadingSlow(true)
      },
    }
  )

  return {
    prode: data,
    isLoading: !error && !data,
    isError: error,
    isLoadingSlow: isLoadingSlow,
  }
}

export default useGetProde
