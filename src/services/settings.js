//var path = 'http://backend.memoryp.org:'
var path = 'http://127.0.0.1:'
export const url = path + '3001'

export function getConfig() {
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  return config
}
