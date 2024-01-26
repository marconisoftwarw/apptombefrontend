import * as axios from 'axios'
import { url } from './settings'

export async function generateTemplate(
  nome,
  testo,
  template,
  image1,
  image2,
  image3,
  idUser,
  idCimitero,
  templateType,
  idTotem,
) {
  var result = false
  await axios
    .post(url + '/template/generate', {
      nome: nome,
      testo: testo,
      template: template,
      image1: image1,
      image2: image2,
      image3: image3,
      idUser: idUser,
      idCimitero: idCimitero,
      idTotem: idTotem,
      templateType: templateType,
    })
    .then(async function (response) {
      await axios
        .post(url + '/defunto/updateurnae', {
          id: Number(idUser),
          idUrna: idTotem,
        })
        .then(function (response) {
          return true
        })
        .catch(function (error) {})
      return true
    })
    .catch(function (error) {})
  return result
}
