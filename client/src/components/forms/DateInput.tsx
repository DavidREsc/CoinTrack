import { forwardRef, ReactNode } from "react"
import ReactDatePicker from "react-datepicker";
import {BsCalendarEvent} from 'react-icons/bs'

interface DateInputProps {
    children?: ReactNode;
    value: Date;
    onClick: () => void;
}
export type Ref = ReactDatePicker

const DateInput = forwardRef<Ref, DateInputProps>((props, ref) => {
    return (
        <button className='date' type='button' onClick={props.onClick}>
            <span><BsCalendarEvent /></span>
            {props.value.toString()}
        </button>
    )
})

export default DateInput
