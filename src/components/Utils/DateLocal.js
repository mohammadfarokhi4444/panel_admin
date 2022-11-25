function DateLocal(date, lang = "fa") {
  if (lang == "fa") {
    return date
      ? new Date(date).toLocaleDateString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      : "";
  } else {
    return date
      ? new Date(date).toLocaleDateString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "UTC",
        })
      : "";
  }
}
export default DateLocal;
