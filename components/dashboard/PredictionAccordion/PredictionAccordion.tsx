import {
  Accordion,
  Box,
  Center,
  Group,
  SimpleGrid,
  Table,
  Title,
} from '@mantine/core'
import { Predictions } from 'interfaces/userPredictions'
import raceIdsFormatter from 'utils/raceIdsFormatter'

type PredictionAccordionProps = {
  predicctions: Predictions[] | undefined
}

const PredictionAccordion = ({ predicctions }: PredictionAccordionProps) => {
  if (!predicctions) return null

  return (
    <>
      <Accordion mt={10}>
        {predicctions.map((prediction) => {
          return (
            <>
              <Accordion.Item value={prediction.idCarrera}>
                <Accordion.Control>
                  <Group position="apart">
                    <Title order={4}>
                      {raceIdsFormatter(prediction.idCarrera)}
                    </Title>
                    <Title order={4}>Pts: {prediction.puntaje}</Title>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <SimpleGrid
                    mt={25}
                    cols={2}
                    breakpoints={[{ maxWidth: 'lg', cols: 1 }]}
                  >
                    <Center>
                      <Box>
                        <Title align="center" order={6}>
                          Top 5 pilotos
                        </Title>
                        <Table w="20rem" horizontalSpacing="xl" striped>
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'center' }}>Pilotos</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prediction.pilotosTop.map((piloto) => {
                              return (
                                <>
                                  <tr key={piloto.pilotoId}>
                                    <td
                                      style={{ textAlign: 'center' }}
                                    >{`${piloto.posicion}. ${piloto.pilotoId}`}</td>
                                  </tr>
                                </>
                              )
                            })}
                          </tbody>
                        </Table>
                      </Box>
                    </Center>
                    <Center>
                      <Box>
                        <Title align="center" order={6}>
                          Abandonos
                        </Title>
                        <Table w="20rem" horizontalSpacing="xl">
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'center' }}>Pilotos</th>
                            </tr>
                          </thead>
                          <tbody>
                            {prediction.pilotosAbandono.map((piloto) => {
                              return (
                                <>
                                  <tr key={piloto}>
                                    <td style={{ textAlign: 'center' }}>
                                      {piloto}
                                    </td>
                                  </tr>
                                </>
                              )
                            })}
                          </tbody>
                        </Table>
                      </Box>
                    </Center>
                  </SimpleGrid>
                </Accordion.Panel>
              </Accordion.Item>
            </>
          )
        })}
      </Accordion>
    </>
  )
}

export default PredictionAccordion
