<template>
  <div>
    <CommonLoading v-if="isLoading"> </CommonLoading>

    <v-data-table
      :headers="headers"
      :items="data"
      :sort-by="[{ key: 'totalReport', order: 'desc' }]"
      :hover="true"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <h2 class="font-bold text-xl ml-4">Danh sách comments</h2>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogCommentDelete" max-width="500px">
            <div class="dialog-delete">
              <h3 class="text-xl text-center">
                {{
                  `Bạn có chắc chắn muốn xóa comment "${data[indexItemDelete]?.commentContent ?? ''}" ?`
                }}
              </h3>

              <div class="float-right mt-4">
                <v-btn class="mr-5" color="#3cba9f" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="#3cba9f" @click="deleteItemConfirm('comment')"
                  >OK</v-btn
                >
              </div>
            </div>
          </v-dialog>

          <v-dialog v-model="dialogUserDelete" max-width="500px">
            <div class="dialog-delete">
              <h3 class="text-xl text-center">
                {{
                  `Bạn có chắc chắn muốn xóa user "${data[indexItemDelete]?.username ?? ''}" ?`
                }}
              </h3>

              <div class="float-right mt-4">
                <v-btn class="mr-5" color="#3cba9f" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="#3cba9f" @click="deleteItemConfirm('user')"
                  >OK</v-btn
                >
              </div>
            </div>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.commentContent="{ item }">
        <h1 class="cursor-pointer icon" @click="goToDetail(item?.movie_slug)">
          {{ item.commentContent }}
        </h1>
      </template>

      <template v-slot:item.username="{ item }">
        <div class="py-3 flex items-center gap-2">
          <img
            class="h-[30px] w-[30px] rounded-full"
            :src="item.avatar"
            alt=""
          />
          <h3>{{ item.username }}</h3>
        </div>
      </template>

      <template v-slot:item.movie_name="{ item }">
        <div class="py-3 flex items-center gap-2">
          <img class="h-[40px] w-[40px]" :src="item.thumbnail_url" alt="" />
          <h3 class="cursor-pointer icon" @click="goToDetail(item?.movie_slug)">
            {{ item.movie_name }}
          </h3>
        </div>
      </template>

      <template v-slot:item.updatedAt="{ item }">
        <h1>
          {{ dayjs(item.updatedAt).format('DD/MM/YYYY HH:ss') }}
        </h1>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="flex gap-2">
          <div @click="deleteItem(item, 'user')" class="icon">
            <v-icon size="small"> mdi-delete </v-icon>
            User
          </div>
          
          <div @click="deleteItem(item, 'comment')" class="icon">
            <v-icon size="small"> mdi-delete </v-icon>
            Comment
          </div>
        </div>
      </template>

      <template v-slot:no-data>
        <h1>No data</h1>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import userApi from '~/services/user-api'
import adminApi from '~/services/admin-api'
import { useAlertStore } from '~/stores/alert/alert-store'
import { ALERT_TYPE, URL_MOVIE_WATCH } from '~/constants/common'
import dayjs from 'dayjs'

const router = useRouter()
const alertStore = useAlertStore()

const props = defineProps({
  listData: {
    type: Array,
    required: true,
  },
})

const headers = [
  {
    title: 'Nội dung',
    align: 'start',
    sortable: false,
    key: 'commentContent',
    width: '25%'
  },
  {
    title: 'Được tạo bởi',
    sortable: false,
    key: 'username',
  },
  {
    title: 'Trong phim',
    align: 'start',
    sortable: false,
    key: 'movie_name',
  },
  { title: 'Tổng số báo cáo', key: 'totalReport', align: 'center', width: '160px' },
  { title: 'Cập nhật', key: 'updatedAt' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
]

const dialogCommentDelete = ref(false)
const dialogUserDelete = ref(false)
const data = ref(props.listData)
const indexItemDelete = ref()
const idUserDelete = ref()
const idCommentDelete = ref()
const isLoading = ref(false)

onMounted(() => {})

watch(
  () => [props.listData],
  () => {
    data.value = props.listData
  },
)

function deleteItem(item: any, type: string) {
  if (type == 'comment') {
    indexItemDelete.value = data.value.indexOf(item)
    idCommentDelete.value = item.commentId 
    dialogCommentDelete.value = true
  } else if (type == 'user') {
    indexItemDelete.value = data.value.indexOf(item)
    idUserDelete.value = item.userId 
    dialogUserDelete.value = true
  }
}

async function deleteItemConfirm(type: string) {
  if (type == 'comment') {
    dialogCommentDelete.value = false
    data.value.splice(indexItemDelete.value, 1)
    isLoading.value = true
    await adminApi.deleteComment(idCommentDelete.value)
    isLoading.value = false
    alertStore.setAlertMessage({
      message: 'Đã xóa comment thành công',
      type: ALERT_TYPE.SUCCESS,
    })
  } else if (type == 'user') {
    dialogUserDelete.value = false
    data.value.splice(indexItemDelete.value, 1)
    isLoading.value = true
    await adminApi.deleteComment(idCommentDelete.value)
    await userApi.deleteUser(idUserDelete.value)
    isLoading.value = false
    alertStore.setAlertMessage({
      message: 'Đã xóa user thành công',
      type: ALERT_TYPE.SUCCESS,
    })
  }
}

function closeDelete() {
  dialogUserDelete.value = false
  dialogCommentDelete.value = false
}

function goToDetail(slug: string) {
  window.open(`${URL_MOVIE_WATCH}/${slug}/episode/1`)
}
</script>

<style scoped lang="scss">
@use 'sass:map';
.dialog-delete {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}
.icon {
  cursor: pointer;
}
.icon:hover {
  color: #3cba9f;
}
</style>
