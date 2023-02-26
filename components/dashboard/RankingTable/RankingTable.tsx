import { Center, Table, Title } from '@mantine/core'

interface EchiPageStatsProps {
  title: string
  data: RankingProps[] | []
}

interface RankingProps {
  points: number
  name: string
}

export default function RankingTable({ title, data }: EchiPageStatsProps) {
  let rows = null

  if (data.length > 0) {
    //Se ordena segun la cantidad de pts
    data.sort((a, b) => b.points - a.points)

    rows = data.map((item, index) => (
      <tr key={item.name}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.points}</td>
      </tr>
    ))
  }

  return (
    <>
      <div>
        <Title order={1} mb={15}>
          {title}
        </Title>
        {rows !== null ? (
          <Table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Nombre</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        ) : (
          <Center>
            <Title order={3} mb={15}>
              La competencia todavia no posee participantes
            </Title>
          </Center>
        )}
      </div>
    </>
  )
}
