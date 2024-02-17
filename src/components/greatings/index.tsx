export default function Greatings() {
  const greatings = {
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
  };

  // useEffect(() => {
  //   const now = new Date();
  //   const hour = now.getHours();
  //   let greetingText: string;

  //   if (hour < 12) {
  //     greetingText = greatings.morning;
  //   } else if (hour < 18) {
  //     greetingText = greatings.afternoon;
  //   } else {
  //     greetingText = greatings.evening;
  //   }

  //   setGreeting(greetingText);
  // }, []);
  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    return hour < 12
      ? greatings.morning
      : hour < 18
        ? greatings.afternoon
        : greatings.evening;
  };

  const greetingText = getGreeting(); // Calculate greeting immediately

  return (
    <>
      <h1 className="text-3xl font-bold">{greetingText}</h1>
      <h3 className="text-xl text-muted-foreground">
        What's your plan for today?
      </h3>
    </>
  );
}
