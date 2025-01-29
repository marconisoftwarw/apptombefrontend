import * as axios from 'axios'
import { url } from './settings'

export async function addtotem(nome, idCimitero, idTotemHardware) {
  var result = false
  await axios
    .post(url + '/totem', {
      nome: nome,
      idCimitero: Number(idCimitero),
      idTotemHardware: Number(idTotemHardware),
    })
    .then(function () {
      return true
    })
    .catch(function (error) {})
  return result
}

const checkremoteresource = async (url) => {
  const response = await fetch(url, { method: 'HEAD' })
    .then((response) => (response['status'] == '404' ? false : true))
    .catch(() => {
      return false
    })
  return response
}

export async function getList() {
  var lista = []
  await axios
    .get(url + '/totem', {})
    .then(async function (response) {
      var data = response.data
      for (let index in data) {
        var datatemp = {
          nome: data[index].nome,
          id: data[index].id,
          idTotemHardware: data[index].idTotemHardware,
          idUtenteVisibile: data[index].idUtenteVisibile,
          idCimitero: data[index].idCimitero,
          istemplatevalid: await checkremoteresource(
            url + '/cimitero' + data[index].idCimitero + '/' + data[index].id,
          ),
        }
        lista.push(datatemp)
      }
    })
    .catch(function (error) {})
  return lista
}

export async function deleteTotem(id) {
  var ret = true
  await axios
    .post(url + '/totem/delete', { id: id })
    .then(function () {})
    .catch(function () {
      ret = false
    })
  return ret
}

export async function updateTotem(id, idUtenteVisibile) {
  let result = false
  await axios
    .put(url + '/totem/' + id + '/' + idUtenteVisibile)
    .then(() => {
      result = true
    })
    .catch((error) => {
      console.error('Errore nell’aggiornamento del totem:', error)
    })
  return result
}
