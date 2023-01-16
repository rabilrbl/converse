const CalendarPage = () => {
  return (
    <div>
      <h1 className="font-extrabold">Calendar</h1>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=650&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&src=Y18xNTVjODVhMWY4MmMxYTliNzk2YzRmNzQ5ZjM2MjRmOTcyYjI0M2ZlODU5NDRjNWVlMTA2ZDhmNWNiYmU4MDdkQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%237CB342&color=%230B8043"
        style={{ border: "solid 1px #777" }}
        width="1200"
        height="650"
      ></iframe>
    </div>
  );
};

export default CalendarPage;
