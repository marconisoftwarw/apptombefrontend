import * as axios from 'axios'
import { getConfig, url } from './settings'

export async function createUser({ name, surname, username, password, email, enable, type }) {
  try {
    const response = await axios.post(`${url}/user`, {
      name: name,
      surname: surname,
      username: username,
      password: password,
      email: email,
      enable: enable, // Using the enable value from the form
      type: type, // Using the type value from the form
    })

    // Check if the user creation is successful
    if (response.data.success) {
      return { success: true, message: 'User created successfully' }
    } else {
      return { success: false, message: 'Failed to create user' }
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return { success: false, message: 'An error occurred during user creation' }
  }
}

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
      //console.error('Errore: ' + error.toString())
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
            //console.error(response.data)
            result = true
          })
          .catch(function (error) {
            //console.error('Errore: ' + error.toString())
          })
      } catch (err) {
        //console.error('utente già registrato')
      }

      return response
    })
    .catch(function (error) {
      result = false
      //console.error('Errore: ' + error)
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
      //console.error('Errore: caricamento utenti registrati: ' + error)
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
      //console.error('Errore: caricamento utenti registrati: ' + error)
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
      //console.error('Errore: eliminazione utente: ' + error)
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
      //console.error('Errore: eliminazione utente: ' + error)
    })
  return ret
}
