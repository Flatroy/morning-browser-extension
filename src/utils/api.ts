import { apiId, apiToken, tempApiToken, tempApiTokenExpires } from '~/logic'

export const API_URL = 'https://api.greeninvoice.co.il/api/v1'

const IDP_URL = 'https://api.morning.co/idp/v1'

export const createToken = async (): Promise<boolean> => {
  const res = await fetch(`${IDP_URL}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: apiId.value,
      client_secret: apiToken.value,
    }),
  })

  const data = await res?.json()

  if (data?.accessToken) {
    tempApiToken.value = data.accessToken
    tempApiTokenExpires.value = data.expiresAt
    return true
  }

  if (data?.error_description) {
    alert('Check your token and try again. Error: ' + data.error_description)
  } else {
    alert('Something went wrong, try again')
  }

  return false
}
