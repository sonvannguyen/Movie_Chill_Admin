<template>
  <div>
    <CommonLoading v-if="isLoading"> </CommonLoading>

    <v-data-table
      :headers="headers"
      :items="data"
      :sort-by="[
        { key: 'target', order: 'asc' },
        { key: 'updatedAt', order: 'desc' },
      ]"
      :hover="true"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <h2 class="font-bold text-xl ml-4">Danh sách thông báo</h2>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <div class="dialog-delete">
              <h3 class="text-xl text-center">
                {{
                  `Bạn có chắc chắn muốn xóa thông báo "${data[indexItemDelete]?.content ?? ''}" ?`
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

      <template v-slot:item.actions="{ item }">
        <div @click="deleteItem(item)" class="icon">
          <v-icon size="small"> mdi-delete </v-icon>
          Delete
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
import { useAlertStore } from '~/stores/alert/alert-store'
import { ALERT_TYPE } from '~/constants/common'
import dayjs from 'dayjs'
import { useNotificationStore } from '~/stores/notification/notification-store'

const notificationStore = useNotificationStore()
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
    key: 'content',
  },
  { title: 'Target', key: 'type' },
  { title: 'Cập nhật lúc', key: 'updatedAt' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
]

const dialogDelete = ref(false)
const data = ref(props.listData)
const indexItemDelete = ref()
const idNotiDelete = ref()
const isLoading = ref(false)

onMounted(() => {})

watch(
  () => [props.listData],
  () => {
    data.value = props.listData
  },
)

function deleteItem(item: any) {
  indexItemDelete.value = data.value.indexOf(item)
  idNotiDelete.value = item._id
  dialogDelete.value = true
}

async function deleteItemConfirm() {
  dialogDelete.value = false
  data.value.splice(indexItemDelete.value, 1)
  isLoading.value = true
  await notificationStore.deleteNotification(idNotiDelete.value)
  isLoading.value = false
  alertStore.setAlertMessage({
    message: 'Đã xóa thông báo thành công',
    type: ALERT_TYPE.SUCCESS,
  })
}

function closeDelete() {
  dialogDelete.value = false
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
