export const formatDate = (newDate) => {
  const year = newDate.getFullYear() // 2019
  const date = newDate.getDate()
  const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  }

  const monthIndex = newDate.getMonth()
  const monthName = months[monthIndex]
  const formatted = `${date} ${monthName} ${year}`
  return formatted
}
