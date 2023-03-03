import { Center, Table, Title } from '@mantine/core'
import Image from 'next/image'
import BronzeMedal from 'public/assets/bronzeMedal.png'
import GoldMedal from 'public/assets/goldMedal.png'
import SilverMedal from 'public/assets/silverMedal.png'
interface EchiPageStatsProps {
  title: string
  data: RankingProps[] | []
  withMedals?: boolean
}

interface RankingProps {
  points: number
  name: string
}

export default function RankingTable({
  title,
  data,
  withMedals = false,
}: EchiPageStatsProps) {
  let rows = null

  if (data.length > 0) {
    //Se ordena segun la cantidad de pts
    data.sort((a, b) => b.points - a.points)

    rows = data.map((item, index) => {
      const pos = index + 1
      return (
        <tr key={item.name}>
          <td
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {pos}&nbsp;&nbsp;&nbsp;&nbsp;
            {pos == 1 && withMedals ? (
              <Image width={18} height={25} src={GoldMedal} alt="Gold medal" />
            ) : null}
            {pos == 2 && withMedals ? (
              <Image
                width={18}
                height={25}
                src={SilverMedal}
                alt="Silver medal"
              />
            ) : null}
            {pos == 3 && withMedals ? (
              <Image
                width={18}
                height={25}
                src={BronzeMedal}
                alt="Bronze medal"
              />
            ) : null}
            {/* : null} */}
          </td>
          <td>{item.name}</td>
          <td>{item.points}</td>
        </tr>
      )
    })
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
