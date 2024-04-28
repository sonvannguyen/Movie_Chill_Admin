import adminApi from '~/services/admin-api'

export const useDashboard = defineStore('dashboard', () => {
  const systemStats = ref([])

  async function getSystemStats() {
    const response = await adminApi.getSystemStats()
    systemStats.value = response
  }

  return {
    systemStats,
    getSystemStats,
  }
})
