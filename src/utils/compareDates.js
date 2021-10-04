function compareDates(d1, d2) {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  console.log(date1);

  if (date1.getTime() > date2.getTime()) {
    console.log(`maior`);
  } else if (date1.getYear() < date2.getYear()) {
    console.log(`menor`);
  } else if (date1.getDate() === date2.getDate()) {
    console.log(`Both dates are equal`);
  }
}

export default compareDates;
