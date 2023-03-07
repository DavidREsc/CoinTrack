

interface TimeRangeProps {
    range: string;
    onRangeChange: (range: string) => void
}

const TimeRange: React.FC<TimeRangeProps> = ({range, onRangeChange}) => {
    const ranges = ['3h', '12h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']
    return (
        <div className='timerange'>
            {ranges.map((r, idx) => {
                return (
                    <button
                        key={idx}
                        className={r === range ? 'range active' : 'range'}
                        onClick={() => onRangeChange(r)}
                        >
                        {r}
                    </button>
                )
            })}
        </div>
    )
}

export default TimeRange;
