import {createChart, ColorType, UTCTimestamp} from 'lightweight-charts'
import {useEffect, useRef} from 'react'
import { formatValue } from '../../utils/calculations';
import useFetch from '../../hooks/useFetch';
import ChartLoading from './ChartLoading';

interface ChartProps {
    uuid: string;
    range: string;
}

interface IHistoryData {
    status: string;
    data: {
        change: string;
        history: [
            {timestamp: UTCTimestamp, price: string}
        ]
    }
}

const Chart: React.FC<ChartProps> = ({uuid, range}) => {
    const {data, error, loading} = useFetch<IHistoryData>(`/api/v1/coins/${uuid}/${range}`)
    const chartContainerRef = useRef(null) as any

    useEffect(() => {
        if (data) {
            let history = data.data.history.map(h => {
                return {
                    time: h.timestamp,
                    value: +h.price
                }
            })
            history = history.reverse()
            const handleResize = () => {
                chart.applyOptions({width: chartContainerRef.current!.clientWidth})
            }
            const chart = createChart(chartContainerRef.current!, {
                layout: {
                    background: {type: ColorType.Solid, color: '#f6f6f9'},
                    textColor: '#363949'
                },
                width: chartContainerRef.current!.clientWidth,
                height: 400,
                timeScale: {
                    timeVisible: true,
                    borderColor: '#dce1eb'
                },
                rightPriceScale: {
                    scaleMargins: {
                        top: 0.3,
                    },
                    borderColor: '#dce1eb',
                    
                },
                localization: {
                    priceFormatter: formatValue,
                },
                grid: {
                    vertLines: {
                        color: '#f6f6f9'
                    },
                },
            });
            const newSeries = chart.addAreaSeries(
                {
                    lineColor: 'rgba(26, 82, 171, 1)',
                    topColor: 'rgba(26, 82, 171, 0.9',
                    bottomColor: 'rgba(26, 82, 171, 0.1)',
                    lineWidth: 2
                }
            )
            newSeries.setData(history)
            newSeries.applyOptions({
                priceFormat: {
                    minMove: 0.000000000000001
                }
            })
            chart.timeScale().fitContent()
            
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
                chart.remove()
            }
        }   
    }, [data])

    return (
        loading ? <ChartLoading /> :
        <div ref={chartContainerRef} className='chart'>
        </div>
    )
}

export default Chart;
