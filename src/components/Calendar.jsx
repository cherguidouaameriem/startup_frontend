import React, { useState } from 'react';

const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
const DAYS = ['Di','Lu','Ma','Me','Je','Ve','Sa'];

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

export default function Calendar({ closedDates = [], onToggleDate }) {
  const today = new Date();
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  // Prev month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, currentMonth: false, date: new Date(year, month - 1, daysInPrevMonth - i) });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, currentMonth: true, date: new Date(year, month, d) });
  }

  // Next month padding
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, currentMonth: false, date: new Date(year, month + 1, d) });
  }

  const prev = () => setCurrent(new Date(year, month - 1, 1));
  const next = () => setCurrent(new Date(year, month + 1, 1));

  const isClosedDate = (date) => closedDates.some((d) => isSameDay(new Date(d), date));

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button className="calendar__nav" onClick={prev} aria-label="Mois précédent">‹</button>
        <span className="calendar__month">{MONTHS[month]} {year}</span>
        <button className="calendar__nav" onClick={next} aria-label="Mois suivant">›</button>
      </div>

      <div className="calendar__grid">
        {DAYS.map((d) => (
          <div key={d} className="calendar__day-name">{d}</div>
        ))}

        {cells.map(({ day, currentMonth, date }, i) => {
          const isToday = isSameDay(date, today);
          const isClosed = isClosedDate(date);

          let cls = 'calendar__cell';
          if (!currentMonth) cls += ' calendar__cell--other-month';
          else if (isToday) cls += ' calendar__cell--today';
          else if (isClosed) cls += ' calendar__cell--closed';
          if (currentMonth && !isToday && onToggleDate) cls += ' calendar__cell--clickable';

          return (
            <div
              key={i}
              className={cls}
              onClick={() => currentMonth && !isToday && onToggleDate && onToggleDate(date)}
              title={isClosed ? 'Fermé ce jour' : ''}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
