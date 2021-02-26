import React, { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

// https://reactnicedates.hernansartorio.com/

/**
 *
 date?: Date;
 month?: Date;
 onDateChange?: DateChangeCallBack;
 onMonthChange?: DateChangeCallBack;
 */


export default function Calender() {
  const [date] = useState(null);

  // const [date, setDate] = useState(null);
  // const [month, setMonth] = useState(null);

  const onDateChange = (date) => {
    console.log(date);
  }

  // const onMonthChange = (month) => {
  //   console.log(month);
  // }

  return (
      <div style={{maxHeight: 500, maxWidth: 300}}>
        {/*<p>*/}
        {/*  Selected date: {date ? format(date, 'dd MMM yyyy', { locale: enGB }) : 'none'}.*/}
        {/*</p>*/}
        <DatePickerCalendar date={date} onDateChange={onDateChange} locale={enGB} />
      </div>
  )
}