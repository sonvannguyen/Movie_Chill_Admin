import dayjs from 'dayjs'
import adminApi from '~/services/admin-api'

const convertStringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const useDashboard = defineStore('dashboard', () => {
  const systemStats = ref([])

  async function getSystemStats() {
    const response = await adminApi.getSystemStats()
    response.sort(
      (a: any, b: any) =>
        convertStringToDate(a.stats_time).getTime() -
        convertStringToDate(b.stats_time).getTime(),
    )

    const newData: any = []
    const startDate = convertStringToDate(response[0].stats_time)
    const endDate = convertStringToDate(
      response[response.length - 1].stats_time,
    )

    let currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dateString = formatDate(currentDate)
      const existingData = response.find(
        (item: any) => item.stats_time === dateString,
      )

      if (existingData) {
        newData.push(existingData)
      } else {
        const previousData: any = newData[newData.length - 1]
        const missingData = { ...previousData }
        missingData.stats_time = dateString
        newData.push(missingData)
      }

      currentDate.setDate(currentDate.getDate() + 1)
    }

    systemStats.value = newData
  }

  return {
    systemStats,
    getSystemStats,
  }
})
