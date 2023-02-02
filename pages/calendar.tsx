const CalendarPage = () => {
  return (
    <div>
      <h1 className="font-extrabold">Calendar</h1>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=650&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&hl=en_GB&title=SJEC%20Calendar&src=NDY1MjYxZDJiZjA2M2U2NjA0NGNhYjJlNGRhZTRhMzYxNGJhYjU5MzA3ZjQyN2ZiZGI1OTJmZDZiMGI5OTEwM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%233F51B5&color=%230B8043"
        className="w-full h-[89vh] rounded-xl shadow-lg shadow-gray-400"
      ></iframe>
    </div>
  );
};

export default CalendarPage;
