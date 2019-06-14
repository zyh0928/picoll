export default (value: any, locale = "zh-Hans"): string => {
  let milliseconds = typeof value === "number" ? value : parseInt(value);

  if (isNaN(milliseconds)) milliseconds = 0;

  return new Date(milliseconds).toLocaleString(locale, {
    hour12: !1,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
};
