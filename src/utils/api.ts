import { apiId, apiToken, tempApiToken, tempApiTokenExpires } from '~/logic'

export const API_URL = 'https://api.greeninvoice.co.il/api/v1'

export const createToken = async () => {
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
  const data = await res?.json()

  if (data?.token) {
    tempApiToken.value = data?.token
    tempApiTokenExpires.value = data?.expires
  } else {
    if (data?.errorMessage) {
      alert('Check your token and try again. Error: ' + data?.errorMessage)
    } else {
      alert('Something went wrong, try again')
    }
  }
}
