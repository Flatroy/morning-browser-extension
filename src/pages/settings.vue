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
            Morning API Token and Secret
          </a>
          . &nbsp;Create and enter them below and click Save.
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
        <div class="my-1 relative">
          <input
            id="token"
            v-model="apiToken"
            :type="showSecret ? 'text' : 'password'"
            name="token"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pr-10"
            placeholder=""
          />
          <button
            type="button"
            class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            @click="showSecret = !showSecret"
          >
            <EyeIcon
              v-if="showSecret"
              class="h-4 w-4"
            />
            <EyeOffIcon
              v-else
              class="h-4 w-4"
            />
          </button>
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
import { EyeIcon, EyeOffIcon } from '@heroicons/vue/solid'
import { createToken } from '~/utils/api'
import { apiToken, apiId } from '~/logic/storage'

const status = ref('Not connected')
const buttonDisabled = ref(false)
const showSecret = ref(false)
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
  const success = await createToken()
  buttonDisabled.value = false

  if (success) {
    status.value = 'Connected'
    if (!props.isPage) await router.push('/')
    else {
      alert('Connected, you can close this tab now')
    }
  }
}
</script>

<style scoped></style>
