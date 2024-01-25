function formatDate(dateString) {
  var date = new Date(dateString);

  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return `${year}.${month}.${day}`;
}
