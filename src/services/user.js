import * as axios from 'axios'
import { url, getConfig } from './settings'

export async function loginUser(username, password) {
  var result = false
  await axios
    .post(url + '/user/login', {
      username: username,
      password: password,
    })
    .then(async function (response) {
      if (response.data.token) {
        localStorage.setItem('token', response.data.token.toString())
        localStorage.setItem('authenticated', true)
        localStorage.setItem('idUser', response.data.idUser.toString())
        localStorage.setItem('type', response.data.type.toString())
        localStorage.setItem('email', response.data.email.toString())
        result = true
      }
    })
    .catch(function (error) {
      localStorage.setItem('authenticated', false)
      console.log('Errore: ' + error.toString())
    })
  return result
}

export async function register(name, surname, username, password, email, type) {
  var result = true
  await axios
    .post(url + '/user', {
      name: name,
      username: username,
      surname: surname,
      password: password,
      email: email,
      enable: true,
      type: type,
    })
    .then(async function (response) {
      try {
        await axios
          .post(url + '/user/sendmail', {
            message:
              'Il tuo utente è stato creato con successo con i dati: \nusername: ' +
              name +
              surname +
              ' e Password: ' +
              password +
              '\n Per accedere al sito apri il seguente link: http://dashboard.memoryp.org:3009',
            email: email,
          })
          .then(async function (response) {
            console.log(response.data)
            result = true
          })
          .catch(function (error) {
            console.log('Errore: ' + error.toString())
          })
      } catch (err) {
        console.log('utente già registrato')
      }

      return response
    })
    .catch(function (error) {
      result = false
      console.log('Errore: ' + error)
    })
  return result
}

export async function getuserList() {
  var lista = []
  const config = getConfig()
  await axios
    .get(url + '/user', {})
    .then(function (response) {
      var data = response.data
      for (let index in data) {
        var datatemp = {
          id: data[index].id,
          name: data[index].name,
          surname: data[index].surname,
          username: data[index].username,
          password: data[index].password,
          email: data[index].email,
          type: data[index].type,
          enable: data[index].enable,
          dataregistrazione: data[index].dataregistrazione.substring(0, 10),
        }
        lista.push(datatemp)
      }
    })
    .catch(function (error) {
      console.log('Errore: caricamento utenti registrati: ' + error)
    })
  return lista
}

export async function changeStateUser(id, State) {
  var lista = []
  const token = localStorage.getItem('token')

  await axios
    .post(url + '/user/updatestate', { id: id, enable: State })
    .then(function (response) {
      var data = response.data
    })
    .catch(function (error) {
      console.log('Errore: caricamento utenti registrati: ' + error)
    })
  return lista
}

export async function deleteUser(id) {
  var ret = true

  await axios
    .post(url + '/user/delete:' + id, { id: id })
    .then(function (response) {
      ret = true
    })
    .catch(function (error) {
      ret = false
      console.log('Errore: eliminazione utente: ' + error)
    })
  return ret
}

export async function aggiornatipologia(id, type) {
  var ret = true

  await axios
    .post(url + '/user/updateusertype', { id: id, type: type })
    .then(function (response) {
      var data = response.data
    })
    .catch(function (error) {
      ret = false
      console.log('Errore: eliminazione utente: ' + error)
    })
  return ret
}
