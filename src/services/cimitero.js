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
    .then(function (response) {
      return true
    })
    .catch(function (error) {
      console.log('Errore: ' + error.toString())
    })
  return result
}

export async function getList() {
  var lista = []
  const token = localStorage.getItem('token')

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
    .catch(function (error) {
      console.log('Errore: caricamento cimiteri registrati: ' + error)
    })
  return lista
}

export async function deleteCimitero(id) {
  var ret = true
  const token = localStorage.getItem('token')
  const config = {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', token: token },
  }
  await axios
    .post(url + '/cimitero/delete', { id: id })
    .then(function (response) {
      var data = response.data
    })
    .catch(function (error) {
      ret = false
      console.log('Errore: eliminazione utente: ' + error)
    })
  return ret
}
