<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :sort-by="[{ key: 'total_view', order: 'asc' }]"
    :hover="true"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <h2 class="font-bold text-xl ml-4">Danh sách phim</h2>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <template v-slot:activator="{ props }">
          <CommonButton :width="160" title="Thêm phim mới"></CommonButton>
        </template>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.thumb_url="{ item }">
      <img class="h-[100px]" :src="item.thumb_url" alt="" />
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <h1>No data</h1>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
const router = useRouter()

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
  { title: 'Actions', key: 'actions', sortable: false },
]

const dialogDelete = ref(false)
const data = ref(props.listData)
const indexItemDelete = ref()

onMounted(() => {})

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
  dialogDelete.value = true
}

function deleteItemConfirm() {
  data.value.splice(indexItemDelete.value, 1)
  dialogDelete.value = false
}

function closeDelete() {
  dialogDelete.value = false
}
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
