import React from 'react';

const DateComponent = props => {

  const days = {
    sunday: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
  }

  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getYear() + 1900;
  const dayName = '';

  return (
      <div style={{fontSize: '12px', textAlign: 'center'}}>
        <div>התאריך היום </div>
        <div> {day} / {month} / {year} </div>
        <div> יום {days[dayName]} </div>
      </div>
  );
}

export default DateComponent;