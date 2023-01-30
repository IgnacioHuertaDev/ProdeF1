import { IDriversStanding } from 'interfaces/driversStanding'
import { useState } from 'react'
import useSWR from 'swr'

function useGetDriversStandings(year?: number) {
  let requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  }

  const fetcher = (apiURL: string, requestOptions: RequestInit) =>
    fetch(apiURL, requestOptions).then((res) => res.json())

  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  const { data, error } = useSWR<IDriversStanding>(
    [
      `${process.env.NEXT_PUBLIC_API_F1}/${year}/driverStandings.json`,
      requestOptions,
    ],
    fetcher,
    {
      onLoadingSlow(key, config) {
        setIsLoadingSlow(true)
      },
    }
  )

  return {
    driversStanding: data,
    isLoading: !error && !data,
    isError: error,
    isLoadingSlow: isLoadingSlow,
  }
}

export default useGetDriversStandings
