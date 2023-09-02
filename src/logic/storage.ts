import { useStorageLocal } from '~/composables/useStorageLocal'

export const tempApiToken = useStorageLocal('tempApiToken', '')
export const tempApiTokenExpires = useStorageLocal('tempApiTokenExpires', '')
export const apiToken = useStorageLocal('apiToken', '')
export const apiId = useStorageLocal('apiId', '')
