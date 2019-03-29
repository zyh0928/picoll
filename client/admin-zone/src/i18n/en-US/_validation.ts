export default {
  confirmed: (field: string) => `${field} confirmation does not match.`,
  max: (field: string) => `${field} is too long.`,
  max_value: (field: string, [max]: any) =>
    `${field} is too large (<=  ${max}).`,
  min: (field: string) => `${field} is too short.`,
  min_value: (field: string, [min]: any) =>
    `${field} is too small (>= ${min}).`,
  regex: (field: string) => `${field} format is invalid.`,
  required: (field: string) => `${field} is required.`
};
