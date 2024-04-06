import dayjs from 'dayjs'

export const useAlertStore = defineStore('alert', () => {
  const alertMessage = ref()

  function setAlertMessage(message: any) {
    const id = dayjs().format('YYYYMMDDHHmmssSSS')
    alertMessage.value = { ...message, id }
  }

  function resetAlertMessage() {
    alertMessage.value = undefined
  }

  return {
    alertMessage,
    setAlertMessage,
    resetAlertMessage,
  }
})
