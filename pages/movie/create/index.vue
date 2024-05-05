<template>
  <div>
    <CommonSidebar />

    <div class="ml-[330px] w-[1100px] mb-[200px]">
      <CommonHeader title="Thêm phim mới"></CommonHeader>

      <CommonLoading v-if="isLoading"> </CommonLoading>

      <div v-else>
        <div class="flex justify-between">
          <div class="flex flex-col gap-3 w-[45%]">
            <div>
              <h3 class="text-lg font-bold mb-1">Tên phim:</h3>
              <v-text-field
                v-model="movieName"
                variant="outlined"
              ></v-text-field>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Tên gốc:</h3>
              <v-text-field
                v-model="originName"
                variant="outlined"
              ></v-text-field>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Slug URL:</h3>
              <v-text-field v-model="slugUrl" variant="outlined"></v-text-field>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Loại phim:</h3>
              <v-select
                v-model="type"
                :items="MOVIE_TYPE"
                variant="outlined"
              ></v-select>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Thể loại:</h3>
              <v-select
                v-model="category"
                :items="CATEGORY"
                variant="outlined"
              ></v-select>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Quốc gia:</h3>
              <v-select
                v-model="country"
                :items="COUNTRY"
                variant="outlined"
              ></v-select>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Diễn viên:</h3>
              <v-textarea v-model="actor" variant="outlined"></v-textarea>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Tổng số tập:</h3>
              <v-text-field
                v-model="episodeTotal"
                variant="outlined"
              ></v-text-field>
            </div>
          </div>

          <div class="flex flex-col gap-3 w-[45%]">
            <div>
              <h3 class="text-lg font-bold mb-1">Ảnh thumbnail:</h3>
              <CommonUploadImage
                name="thumbUrl"
                label=""
                @upload-image="handleUploadImage"
              />
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Ảnh banner:</h3>
              <CommonUploadImage
                name="posterUrl"
                label=""
                @upload-image="handleUploadImage"
              />
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Nội dung:</h3>
              <v-textarea v-model="content" variant="outlined"></v-textarea>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Trạng thái:</h3>
              <v-select
                v-model="status"
                :items="STATUS"
                variant="outlined"
              ></v-select>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Thời gian / tập:</h3>
              <v-text-field v-model="time" variant="outlined"></v-text-field>
            </div>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <div
            v-for="(item, index) in esp"
            :key="index"
            class="flex gap-4 mb-2 items-center"
          >
            <h3>
              {{ `URL tập ${index + 1}: ` }}
            </h3>
            <v-text-field
              v-model="espInfo[index]"
              variant="outlined"
            ></v-text-field>
          </div>
        </div>

        <p v-if="errorMessage" class="error-message">
          {{ `*Lỗi trường: ${errorMessage} không được để trống !` }}
        </p>

        <div class="flex mt-6 gap-6">
          <CommonButton
            title="Cancel"
            bg-color="grey"
            @click="handleCancel"
          ></CommonButton>
          <CommonButton title="Create" @click="handleCreate"></CommonButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import movieApi from '~/services/movie-api'
import uploadImage from '~/services/upload-api'
import {
  MOVIE_TYPE,
  COUNTRY,
  CATEGORY,
  STATUS,
  ALERT_TYPE,
  URL_MOVIE_DETAILS,
} from '~/constants/common'
import { useAlertStore } from '~/stores/alert/alert-store'
import { useMovieStore } from '~/stores/movie/movie-store'

const router = useRouter()
const movieStore = useMovieStore()
const alertStore = useAlertStore()

const movieDetail = ref()
const movieName = ref()
const originName = ref()
const slugUrl = ref()
const type = ref()
const category = ref()
const country = ref()
const actor = ref()
const episodeTotal = ref()
const content = ref()
const status = ref()
const time = ref()
const errorMessage = ref()

const esp = computed(() =>
  episodeTotal.value ? Number(episodeTotal.value) : 1,
)
const espInfo = ref<any>({})
const poster = ref()
const thumb = ref()
const isLoading = ref(false)

const handleCancel = () => {
  navigateTo('/movie')
}

const handleUploadImage = (name: string, file: any) => {
  if (name == 'posterUrl') {
    poster.value = file
  } else {
    thumb.value = file
  }
}

const handleCreate = async () => {
  const movieCreate: any = {
    name: movieName.value,
    origin_name: originName.value,
    slug: slugUrl.value,
    type: type.value,
    country: country.value,
    category: [category.value],
    actor: actor.value?.split(', '),
    episode_total: episodeTotal.value,
    content: content.value,
    status: status.value,
    time: time.value,
    thumb_url: undefined,
    poster_url: undefined,
  }

  isLoading.value = true
  let thumbUrlUploaded
  let posterUrlUploaded
  if (thumb.value) {
    thumbUrlUploaded = await uploadImage({
      image_url: thumb.value,
    })
    movieCreate.thumb_url = thumbUrlUploaded
  }
  if (poster.value) {
    posterUrlUploaded = await uploadImage({
      image_url: poster.value,
    })
    movieCreate.poster_url = posterUrlUploaded
  }

  const episodes: any = []
  Object.values(espInfo.value).forEach((espUrl, index) => {
    if (index + 1 <= movieCreate.episode_total) {
      episodes.push({
        slug: index + 1,
        link_embed: espUrl,
      })
    }
  })
  movieCreate.episodes = episodes

  // if not enough data
  const fields = Object.keys(movieCreate)
  const fieldsError: string[] = []
  Object.values(movieCreate).forEach((item: any, index: number) => {
    if (!item || item?.includes(undefined)) {
      fieldsError.push(fields[index])
    }
  })

  if (fieldsError.length) {
    isLoading.value = false
    errorMessage.value = fieldsError.join(', ')
    return
  }

  console.log(movieCreate)
  console.log('Field value: ' + Object.values(movieCreate))
  console.log(espInfo.value)

  await movieApi.createMovie(movieCreate)

  isLoading.value = false
  alertStore.setAlertMessage({
    message: 'Thêm phim mới thành công',
    type: ALERT_TYPE.SUCCESS,
  })

  await movieStore.getAllMovie()
  navigateTo('/movie')
}

onBeforeMount(() => {
  if (!localStorage.getItem('movie_access_token')) {
    navigateTo('/login')
  }
})
</script>

<style scoped lang="scss">
@use 'sass:map';
:deep(.v-field) {
  padding: 8px 5px;
  --v-field-input-padding-top: 5;
  --v-field-input-padding-bottom: 5;
}
:deep(.v-input__details) {
  display: none;
}

:deep(.v-field--variant-outlined) {
  --v-field-padding-top: -42px;
}
.error-message {
  margin-top: 16px;
  font-size: 18px;
  font-style: italic;
  font-weight: bold;
  color: red;
}
</style>
