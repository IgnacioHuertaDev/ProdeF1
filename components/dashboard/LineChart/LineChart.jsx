import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useEffect, useRef, useState } from 'react'
import { Line } from 'react-chartjs-2'
import raceIdsFormatter from 'utils/raceIdsFormatter'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart
    ctx.save()
    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = options.color || '#141517'
    ctx.fillRect(0, 0, chart.width, chart.height)
    ctx.restore()
  },
}

export const options = {
  responsive: true,
  animation: {
    easing: 'easeInOutQuad',
    duration: 520,
  },
  legend: {
    display: false,
  },
  tooltips: {
    titleFontFamily: 'Telegraf',
    backgroundColor: 'rgba(0,0,0,0.3)',
    titleFontColor: 'red',
    caretSize: 5,
    cornerRadius: 2,
    xPadding: 20,
    yPadding: 20,
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  plugins: {
    customCanvasBackgroundColor: {
      color: 'transparent',
    },
  },
}

function createGradient(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 360)
  gradient.addColorStop(0, 'rgba(170, 49, 37, 0.5)')
  gradient.addColorStop(1, 'rgba(255, 24, 1, 0)')

  return gradient
}

const LineChart = ({ predicctions }) => {
  const lineChartRef = useRef(null)
  const [chartData, setChartData] = useState({
    datasets: [],
  })

  useEffect(() => {
    const predictionPoints = predicctions.map((item) => item['puntaje'])
    const predictionRaces = predicctions.map((item) => item['idCarrera'])

    const labels = predictionRaces.map((raceid) => raceIdsFormatter(raceid))

    const data = {
      labels,
      datasets: [
        {
          label: 'Puntaje',
          data: predictionPoints,
          pointBackgroundColor: 'rgba(0,0,0,0.3)',
          borderWidth: 1,
          borderColor: '#FF1801',
          fill: true,
          backgroundColor: 'rgba(0,0,0,1',
        },
      ],
    }

    const chart = lineChartRef.current

    if (!chart) {
      return
    }
    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: createGradient(chart.ctx),
      })),
    }

    setChartData(chartData)
  }, [predicctions])

  return (
    <Line
      ref={lineChartRef}
      options={options}
      data={chartData}
      plugins={[plugin]}
    />
  )
}

export default LineChart
