async function getDriverUrlImage(driverId: string) {
  let myHeaders = new Headers()
  myHeaders.append(
    'Cookie',
    'GeoIP=US:VA:Ashburn:39.05:-77.49:v4; WMF-Last-Access-Global=31-Jan-2023; WMF-Last-Access=31-Jan-2023'
  )

  let requestOptions: RequestInit = {
    headers: myHeaders,
    method: 'GET',
    redirect: 'follow',
  }

  const response: any = fetch(
    `https://en.wikipedia.org/w/api.php?action=query&pithumbsize=500&prop=pageimages&titles=${driverId}&format=json&origin=*`,
    requestOptions
  ).then((res) => res.json())

  console.log(response)
  if (response.query?.pages !== undefined) {
    const pageId = Object.keys(response.query.pages)[0]
    const url = response.query.pages[pageId].thumbnail.source

    console.log(url)

    return url
  }

  return ''
}
export default getDriverUrlImage
