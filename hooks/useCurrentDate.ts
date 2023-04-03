import { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import getCurrentDate from 'utils/getCurrentDate'

const useCurrentDate = () => {
  const [actualDate, setActualDate] = useState<Dayjs | null>(null)

  useEffect(() => {
    const getActualTime = async () => {
      const date = await getCurrentDate()
      setActualDate(date)
    }
    getActualTime()
  }, [])

  return { actualDate }
}

export default useCurrentDate
