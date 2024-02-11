import * as axios from 'axios'
import { url } from './settings'
import { getuserList } from './user'

export async function getList(email) {
  var lista = []

  await axios
    .post(url + '/messaggio/search', { email: email })
    .then(async function (response) {
      var data = response.data
      var UserSend = ''
      var listaUtente = await getuserList()
      for (let index in data) {
        for (var i = 0; i < listaUtente.length; i++) {
          if (data[index].idUtenteSend == listaUtente[i].id) {
            UserSend = listaUtente[i].username
          }
        }
        var datatemp = {
          id: data[index].id,
          testo: data[index].testo,
          idUtenteSend: data[index].idUtenteSend,
          email: data[index].email,
          UserSend: UserSend,
        }
        lista.push(datatemp)
      }
    })
    .catch(function (error) {
      //console.error('Errore: caricamento cimiteri registrati: ' + error)
    })
  return lista
}

export async function add(messaggio, emailReceiver, isImage) {
  var isImg = isImage
  if (isImage == undefined || isImage == null) {
    isImg = false
  }
  var idUser = await localStorage.getItem('idUser')
  var result = false
  await axios
    .post(url + '/messaggio', {
      messaggio: messaggio,
      email: emailReceiver,
      idUtenteSend: Number(idUser),
      testo: messaggio,
      isImage: isImg,
    })
    .then(function () {
      return true
    })
    .catch(function (error) {
      //console.error('Errore: ' + error.toString())
    })
  return result
}

export async function addimage(image, emailReceiver) {
  var result = false
  await axios
    .post(url + '/messaggio/addimage', {
      image: image,
    })
    .then(function (response) {
      if (response.data != false) {
        add(response.data, emailReceiver, true)
      }
    })
    .catch(function (error) {
      //console.error('Errore: ' + error.toString())
    })
  return result
}
