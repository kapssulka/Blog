export const formatDate = (date: string): string => {
  const convertDate = new Date(date);
  if (isNaN(convertDate.getTime())) {
    console.warn(`Invalid date string: ${date}`);
    return "недавно";
  }

  const day = String(convertDate.getDate()).padStart(2, "0");
  const month = String(convertDate.getMonth() + 1).padStart(2, "0"); // месяцы 0-11
  const year = String(convertDate.getFullYear()).slice(-2); // последние 2 цифры года

  return `${day}.${month}.${year}`;
};
