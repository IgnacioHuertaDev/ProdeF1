import dashboardConfig from 'dashboardConfig'
import { Predictions } from 'interfaces/userPredictions'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

function useGetProdeByYearUser(
  year = dashboardConfig.currentYear,
  user: string
) {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let body = JSON.stringify({
    year,
    user,
  })

  let requestOptions: RequestInit = useMemo(
    () => ({
      method: 'POST',
      headers: myHeaders,
      body: body,
      redirect: 'follow',
    }),
    [body]
  )

  const fetcher = (apiURL: string, requestOptions: RequestInit) =>
    fetch(apiURL, requestOptions)
      .then((res) => res.json())
      .then((json) => json.obj)

  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  const { data, error } = useSWR<Predictions[] | undefined>(
    [`/api/getProdeByYearUser`, requestOptions],
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

export default useGetProdeByYearUser
