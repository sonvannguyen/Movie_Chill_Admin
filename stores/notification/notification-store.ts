import notificaitonApi from '~/services/notification-api'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])

  async function getNotifications() {
    const notificationsList = await notificaitonApi.getAllNotification()
    notifications.value = notificationsList
  }

  async function deleteNotification(notificationId: string) {
    await notificaitonApi.deleteNotification(notificationId)
  }

  async function createNotification(content: string) {
    await notificaitonApi.createNotification(content)
  }

  return {
    notifications,
    getNotifications,
    deleteNotification,
    createNotification
  }
})
