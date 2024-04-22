<template>
  <div>
    <CommonSidebar />

    <div class="ml-[330px] w-[1100px] mb-[200px]">
      <CommonHeader title="Thêm thông báo mới"></CommonHeader>

      <CommonLoading v-if="isLoading"> </CommonLoading>

      <div v-else>
        <div class="flex justify-between">
          <div class="flex flex-col gap-3 w-[45%]">
            <div>
              <h3 class="text-lg font-bold mb-1">Nội dung thông báo:</h3>
              <v-textarea v-model="content" variant="outlined"></v-textarea>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-1">Target:</h3>
              <v-text-field
                v-model="type"
                :readonly="true"
                default="ALL"
                variant="outlined"
              ></v-text-field>
            </div>
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
import { ALERT_TYPE } from '~/constants/common'
import { useAlertStore } from '~/stores/alert/alert-store'
import { useNotificationStore } from '~/stores/notification/notification-store'
const notificationStore = useNotificationStore()

const alertStore = useAlertStore()
const content = ref()
const type = ref('ALL')
const errorMessage = ref()
const isLoading = ref(false)

const handleCancel = () => {
  navigateTo('/notification')
}

const handleCreate = async () => {
  const notiCreate: any = {
    content: content.value,
    type: 'ALL',
  }

  isLoading.value = true

  // if not enough data
  const fields = Object.keys(notiCreate)
  const fieldsError: string[] = []
  Object.values(notiCreate).forEach((item: any, index: number) => {
    if (!item || item?.includes(undefined)) {
      fieldsError.push(fields[index])
    }
  })

  if (fieldsError.length) {
    isLoading.value = false
    errorMessage.value = fieldsError.join(', ')
    return
  }

  await notificationStore.createNotification(notiCreate.content)

  isLoading.value = false
  alertStore.setAlertMessage({
    message: 'Thêm thông báo mới thành công',
    type: ALERT_TYPE.SUCCESS,
  })

  await notificationStore.getNotifications()
  navigateTo('/notification')
}
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
