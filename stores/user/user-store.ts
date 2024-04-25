import userApi from '~/services/user-api'

export const useUserStore = defineStore('user', () => {
  const listUser = ref([])

  async function getAllUser() {
    const notificationsList = await userApi.getAllUser()
    listUser.value = notificationsList
  }

  async function deleteUser(userId: string) {
    await userApi.deleteUser(userId)
  }

  return {
    listUser,
    getAllUser,
    deleteUser,
  }
})
