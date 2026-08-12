import { useEffect, useState } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function format(now) {
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h || 12;
  return {
    time: `${h}:${m} ${ampm}`,
    date: `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`,
  };
}

export function useClock(intervalMs = 15000) {
  const [value, setValue] = useState(() => format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setValue(format(new Date())), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return value;
}
