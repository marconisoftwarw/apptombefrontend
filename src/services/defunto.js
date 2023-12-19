import * as axios from 'axios'
import { url } from './settings'
import { getuserList } from './user'

export async function add(
  nome,
  cognome,
  idCimitero,
  dataMorte,
  dataNascita,
  luogodisepoltura,
  soprannome,
) {
  var idUser = await localStorage.getItem('idUser')
  var result = false
  await axios
    .post(url + '/defunto', {
      nome: nome,
      cognome: cognome,
      idCimitero: Number(idCimitero),
      dataMorte: dataMorte,
      idUtente: Number(idUser),
      dataNascita: dataNascita,
      luogodisepoltura: luogodisepoltura,
      soprannome: soprannome,
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
  var userlist = await getuserList()
  await axios
    .get(url + '/defunto', {})
    .then(async function (response) {
      var data = response.data
      var nomeAdmin = ''
      for (let index in data) {
        for (let index2 in userlist) {
          if (userlist[index2].id == data[index].idUtente) {
            nomeAdmin = userlist[index2].name + '  ' + userlist[index2].surname
          }
        }
        var dataMorte = data[index].dataMorte.substring(4)
        dataMorte = dataMorte
          .toString()
          .substring(0, dataMorte.length - 12)
          .toString()
        var datatemp = {
          id: data[index].id,
          nome: data[index].nome,
          dataNascita: data[index].dataNascita,
          luogodisepoltura: data[index].luogodisepoltura,
          soprannome: data[index].soprannome,
          cognome: data[index].cognome,
          idCimitero: data[index].idCimitero,
          idUrna: data[index].idUrna,
          nomeAdmin: nomeAdmin,
          dataMorte: dataMorte,
        }
        lista.push(datatemp)
      }
    })
    .catch(function (error) {
      console.log('Errore: caricamento cimiteri registrati: ' + error)
    })
  return lista
}

export async function eliminaDefunto(id) {
  var ret = true

  await axios
    .post(url + '/defunto/delete', { id: id })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      ret = false
      console.log('Errore: eliminazione utente: ' + error)
    })
  return ret
}

export async function searchbyname(name, regione, citta) {
  var lista = []

  await axios
    .post(url + '/defunto/search', { name: name, regione: regione, citta: citta })
    .then(async function (response) {
      var data = response.data
      for (let index in data) {
        var datatemp = {
          id: data[index].id,
          nome: data[index].nome,
          cognome: data[index].cognome,
          idCimitero: data[index].idCimitero,
        }
        lista.push(datatemp)
      }
    })
    .catch(function (error) {
      lista = []
      console.log('Errore: eliminazione utente: ' + error)
    })
  return lista
}

export async function setFollow(nome, cognome, email, NomeDefunto, id) {
  var ret = true

  await axios
    .post(url + '/contatti', { idDefunto: id, name: nome, surname: cognome, messaggio: email })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      ret = false
      console.log('Errore: eliminazione utente: ' + error)
    })
  return ret
}

export async function follow(nome, cognome, email, NomeDefunto, idDefunto) {
  var ret = true
  const token = localStorage.getItem('token')
  var body = {
    nome: nome,
    cognome: cognome,
    email: email,
    NomeDefunto: NomeDefunto,
  }
  const config = {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', token: token },
  }
  await axios
    .post(url + '/defunto/follow', body)
    .then(function (response) {
      ret = response.data
      setFollow(nome, cognome, email, NomeDefunto, idDefunto)
    })
    .catch(function (error) {
      ret = false
      console.log('Errore: eliminazione utente: ' + error)
    })
  return ret
}
