// import {
//   CategoryScale,
//   ChartConfiguration,
//   Chart as ChartJS,
//   Filler,
//   Legend,
//   LineElement,
//   LinearScale,
//   PointElement,
//   ScriptableAndArrayOptions,
//   Title,
//   Tooltip,
// } from 'chart.js'
// import { useEffect, useRef, useState } from 'react'
// import { Line } from 'react-chartjs-2'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// )

// interface CurrencyData {
//   historic_prices: { sell: number; created_at: string }[]
// }

// const options: ScriptableAndArrayOptions<ChartConfiguration<'line'>> = {
//   responsive: true,
//   animation: {
//     easing: 'easeInOutQuad',
//     duration: 520,
//   },
//   legend: {
//     display: false,
//   },
//   tooltips: {
//     titleFontFamily: 'Poppins',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     titleFontColor: 'red',
//     caretSize: 5,
//     cornerRadius: 2,
//     xPadding: 10,
//     yPadding: 10,
//   },
//   elements: {
//     line: {
//       tension: 0.4,
//     },
//   },
//   plugins: {
//     filler: {
//       propagate: true,
//     },
//   },
// }

// function createGradient(ctx: CanvasRenderingContext2D) {
//   const gradient = ctx.createLinearGradient(0, 0, 0, 270)
//   gradient.addColorStop(0, 'rgba(62, 94, 88, 0.5)')
//   gradient.addColorStop(1, 'rgba(147, 218, 205, 0)')

//   return gradient
// }

// const LineChart = ({
//   currencyData,
// }: {
//   currencyData: CurrencyData
// }): JSX.Element => {
//   const lineChartRef = useRef<ChartJS>()
//   const [chartData, setChartData] = useState<ChartConfiguration<'line'>>({
//     datasets: [],
//   })

//   useEffect(() => {
//     // Se obtienen los ultimos 8 registros historicos
//     const historicPrices = currencyData.historic_prices.slice(-8)

//     const sellHistoricPrices = historicPrices.map((item) => item['sell'])
//     const datesHistoricPrices = historicPrices.map((item) => item['created_at'])

//     const labels = datesHistoricPrices.map((date) =>
//       moment(date).format('MMM Do YYYY')
//     )

//     const data = {
//       labels,
//       datasets: [
//         {
//           label: 'Precio de venta',
//           data: sellHistoricPrices,
//           pointBackgroundColor: 'white',
//           borderWidth: 1,
//           borderColor: '#93dacd',
//           fill: true,
//           backgroundColor: 'rgba(62, 94, 88, 0.8)',
//         },
//       ],
//     }

//     const chart = lineChartRef.current

//     if (!chart) {
//       return
//     }
//     const chartData = {
//       ...data,
//       datasets: data.datasets.map((dataset) => ({
//         ...dataset,
//         backgroundColor: createGradient(chart.ctx as CanvasRenderingContext2D),
//       })),
//     }

//     setChartData(chartData)
//   }, [currencyData])

//   return <Line ref={lineChartRef} options={options} data={chartData} />
// }

// export default LineChart

const LineChart = () => {}

export default LineChart
