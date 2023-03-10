const parseDate = (string: string) => {
  const data = new Date(string);
  const result = new Intl.DateTimeFormat('ru', { dateStyle: 'short', timeStyle: 'short' }).format(data);
  return String(result);
};
export { parseDate };
