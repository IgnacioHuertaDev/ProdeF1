import xml2js from 'xml2js'

function xmlToJsonParser(data: string, explicitArray = false) {
  const nameToLowerCase = (name: string) => {
    return name.toLowerCase()
  }
  let parser = new xml2js.Parser({
    attrkey: 'attr',
    charkey: 'value',
    tagNameProcessors: [nameToLowerCase],
    explicitArray: explicitArray,
    emptyTag: undefined,
  })

  let response: any
  parser.parseString(data, (err, result) => (response = result))

  return response
}

export default xmlToJsonParser
