import { ISchedule } from 'interfaces/schedule'
import { useState } from 'react'
import useSWR from 'swr'

function useGetSchedule(year?: number) {
  let requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
  }

  const fetcher = (apiURL: string, requestOptions: RequestInit) =>
    fetch(apiURL, requestOptions).then((res) => res.json())

  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  const { data, error } = useSWR<ISchedule>(
    [`${process.env.NEXT_PUBLIC_API_F1}/${year}.json`, requestOptions],
    fetcher,
    {
      onLoadingSlow(key, config) {
        setIsLoadingSlow(true)
      },
    }
  )

  return {
    schedule: data,
    isLoading: !error && !data,
    isError: error,
    isLoadingSlow: isLoadingSlow,
  }
}

export default useGetSchedule
