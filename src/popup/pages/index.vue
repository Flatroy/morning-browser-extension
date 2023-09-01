<script setup lang="ts">
import {CheckCircleIcon, XIcon, ExclamationCircleIcon, DotsHorizontalIcon} from '@heroicons/vue/solid'
import {useDropZone} from '@vueuse/core'
import {useFetch} from "@vueuse/core/index";


const apiBaseUrl = 'https://api.greeninvoice.co.il/api/v1';
const tempApiToken = ref('')
const tempApiTokenExpires = ref('')
const status = ref('')

onMounted(async () => {
  const data = await chrome.storage.sync.get(['tempApiToken'], (result) => {
    tempApiToken.value = result.tempApiToken || ''
  })
  tempApiToken.value = data?.tempApiToken
  await chrome.storage.sync.get(['tempApiTokenExpires'], (result) => {
    tempApiTokenExpires.value = result.tempApiTokenExpires || ''
  })
  await chrome.storage.sync.get(['apiToken'], (result) => {
    if (!result.apiToken) {
      chrome.tabs.create({url: 'src/options/index.html'});
    }
  })
  // console.log(tempApiToken.value, tempApiTokenExpires.value)
  // if (!tempApiToken.value || !tempApiTokenExpires.value || Date.now() >= tempApiTokenExpires * 1000) {
  //   await updateToken()
  // }

});
watch(tempApiToken, async (value) => {
  if(chrome.storage.sync.get(['apiToken']).apiToken) {

    await updateToken()
  }
})

watch(tempApiTokenExpires, async (value) => {

  if(chrome.storage.sync.get(['apiToken']).apiToken) {
    if (Date.now() >= tempApiTokenExpires * 1000) {
      await updateToken()
    }
  }
})

const dropZoneRef = ref<HTMLDivElement>()

function sendFiles() {
  status.value = 'Uploading...'
  Array.from(this.files).forEach(file => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      console.log(reader.result)
      sendFileToApi(reader.result)
    }
  });

  this.files = null

}

// function onDrop(files: File[] | null) {
function onDrop() {

// transform to base64 all files

}


async function updateToken() {
  const userApiToken = ref('')
  await chrome.storage.sync.get(['apiToken'], (result) => {
    userApiToken.value = result.apiToken || ''
  })
  const apiId = ref('')
  await chrome.storage.sync.get(['apiId'], (result) => {
    apiId.value = result.apiId || ''
  })

  const {error, data} = await useFetch(apiBaseUrl + '/account/token', {
    headers: {
      'Content-Type': 'application/json',
    },
  }).post({
    id: apiId.value,
    secret: userApiToken.value
  }).json()


  if (data.value?.token) {
    tempApiToken.value = data.value.token;

    chrome.storage.sync.set({tempApiToken: data.value.token})
    chrome.storage.sync.set({tempApiTokenExpires: data.value.expires})
  } else {
    if (error.value) {
      status.value = 'Error. Check your token'

    }
    status.value = 'Error. Check your token'
  }

}

function sendFileToApi(file) {

  if (Date.now() >= tempApiTokenExpires * 1000) {
    updateToken()
  }
  useFetch(apiBaseUrl + '/expenses/file', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tempApiToken.value}`,
    },
  }).post({
    file
  }).json()
      .then(response => {
        if (response.statusCode.value !== 201) {
          console.log(response.data.errorCode)
          status.value = 'Error!'
          return
        } else {
          status.value = 'Success!'
        }
      })
      .catch(error => {
        status.value = 'Error! ' + error.data.errorMessage;
      })

}


const {isOverDropZone, files} = useDropZone(dropZoneRef, onDrop)

</script>

<template>
  <div class=" m-4">
    <!--    <h1 class="text-3xl font-bold underline pb-6">Hello world from Popup!</h1>-->
    {{ Date.now() >= tempApiTokenExpires * 1000 ? 'Error! Token expired!' : '' }}
    {{ tempApiTokenExpires }}
    {{ tempApiToken }}
    <div v-if="status">

      <div
          class="rounded-md  p-4 mb-4"
          :class="status === 'Success!' ? 'bg-green-50' : 'bg-red-50' "
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <CheckCircleIcon v-if="status==='Success!'" class="h-5 w-5 text-green-400" aria-hidden="true"/>
            <ExclamationCircleIcon v-else-if="status==='Error!'" class="h-5 w-5 text-red-400" aria-hidden="true"/>
            <DotsHorizontalIcon v-else class="h-5 w-5 text-gray-400" aria-hidden="true"/>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium " :class="status === 'Success!' ? 'text-green-800' : 'text-red-800' ">
              {{ status }}</p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                  type="button"
                  :class="status === 'Success!' ? 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600' : 'text-red-500 bg-red-50 hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600' "
                  class="inline-flex  rounded-md p-1.5   focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  @click="status = false">
                <span class="sr-only">Dismiss</span>
                <XIcon class="h-5 w-5" aria-hidden="true"/>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div
        ref="dropZoneRef"
        class=" w-full text-center flex justify-center items-center max-w-lg px-6 pt-5 pb-6 border-2  border-dashed rounded-md"

        :class="isOverDropZone ? 'border-gray-500' : 'border-gray-300'">
      <div class="space-y-1 text-center">
        <svg
            class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
            aria-hidden="true">
          <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        <div class="flex text-sm text-gray-600">
          <div>
            <div>
              <!--            <label for="file-upload"-->
              <!--                   class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">-->
              <!--              <span>Upload a file</span>-->
              <!--              <input id="file-upload" @change="inputChange" name="file-upload" type="file" class="sr-only">-->
              <!--            </label>-->
              <!--            or-->
              <div v-if="isOverDropZone">Drop it!</div>

              <div v-else class="pl-1">Drag and drop your files here</div>


            </div>
            <div class="text-xs text-gray-500">
              GIF, PNG, JPG, SVG, PDF up to 10MB
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="files">
      <p class="mt-4">Selected files:</p>
      <ul v-for="file in files" :key="file.name">
        <li>{{ file.name }}</li>
      </ul>


      <div class="mt-4 py-4 px-4 flex justify-end ">
        <button
            type="button"
            class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morning-500"
            @click="files = null">
          Clear
        </button>
        <button
            type="button"
            class="ml-5 bg-morning-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-morning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morning-500"
            @click="sendFiles()">
          Add Expenses to Drafts
        </button>
      </div>
    </template>
    <!--    <div class="mt-4">
    
          <RouterLink to="/settings"
                      class="bg-morning-500 border border-transparent rounded-md shadow-sm py-1 px-2 inline-flex justify-center text-sm font-medium text-white hover:bg-morning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morning-500">
            Settings
          </RouterLink>
        </div>-->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
