const parseDate = (string: string) => {
  const data = new Date(string);
  const result = new Intl.DateTimeFormat("ru", { dateStyle: "short", timeStyle: "short", weekday: "short", year: "2-digit" }).format(data);
  return String(result)
}
export default parseDate
