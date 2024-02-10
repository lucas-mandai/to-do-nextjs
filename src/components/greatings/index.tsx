import { useEffect, useState } from 'react';

export default function Greatings() {
  const greatings = {
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
  };
  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    let greetingText: string;

    if (hour < 12) {
      greetingText = greatings.morning;
    } else if (hour < 18) {
      greetingText = greatings.afternoon;
    } else {
      greetingText = greatings.evening;
    }
    setGreeting(greetingText);
  }, []);
  return (
    <>
      <h1 className="text-4xl font-bold">{greeting}</h1>
      <h3 className="text-xl text-muted-foreground">
        What's your plan for today?
      </h3>
    </>
  );
}