<template>
  <div>
    <CommonLoading v-if="isLoading"> </CommonLoading>

    <v-data-table
      :headers="headers"
      :items="data"
      :sort-by="[{ key: 'updatedAt', order: 'desc' }]"
      :hover="true"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <h2 class="font-bold text-xl ml-4">Danh sách phim</h2>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <div class="dialog-delete">
              <h3 class="text-xl text-center">
                {{
                  `Bạn có chắc chắn muốn xóa phim "${data[indexItemDelete]?.name ?? ''}" ?`
                }}
              </h3>

              <div class="float-right mt-4">
                <v-btn class="mr-5" color="#3cba9f" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="#3cba9f" @click="deleteItemConfirm">OK</v-btn>
              </div>
            </div>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.name="{ item }">
        <h1 class="cursor-pointer icon" @click="goToDetail(item?.slug)">
          {{ item.name }}
        </h1>
      </template>

      <template v-slot:item.thumb_url="{ item }">
        <img class="h-[100px]" :src="item.thumb_url?.replace('https://img.hiephanhthienha.com', 'https://img.ophim.live')" alt="" />
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="flex gap-2">
          <div class="icon" @click="editItem(item)">
            <v-icon size="small"> mdi-pencil </v-icon>
            Edit
          </div>

          <div class="icon" @click="deleteItem(item)">
            <v-icon size="small"> mdi-delete </v-icon>
            Delete
          </div>
        </div>
      </template>

      <template v-slot:item.updatedAt="{ item }">
        <h1>
          {{ dayjs(item.updatedAt).format('DD/MM/YYYY HH:ss') }}
        </h1>
      </template>

      <template v-slot:no-data>
        <h1>No data</h1>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { URL_MOVIE_DETAILS } from '~/constants/common'
import movieApi from '~/services/movie-api'
import { useAlertStore } from '~/stores/alert/alert-store'
import { ALERT_TYPE } from '~/constants/common'
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
    title: 'Tên phim',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Thumbnail', key: 'thumb_url', sortable: false },
  { title: 'Thể loại', key: 'type', sortable: false },
  { title: 'Quốc gia', key: 'country', sortable: false },
  { title: 'Lượt xem', key: 'total_view' },
  { title: 'Cập nhật lúc', key: 'updatedAt' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
]

const dialogDelete = ref(false)
const data = ref(props.listData)
const indexItemDelete = ref()
const idMovieDelete = ref()
const isLoading = ref(false)

onMounted(() => {})

watch(
  () => [props.listData],
  () => {
    data.value = props.listData
  },
)

function editItem(item: any) {
  router.push({
    path: 'movie/edit',
    query: {
      name: item.slug,
    },
  })
}

function deleteItem(item: any) {
  indexItemDelete.value = data.value.indexOf(item)
  idMovieDelete.value = item._id
  dialogDelete.value = true
}

async function deleteItemConfirm() {
  dialogDelete.value = false
  data.value.splice(indexItemDelete.value, 1)
  isLoading.value = true
  await movieApi.deleteMovie(idMovieDelete.value)
  isLoading.value = false
  alertStore.setAlertMessage({
    message: 'Đã xóa phim thành công',
    type: ALERT_TYPE.SUCCESS,
  })
}

function closeDelete() {
  dialogDelete.value = false
}

function goToDetail(slug: string) {
  window.open(`${URL_MOVIE_DETAILS}/${slug}`)
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
