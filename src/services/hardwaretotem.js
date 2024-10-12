import * as axios from 'axios'
import { url } from './settings'
import { getList as getListCimiteri, getCimiteroNomeById } from './cimitero'

export async function deleteCimitero(id) {
  var result = false
  await axios
    .delete(url + '/totemhardware/delete/' + id, { id: id })
    .then(function (response) {
      window.location.reload()
      return true
    })
    .catch(function (error) {})
  return result
}

export async function getNome(id) {
  var nome = ''
  var listacimiteri = await getListCimiteri()
  for (var i = 0; i < listacimiteri.length; i++) {
    if (listacimiteri[i].id == id) {
      nome = listacimiteri[i].citta
    }
  }
  return nome
}

export async function getList() {
  var lista = []

  await axios
    .get(url + '/totemhardware', {})
    .then(async function (response) {
      var data = response.data
      for (let index in data) {
        var datatemp = {
          id: data[index].id,
          idCimitero: data[index].idCimitero,
          Nome: await getNome(data[index].idCimitero),
          citta: await getCimiteroNomeById(data[index].idCimitero),
        }
        lista.push(datatemp)
      }
    })
    .catch(function (error) {})
  return lista
}

export async function addtotem(idCimitero) {
  var ret = true

  await axios
    .post(url + '/totemhardware', { idCimitero: idCimitero })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      ret = false
    })
  return ret
}
