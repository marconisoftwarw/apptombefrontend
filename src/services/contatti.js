import * as axios from 'axios'
import { url } from './settings'

export async function getList() {
  var lista = []

  await axios
    .get(url + '/contatti', {})
    .then(function (response) {
      var data = response.data
      for (let index in data) {
        var datatemp = {
          id: data[index].id,
          name: data[index].name,
          surname: data[index].surname,
          messaggio: data[index].messaggio,
          idDefunto: data[index].idDefunto,
          approvazione: data[index].approvazione,
        }
        lista.push(datatemp)
      }
    })
    .catch(function (error) {
      //console.error('Errore: caricamento cimiteri registrati: ' + error)
    })
  return lista
}

export async function update(id, name, surname, message, idDefunto) {
  var result = false
  await axios
    .put(url + '/contatti/' + id, {
      name: name,
      surname: surname,
      messaggio: message,
      idDefunto: Number(idDefunto),
      approvazione: true,
    })
    .then(async function (response) {
      //console.error(response.data)
      try {
        await axios
          .post(url + '/user/sendmail', {
            message: 'Creazione utente con username: ' + name + surname + ' e Password: default',
            email: message,
          })
          .then(async function (response) {
            //console.error(response.data)
            result = true
          })
          .catch(function (error) {
            //console.error('Errore: ' + error.toString())
          })
      } catch (err) {
        //console.error('utente già registrato')
      }
      result = true
    })
    .catch(function (error) {
      //console.error('Errore: ' + error.toString())
    })

  return result
}
