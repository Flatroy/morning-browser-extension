<script setup lang="ts">
import {
  CheckCircleIcon,
  XIcon,
  ExclamationCircleIcon,
  DotsHorizontalIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/vue/solid'
import { useDropZone } from '@vueuse/core'
import { useFileDialog } from '@vueuse/core'

import { API_URL, createToken } from '~/utils/api'

import {
  apiToken,
  apiId,
  tempApiToken,
  tempApiTokenExpires,
} from '~/logic/storage'

const status = ref('')
const statusMessage = ref('')

const dropZoneRef = ref<HTMLDivElement>()
const { isOverDropZone, files } = useDropZone(dropZoneRef, onDrop)
const { onChange, open } = useFileDialog()

onChange((fileList) => {
  const fileArray: File[] | null = fileList ? Array.from(fileList) : null

  files.value = fileArray
})

function sendFiles() {
  status.value = 'Uploading...'
  if (files.value) {
    Array.from([...files.value]).forEach((file: File) => {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = () => {
        if (reader.result) {
          setTimeout(function () {
            sendFileToApi(reader.result as File)
          }, 2000)
        }
      }
    })

    files.value = null
  }
}

// function onDrop(files: File[] | null) {
function onDrop() {
  if (!apiToken.value || !apiId.value) {
    chrome.tabs.create({ url: 'src/options/index.html' })
  }
}

async function sendFileToApi(file: File) {
  if (Date.now() >= Number(tempApiTokenExpires.value) * 1000) {
    await createToken()
  }
  statusMessage.value = ''
  try {
    // Step 1: Get the file upload URL
    const res = await fetch(
      `https://apigw.greeninvoice.co.il/file-upload/v1/url?context=expense&data=%7B%22source%22:5%7D`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tempApiToken.value}`,
        },
      }
    )
    const data = await res.json()
    if (!res.ok) {
      // Handle error
      console.log(data)
      status.value = 'Error!'
      statusMessage.value = data?.errorMessage || 'Failed to get upload URL.'
      return
    }
    const presignedPost = data // Should contain 'url' and 'fields'

    // Step 2: Create FormData and upload the file
    const formData = new FormData()
    Object.entries(presignedPost.fields).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    formData.append('file', new Blob([file]), file.name)
    console.log(file.name)

    const uploadRes = await fetch(presignedPost.url, {
      method: 'POST',
      body: formData,
    })
    if (uploadRes.ok) {
      status.value = 'Success!'
    } else {
      status.value = 'Error!'
      const uploadData = await uploadRes.json()
      statusMessage.value = uploadData?.errorMessage || 'File upload failed.'
    }
  } catch (error) {
    console.error(error)
    status.value = 'Error!'
    statusMessage.value = 'An error occurred.'
  }
}
</script>
<template>
  <div class="m-4">
    <div v-if="status">
      <div
        class="rounded-md p-4 mb-4"
        :class="status === 'Success!' ? 'bg-green-50' : 'bg-red-50'"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <CheckCircleIcon
              v-if="status === 'Success!'"
              class="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
            <ExclamationCircleIcon
              v-else-if="status === 'Error!'"
              class="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
            <DotsHorizontalIcon
              v-else
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3">
            <p
              class="text-sm font-medium"
              :class="status === 'Success!' ? 'text-green-800' : 'text-red-800'"
            >
              {{ status }}
              <template v-if="statusMessage">
                {{ statusMessage }}
              </template>
            </p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                type="button"
                :class="
                  status === 'Success!'
                    ? 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600'
                    : 'text-red-500 bg-red-50 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600'
                "
                class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                @click="status = ''"
              >
                <span class="sr-only">Dismiss</span>
                <XIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="dropZoneRef"
      class="w-full text-center flex justify-center items-center max-w-lg px-6 pt-5 pb-6 border-2 border-dashed rounded-md"
      :class="isOverDropZone ? 'border-gray-500' : 'border-gray-300'"
      @click="open"
    >
      <div class="space-y-1 text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
        >
          <path
            fill="currentColor"
            d="M465.846-250.461h30.769v-203.308l92 92.769 22.001-22L480-511.923 350.615-381.769l21.231 21.231 94-93.231v203.308ZM255.384-120q-23.057 0-39.221-16.163Q200-152.327 200-175.384v-609.232q0-23.057 16.163-39.221Q232.327-840 255.384-840h334.077L760-669.461v494.077q0 23.057-16.163 39.221Q727.673-120 704.616-120H255.384Zm318.693-535.538v-153.693H255.384q-9.23 0-16.923 7.692-7.692 7.693-7.692 16.923v609.232q0 9.23 7.692 16.923 7.693 7.692 16.923 7.692h449.232q9.23 0 16.923-7.692 7.692-7.693 7.692-16.923v-480.154H574.077ZM230.769-809.231v153.693-153.693 658.462-658.462Z"
          />
        </svg>
        <div class="flex text-sm text-gray-600">
          <div>
            <div>
              <div v-if="isOverDropZone">Drop it!</div>

              <div
                v-else
                class="pl-1"
              >
                Drag and drop your receipts here
              </div>
            </div>
            <div class="text-xs text-gray-500">
              GIF, PNG, JPG, PDF up to 10MB
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="files">
      <p class="mt-4">Selected files:</p>
      <ul
        v-for="file in files"
        :key="file.name"
      >
        <li>{{ file.name }}</li>
      </ul>

      <div class="mt-4 py-4 flex justify-end">
        <button
          type="button"
          class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morning-500 items-center"
          @click="files = null"
        >
          <TrashIcon
            class="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          Clear
        </button>
        <button
          type="button"
          class="ml-5 bg-morning-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-morning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morning-500 items-center"
          @click="sendFiles()"
        >
          <PlusIcon
            class="-ml-1 mr-2 h-5 w-5"
            aria-hidden="true"
          />
          Add Expenses to Drafts
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
