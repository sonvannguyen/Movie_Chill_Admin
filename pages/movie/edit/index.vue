<template>
  <div>
    <CommonSidebar />

    <div class="ml-[330px] w-[1100px] mb-[200px]">
      <CommonHeader title="Chỉnh sửa phim"></CommonHeader>

      <div class="flex justify-between">
        <div class="flex flex-col gap-3 w-[45%]">
          <div>
            <h3 class="text-lg font-bold mb-1">Tên phim:</h3>
            <v-text-field variant="outlined"></v-text-field>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Tên gốc:</h3>
            <v-text-field variant="outlined"></v-text-field>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Slug URL:</h3>
            <v-text-field variant="outlined"></v-text-field>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Loại phim:</h3>
            <v-select :items="MOVIE_TYPE" variant="outlined"></v-select>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Thể loại:</h3>
            <v-select :items="CATEGORY" variant="outlined"></v-select>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Quốc gia:</h3>
            <v-select :items="COUNTRY" variant="outlined"></v-select>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Diễn viên:</h3>
            <v-textarea variant="outlined"></v-textarea>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Tổng số tập:</h3>
            <v-text-field variant="outlined"></v-text-field>
          </div>
        </div>

        <div class="flex flex-col gap-3 w-[45%]">
          <div>
            <h3 class="text-lg font-bold mb-1">Ảnh thumbnail:</h3>
            <img
              class="w-[100px]"
              src="https://img.hiephanhthienha.com/uploads/movies/su-tra-thu-cua-nguoi-thu-3-thumb.jpg"
              alt=""
            />
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Ảnh banner:</h3>
            <img
              class="w-[100px]"
              src="https://img.hiephanhthienha.com/uploads/movies/su-tra-thu-cua-nguoi-thu-3-poster.jpg"
              alt=""
            />
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Nội dung:</h3>
            <v-textarea variant="outlined"></v-textarea>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Trạng thái:</h3>
            <v-select :items="STATUS" variant="outlined"></v-select>
          </div>

          <div>
            <h3 class="text-lg font-bold mb-1">Thời gian / tập:</h3>
            <v-text-field variant="outlined"></v-text-field>
          </div>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-2 gap-3">
        <div
          v-for="(item, index) in episodes"
          :key="index"
          class="flex gap-4 mb-2 items-center"
        >
          <h3>{{ `URL tập ${index + 1}:` }}</h3>
          <v-text-field variant="outlined"></v-text-field>
        </div>
      </div>

      <div class="flex mt-6 gap-6">
        <CommonButton title="Cancel" bg-color="grey"></CommonButton>
        <CommonButton title="Create"></CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const MOVIE_TYPE = ['Series', 'Single']
const COUNTRY = ['Âu mỹ', 'Hàn quốc', 'Trung quốc']
const CATEGORY = [
  'Tình cảm',
  'Gia đình',
  'Hài hước',
  'Hành động',
  'Học đường',
  'Khoa học',
  'Tâm lý',
  'Viễn tưởng',
  'Cổ trang',
  'Kinh dị',
]
const STATUS = ['Chưa hoàn thành', 'Hoàn thành']

const episodes = ['link 1', 'link 2', 'link 3', 'link 1', 'link 2', 'link 3']
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
</style>
