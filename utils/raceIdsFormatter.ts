function raceIdsFormatter(raceId: string) {
  const words = raceId.split('_')
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return capitalizedWords.join(' ')
}

export default raceIdsFormatter
