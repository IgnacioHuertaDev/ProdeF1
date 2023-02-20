import { IDrivers } from 'interfaces/drivers'
import { useState } from 'react'
import useSWR from 'swr'

function useGetDrivers(year?: number) {
  let requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  }

  const fetcher = (apiURL: string, requestOptions: RequestInit) =>
    fetch(apiURL, requestOptions).then((res) => res.json())

  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  const { data, error } = useSWR<IDrivers>(
    [`${process.env.NEXT_PUBLIC_API_F1}/${year}/drivers.json`, requestOptions],
    fetcher,
    {
      onLoadingSlow(key, config) {
        setIsLoadingSlow(true)
      },
    }
  )

  return {
    drivers: data,
    isLoading: !error && !data,
    isError: error,
    isLoadingSlow: isLoadingSlow,
  }
}

export default useGetDrivers
