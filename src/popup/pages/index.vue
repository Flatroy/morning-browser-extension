<script setup lang="ts">
import {
  CheckCircleIcon,
  XIcon,
  ExclamationCircleIcon,
  DotsHorizontalIcon,
} from '@heroicons/vue/solid'
import { useDropZone } from '@vueuse/core'
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

function sendFiles() {
  status.value = 'Uploading...'
  if (files.value) {
    Array.from([...files.value]).forEach((file: File) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        console.log(reader.result)
        if (reader.result) sendFileToApi(reader.result.toString())
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

async function sendFileToApi(file: string) {
  if (Date.now() >= Number(tempApiTokenExpires.value) * 1000) {
    await createToken()
  }
  statusMessage.value = ''
  try {
    const res = await fetch(`${API_URL}/expenses/file`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tempApiToken.value}`,
      },
      body: JSON.stringify({
        file,
      }),
    })
    let data = await res?.json()
    if (res?.status === 201) {
      console.log(data)
      status.value = 'Success!'
    } else {
      console.log(data)
      status.value = 'Error!'
      if (data?.errorMessage) {
        statusMessage.value = data?.errorMessage
      } else {
        statusMessage.value = 'Try again later.'
      }
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div class="m-4">
    {{
      Date.now() >= tempApiTokenExpires * 1000 ? 'Error! Token expired!' : ''
    }}

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
    >
      <div class="space-y-1 text-center">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
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

      <div class="mt-4 py-4 px-4 flex justify-end">
        <button
          type="button"
          class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morning-500"
          @click="files = null"
        >
          Clear
        </button>
        <button
          type="button"
          class="ml-5 bg-morning-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-morning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morning-500"
          @click="sendFiles()"
        >
          Add Expenses to Drafts
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
