import dashboardConfig from 'dashboardConfig'
import { UserPredictions } from 'interfaces/userPredictions'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

function useGetProdeByYear(year = dashboardConfig.currentYear) {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let body = JSON.stringify({
    year: year,
  })

  let requestOptions: RequestInit = useMemo(
    () => ({
      method: 'POST',
      headers: myHeaders,
      body: body,
      redirect: 'follow',
    }),
    [year]
  )

  const fetcher = (apiURL: string, requestOptions: RequestInit) =>
    fetch(apiURL, requestOptions)
      .then((res) => res.json())
      .then((json) => json.obj)

  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  const { data, error } = useSWR<UserPredictions[] | undefined>(
    [`/api/getProdeByYear`, requestOptions],
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

export default useGetProdeByYear
