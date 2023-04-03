import dayjs from 'dayjs'

async function getCurrentDate(): Promise<dayjs.Dayjs> {
  const response = await fetch(
    'http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires'
  )
  const data = await response.json()
  const date = dayjs(data.datetime)
  return date
}

export default getCurrentDate
