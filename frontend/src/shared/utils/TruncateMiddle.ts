export const truncateMiddle = (value: string, visible = 3) => {
  if (value.length <= visible * 2) return value

  const start = value.slice(0, visible)
  const end = value.slice(-visible)

  return `${start}...${end}`
}