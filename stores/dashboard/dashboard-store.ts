import dayjs from 'dayjs'
import adminApi from '~/services/admin-api'

const convertStringToDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
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
    systemStats.value = response
  }

  return {
    systemStats,
    getSystemStats,
  }
})
