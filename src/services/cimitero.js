import * as axios from 'axios'
import { url } from './settings'

export async function addcimitero(nome, nazione, citta, regione) {
  var result = false
  await axios
    .post(url + '/cimitero', {
      nome: nome,
      nazione: nazione,
      citta: citta,
      regione: regione,
    })
    .then(function () {
      return true
    })
    .catch(function () {
      //console.error('Errore: ' + error.toString())
    })
  return result
}

export async function getCimiteroNomeById(id) {
  const lista = await getList()
  const cimitero = lista.find((item) => item.id === id)
  return cimitero ? cimitero.citta : null
}

export async function getList() {
  var lista = []
  await axios
    .get(url + '/cimitero', {})
    .then(function (response) {
      var data = response.data
      for (let index in data) {
        var datatemp = {
          id: data[index].id,
          nome: data[index].nome,
          citta: data[index].citta,
          nazione: data[index].nazione,
          regione: data[index].regione,
        }
        lista.push(datatemp)
      }
    })
    .catch(function () {
      //console.error('Errore: caricamento cimiteri registrati: ' + error)
    })
  return lista
}

export async function deleteCimitero(id) {
  var ret = true
  const token = localStorage.getItem('token')
  await axios
    .post(url + '/cimitero/delete', { id: id })
    .then(function (response) {})
    .catch(function () {
      ret = false
      //console.error('Errore: eliminazione utente: ' + error)
    })
  return ret
}
