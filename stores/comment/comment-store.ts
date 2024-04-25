import adminApi from '~/services/admin-api'

export const useCommentStore = defineStore('comment', () => {
  const listComment = ref([])

  async function getCommentsReport() {
    const response = await adminApi.getAllCommentReport()
    listComment.value = response
  }

  return {
    listComment,
    getCommentsReport,
  }
})
