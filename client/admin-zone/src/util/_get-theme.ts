import Color from "./__color";

export default (data: any = {}) => {
  const {
    primary = "#ab3b3a", // 真朱
    secondary = "#bdc0ba", // 白鼠
    accent = "#005caf", // 瑠璃
    error = "#cb4042", // 赤紅
    info = "#58b2dc", // 空
    success = "#00896c", // 青竹
    warning = "#ffb11b" // 山吹
  } = data;

  const theme: any = {
    primary,
    secondary,
    accent,
    error,
    info,
    success,
    warning
  };

  const color = new Color();

  Object.keys(color).forEach(key => (theme[key] = color[key]));

  return theme;
};
