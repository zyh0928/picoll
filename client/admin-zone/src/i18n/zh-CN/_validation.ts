export default {
  confirmed: (field: string, [target]: any[]) => `${field}和${target}不匹配`,
  max: (field: string) => `${field}过长`,
  max_value: (field: string, [max]: any[]) => `${field}数值过大「<=  ${max}」`,
  min: (field: string) => `${field}过短`,
  min_value: (field: string, [min]: any[]) => `${field}数值过小「>= ${min}」`,
  regex: (field: string) => `${field}格式无效`,
  required: (field: string) => `请输入${field}`
};
