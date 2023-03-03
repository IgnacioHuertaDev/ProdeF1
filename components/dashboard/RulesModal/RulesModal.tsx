import { Box, List, Modal, Space, Table, Text, Title } from '@mantine/core'

interface RulesModalProps {
  opened: boolean
  onClose: () => void
}

const RulesModal = ({ opened, onClose }: RulesModalProps) => {
  const puntosAciertos = [
    { aciertos: 1, puntos: 1 },
    { aciertos: 2, puntos: 3 },
    { aciertos: 3, puntos: 6 },
    { aciertos: 4, puntos: 12 },
    { aciertos: 5, puntos: 20 },
  ]

  const bonusAciertos = [
    { aciertos: 'Acierto puesto corredor', puntos: 2 },
    { aciertos: 'Podio exacto', puntos: 10 },
    { aciertos: 'Top 5 exacto', puntos: 25 },
  ]

  const puntosAbandonos = [
    { aciertos: 1, puntos: 1 },
    { aciertos: 2, puntos: 4 },
    { aciertos: 3, puntos: 6 },
  ]

  const multiplicadorAbandonos = [
    { aciertos: '3 abandonos antes de la mitad de carrera', puntos: 'x4' },
    { aciertos: '3 abandonos antes de la primera vuelta', puntos: 'x5' },
  ]

  const puntosPenalidades = [
    { aciertos: 1, puntos: 1 },
    { aciertos: 2, puntos: 3 },
    { aciertos: 3, puntos: 6 },
    { aciertos: 4, puntos: 10 },
    { aciertos: 5, puntos: 20 },
  ]

  const carrerasEspeciales = [
    { circuito: 'Monaco' },
    { circuito: 'Baku' },
    { circuito: 'Yas Marina' },
  ]

  const rowsPuntosAciertos = puntosAciertos.map((element) => (
    <tr key={element.aciertos}>
      <td style={{ textAlign: 'center' }}>{element.aciertos}</td>
      <td style={{ textAlign: 'center' }}>{element.puntos}</td>
    </tr>
  ))

  const rowsBonusAciertos = bonusAciertos.map((element) => (
    <tr key={element.aciertos}>
      <td style={{ textAlign: 'center' }}>{element.aciertos}</td>
      <td style={{ textAlign: 'center' }}>{element.puntos}</td>
    </tr>
  ))

  const rowsPuntosAbandonos = puntosAbandonos.map((element) => (
    <tr key={element.aciertos}>
      <td style={{ textAlign: 'center' }}>{element.aciertos}</td>
      <td style={{ textAlign: 'center' }}>{element.puntos}</td>
    </tr>
  ))

  const rowsMultiplicadorAbandonos = multiplicadorAbandonos.map((element) => (
    <tr key={element.aciertos}>
      <td style={{ textAlign: 'center' }}>{element.aciertos}</td>
      <td style={{ textAlign: 'center' }}>{element.puntos}</td>
    </tr>
  ))

  const rowsPuntosPenalidades = puntosPenalidades.map((element) => (
    <tr key={element.aciertos}>
      <td style={{ textAlign: 'center' }}>{element.aciertos}</td>
      <td style={{ textAlign: 'center' }}>{element.puntos}</td>
    </tr>
  ))

  const rowsCarrerasEspeciales = carrerasEspeciales.map((element) => (
    <tr key={element.circuito}>
      <td style={{ textAlign: 'center' }}>{element.circuito}</td>
    </tr>
  ))

  return (
    <Modal opened={opened} onClose={onClose} size="auto">
      <Title order={1} mb={15}>
        Reglamento
      </Title>
      <List type="ordered">
        <List.Item>
          Ordenar del 1ro al 5to puesto el resultado de la carrera del domingo.
          <Text fw={700}>(Se debe hacer antes de la clasificacion.)</Text>
          No se puede repetir el mismo corredor tanto
          <Text>
            para llegar como para abandonar...o llega del 1ro al 5to o lo ponen
            en abandonos
          </Text>
        </List.Item>
        <Space h="md" />
        <List.Item>
          <Text fw={700}>Puntos aciertos</Text>
          Sin importar el orden de llegada se puntuara de la siguiente forma:
        </List.Item>
        <Box
          sx={() => ({
            maxWidth: '800px',
          })}
        >
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Aciertos</th>
                <th style={{ textAlign: 'center' }}>Puntos</th>
              </tr>
            </thead>
            <tbody>{rowsPuntosAciertos}</tbody>
          </Table>
        </Box>
        <Space h="md" />
        <List.Item>
          <Text fw={700}>Bonus de aciertos</Text>
        </List.Item>
        <Box
          sx={() => ({
            maxWidth: '800px',
          })}
        >
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Bonus por</th>
                <th style={{ textAlign: 'center' }}>Puntos</th>
              </tr>
            </thead>
            <tbody>{rowsBonusAciertos}</tbody>
          </Table>
        </Box>
        <Space h="md" />
        <List.Item>
          <Text fw={700}>Bonus abandonos</Text>
          Deberan dar 3 pilotos que crean pueda llegar a abandonar la carrera.
          <Text>Los puntos por abandonos son los siguientes:</Text>
        </List.Item>
        <Box
          sx={() => ({
            maxWidth: '800px',
          })}
        >
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Bonus por</th>
                <th style={{ textAlign: 'center' }}>Puntos</th>
              </tr>
            </thead>
            <tbody>{rowsPuntosAbandonos}</tbody>
          </Table>
        </Box>
        <Space h="md" />
        <List.Item>
          <Text fw={700}>Multiplicadores por abandono</Text>
        </List.Item>
        <Box
          sx={() => ({
            maxWidth: '800px',
          })}
        >
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Condición</th>
                <th style={{ textAlign: 'center' }}>Puntos</th>
              </tr>
            </thead>
            <tbody>{rowsMultiplicadorAbandonos}</tbody>
          </Table>
        </Box>
        <Space h="md" />
        <List.Item>
          <Text fw={700}>Penalidades</Text>
          Si los corredores que pusieron para llegar del 1ro al 5to abandonan
          <Text>recibiran las siguientes penalidades:</Text>
        </List.Item>
        <Box
          sx={() => ({
            maxWidth: '800px',
          })}
        >
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Abandonos</th>
                <th style={{ textAlign: 'center' }}>Puntos</th>
              </tr>
            </thead>
            <tbody>{rowsPuntosPenalidades}</tbody>
          </Table>
        </Box>
        <Space h="md" />
        Si abandona antes de la primera vuelta o no larga la carrera restara 5
        pts mas por cada
        <Text>
          corredor(si logra llegar a box se considera vuelta lograda y no
        </Text>
        penalizara)
        <List.Item>
          <Text fw={700}>Carreras especiales</Text>
          Las siguientes carreras tienen puntaje doble:
        </List.Item>
        <Box
          sx={() => ({
            maxWidth: '800px',
          })}
        >
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Circuito</th>
              </tr>
            </thead>
            <tbody>{rowsCarrerasEspeciales}</tbody>
          </Table>
        </Box>
      </List>
    </Modal>
  )
}

export default RulesModal
