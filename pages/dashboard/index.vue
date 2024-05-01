<template>
  <div>
    <CommonSidebar />

    <div class="ml-[330px] w-[1100px]">
      <CommonHeader title="Dashboard"></CommonHeader>

      <CommonLoading v-if="isLoading"></CommonLoading>
      <div v-else>
        <h3 class="mb-3 italic">
          *Dữ liệu tính đến ngày: {{ todayStats?.stats_time }}
        </h3>

        <div class="flex items-center gap-[40px]">
          <div class="box-item">
            <div class="flex justify-between items-center gap-[10px]">
              <v-icon color="white" size="45"> mdi-movie-play-outline</v-icon>
              <div>
                <h3 class="text-[20px]">Tổng số phim</h3>
                <div class="flex gap-3 items-center">
                  <h3 class="text-[24px] font-bold">
                    {{ todayStats?.total_movie }}
                  </h3>
                  <h4 class="text-sm">
                    {{
                      `(${
                        quantityChange.movie >= 0
                          ? `+${quantityChange.movie}`
                          : `${quantityChange.movie}`
                      })`
                    }}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div class="box-item">
            <div class="flex justify-between items-center gap-[10px]">
              <v-icon color="white" size="45">
                mdi-account-check-outline</v-icon
              >
              <div>
                <h3 class="text-[20px]">Tổng số user</h3>
                <div class="flex gap-3 items-center">
                  <h3 class="text-[24px] font-bold">
                    {{ todayStats?.total_user }}
                  </h3>
                  <h4 class="text-sm">
                    {{
                      `(${
                        quantityChange.user >= 0
                          ? `+${quantityChange.user}`
                          : `${quantityChange.user}`
                      })`
                    }}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div class="box-item">
            <div class="flex justify-between items-center gap-[10px]">
              <v-icon color="white" size="45"> mdi-poll</v-icon>
              <div>
                <h3 class="text-[20px]">Tổng lượt xem</h3>
                <div class="flex gap-3 items-center">
                  <h3 class="text-[24px] font-bold">
                    {{ todayStats?.total_view }}
                  </h3>
                  <h4 class="text-sm">
                    {{
                      `(${
                        quantityChange.view >= 0
                          ? `+${quantityChange.view}`
                          : `${quantityChange.view}`
                      })`
                    }}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div class="box-item">
            <div class="flex justify-between items-center gap-[10px]">
              <v-icon color="white" size="45">
                mdi-chat-processing-outline</v-icon
              >
              <div>
                <h3 class="text-[20px]">Tổng comments</h3>
                <div class="flex gap-3 items-center">
                  <h3 class="text-[24px] font-bold">
                    {{ todayStats?.total_comment }}
                  </h3>
                  <h4 class="text-sm">
                    {{
                      `(${
                        quantityChange.comment >= 0
                          ? `+${quantityChange.comment}`
                          : `${quantityChange.comment}`
                      })`
                    }}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-[100px] mt-13">
          <div>
            <h3 class="text-[20px] font-bold">Biểu đồ Views & Comments</h3>
            <CombinedChart :data="systemStats" class="h-[300px]"></CombinedChart>
          </div>

          <div>
            <h3 class="text-[20px] font-bold">Biểu đồ Users</h3>
            <BarChart :data="systemStats"></BarChart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboard } from '~/stores/dashboard/dashboard-store'
import { storeToRefs } from 'pinia'

const dashboardStore = useDashboard()
const { systemStats } = storeToRefs(dashboardStore)
const isLoading = ref(false)

const todayStats: any = computed(
  () => {
    if(systemStats.value?.length){
      return systemStats.value[systemStats.value.length - 1]
    }
  },
)
const quantityChange = computed(() => {
  const curr: any = systemStats.value[systemStats.value.length - 1]
  const prev: any = systemStats.value?.[systemStats.value.length - 2]

  return {
    movie: curr?.total_movie - (prev?.total_movie ?? curr?.total_movie),
    user: curr?.total_user - (prev?.total_user ?? curr?.total_user),
    view: curr?.total_view - (prev?.total_view ?? curr?.total_view),
    comment: curr?.total_comment - (prev?.total_comment ?? curr?.total_comment),
  }
})

onBeforeMount(() => {
  if(!localStorage.getItem("movie_access_token")){
    navigateTo("/login")
  }
})

onMounted(async () => {
  if (!systemStats.value?.length) {
    isLoading.value = true
    await dashboardStore.getSystemStats()
    isLoading.value = false
  }
})
</script>

<style scoped lang="scss">
@use 'sass:map';
.box-item {
  border-radius: 10px;
  padding: 10px 14px;
  background-color: map.get($colors, 'primary');
  color: white;
}
</style>
