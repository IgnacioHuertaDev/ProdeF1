import dashboardConfig from 'dashboardConfig'
import { UserProfile } from 'interfaces/userProfile'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

function useGetUserAndProdeByYearUser(
  year = dashboardConfig.currentYear,
  userName: string
) {
  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let body = JSON.stringify({
    year,
    userName,
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
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error')
        }
        return res.json()
      })
      .then((json) => json.obj)
      .catch((error) => {
        console.log(error)
        throw new Error('Error')
      })

  const [isLoadingSlow, setIsLoadingSlow] = useState(false)

  const { data, error } = useSWR<UserProfile | undefined>(
    [`/api/getUserAndProdeByYearUser`, requestOptions],
    fetcher,
    {
      onLoadingSlow(key, config) {
        setIsLoadingSlow(true)
      },
    }
  )

  return {
    userprofile: data,
    isLoading: !error && !data,
    isError: error,
    isLoadingSlow: isLoadingSlow,
  }
}

export default useGetUserAndProdeByYearUser
