<template>
  <div>
    <div v-if="props.readonly">
      <div class="label-file-input-readonly ml-1">{{ props.label }}</div>
      <div class="file-input-container-readonly">
        <img
          v-if="defaultValue"
          :src="defaultValue"
          class="image-preview w-[200px] h-[140px]"
          v-bind="$attrs"
        />
      </div>
      <div class="divider"></div>
    </div>
    <div v-else class="file-input-container">
      <span class="label-file-input">{{ props.label }}</span>
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="chooseImage"
      />
      <img
        v-if="previewImage"
        :src="previewImage"
        :model-value="previewImage"
        v-bind="$attrs"
        class="image-preview w-[200px] h-[140px]"
      />
      <img
        v-else-if="defaultValue"
        :src="defaultValue"
        class="image-preview w-[200px] h-[140px]"
        v-bind="$attrs"
      />
      <v-icon class="icon-file" icon="mdi-paperclip"></v-icon>
    </div>
    <div class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    required: false,
    default: false,
  },
  defaultValue: {
    type: String,
    required: false,
    default: undefined,
  },
})

const { value, errorMessage } = useField<File>(props.name)
const previewImage = ref()
const emit = defineEmits(['upload-image'])

function chooseImage(event: any) {
  const uploadData = new FormData()
  uploadData.append('file', event.target.files[0], 'file')
  const file = event.target.files[0]
  if (file) {
    emit('upload-image', props.name, uploadData)
    value.value = file
  }
}

watch(value, () => {
  if (value.value) {
    const reader = new FileReader()
    reader.onload = () => {
      previewImage.value = reader.result
    }
    reader.onerror = () => {
      previewImage.value = undefined
    }
    reader.readAsDataURL(value.value)
  } else {
    previewImage.value = undefined
  }
})
</script>

<style scoped lang="scss">
@use 'sass:map';
.file-input-container-readonly {
  width: 100%;
  height: 178px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.label-file-input-readonly {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: normal;
}
.file-input-container-readonly {
  width: 100%;
  height: 144px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.divider {
  height: 1px;
}
.image-preview {
  object-fit: contain;
  object-position: center;
}
.file-input-container {
  width: 270px;
  height: 184px;
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border: 1px solid #cccc;
}
.label-file-input {
  position: absolute;
  top: -10px;
  left: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
  padding: 0px 2px;
  background-color: white;
}

input[type='file'] {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 10;
}
.icon-file {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 0;
}
</style>
