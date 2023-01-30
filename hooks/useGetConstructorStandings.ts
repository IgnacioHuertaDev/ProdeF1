import { IConstructorStanding } from 'interfaces/constructorStanding'
import { useState } from 'react'
import useSWR from 'swr'

function useGetConstructorStandings(year?: number) {
  let requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  }

  const fetcher = (apiURL: string, requestOptions: RequestInit) =>
    fetch(apiURL, requestOptions).then((res) => res.json())

  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  const { data, error } = useSWR<IConstructorStanding>(
    [
      `${process.env.NEXT_PUBLIC_API_F1}/${year}/constructorStandings.json`,
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
    constructorStandings: data,
    isLoading: !error && !data,
    isError: error,
    isLoadingSlow: isLoadingSlow,
  }
}

export default useGetConstructorStandings
