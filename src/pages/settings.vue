<template>
  <div class="">
    <div class="m-4">
      <div class="mb-4">
        <h2 class="text-lg leading-6 font-medium text-gray-900">Login</h2>
        <p class="mt-1 text-base text-gray-500">
          To use this extension, you need to add your
          <a
            href="https://app.greeninvoice.co.il/settings/developers/api"
            target="_blank"
            class="underline"
          >
            Morning API Token and Secret.
          </a>
          &nbsp;Create and enter them below and click Save.
        </p>
      </div>

      <form>
        <label
          for="apiId"
          class="block text-sm font-medium text-gray-700"
        >
          Api Token (מפתח)
        </label>
        <div class="my-1">
          <input
            id="apiId"
            v-model="apiId"
            type="text"
            name="apiId"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder=""
          />
        </div>

        <label
          for="token"
          class="block text-sm font-medium text-gray-700"
        >
          Api Secret (סוד)
        </label>
        <div class="my-1">
          <input
            id="token"
            v-model="apiToken"
            type="text"
            name="token"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder=""
          />
        </div>
      </form>
    </div>
    <div class="py-4 px-4 flex justify-end">
      <button
        v-if="!isPage"
        type="button"
        class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morning-500"
        @click="$router.back"
      >
        Go Back
      </button>
      <button
        :disabled="buttonDisabled"
        type="button"
        class="ml-5 bg-morning-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-morning-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morning-500"
        @click="save"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { API_URL } from '~/utils/api'
import {
  apiToken,
  apiId,
  tempApiToken,
  tempApiTokenExpires,
} from '~/logic/storage'

const status = ref('Not connected')
const buttonDisabled = ref(false)
const router = useRouter()

const props = defineProps({
  isPage: {
    type: Boolean,
    default: false,
  },
})

async function save() {
  if (!apiId.value || !apiToken.value) {
    alert('Please enter your API Token and API Secret')
    return
  }
  buttonDisabled.value = true
  const res = await fetch(`${API_URL}/account/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: apiId.value,
      secret: apiToken.value,
    }),
  })
  buttonDisabled.value = false
  let data = await res?.json()

  if (data?.token) {
    tempApiToken.value = data?.token
    tempApiTokenExpires.value = data?.expires
    status.value = 'Connected'
    // route to the next page
    if (!props.isPage) await router.push('/')
    else {
      alert('Connected, you can close this tab now')
      /*chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        chrome.tabs.remove(tabs[0].id);
      });*/
    }
  } else {
    if (data?.errorMessage) {
      alert('Check your token and try again. Error: ' + data?.errorMessage)
    } else {
      alert('Something went wrong, try again')
    }
  }
}
</script>

<style scoped></style>
