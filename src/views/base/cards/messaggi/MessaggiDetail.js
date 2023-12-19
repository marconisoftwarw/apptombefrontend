import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useLocation } from 'react-router-dom'
import { add, addimage, getList } from '../../../../services/messaggi'
import FileBase64 from 'react-file-base64'
import { url } from '../../../../services/settings'

const TablesCustom = () => {
  const { state } = useLocation()
  const { listuser } = state
  const [list, setList] = useState([])
  let testoMessaggio
  useEffect(() => {
    var objectList = []
    async function fetchData() {
      try {
        var email = await localStorage.getItem('emailuser')
        var listaMessaggi = await getList(email)
        for (var i = 0; i < listaMessaggi.length; i++) {
          objectList.push({
            id: listaMessaggi[i].id,
            testo: listaMessaggi[i].testo,
            idUtenteSend: listaMessaggi[i].idUtenteSend,
            email: listaMessaggi[i].email,
            UserSend: listaMessaggi[i].UserSend,
          })
        }
        setList(objectList)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const changeText = (item) => {
    testoMessaggio = item.target.value
  }

  const sends = async () => {
    var email = await localStorage.getItem('emailuser')
    await add(testoMessaggio, email)
    window.location.reload(false)
  }

  const showHtml = (item) => {
    window.open(url + '/messagge' + item.testo, '_blank', 'noopener,noreferrer')
  }

  const loadImage = async (image) => {
    var email = await localStorage.getItem('emailuser')
    await addimage(image[0].base64, email)
    window.location.reload(false)
  }
  return (
    <>
      <p></p>
      <CInputGroup className="mb-3">
        <CFormInput placeholder="messaggio" autoComplete="messaggio" onChange={changeText} />
        <CButton color="primary" className="px-4" onClick={() => sends()}>
          Invia Messaggio
        </CButton>
      </CInputGroup>
      <CInputGroup className="mb-3">
        Per inviare un immagini clicca qui sotto:
        <p></p>
        <FileBase64
          multiple={true}
          onDone={(base64) => loadImage(base64)}
          text="Inserisci immagine"
        />
      </CInputGroup>
      <p></p>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">id</CTableHeaderCell>
            <CTableHeaderCell>Utente Invio</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Testo</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {list.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <div>{index + 1}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.UserSend}</div>
              </CTableDataCell>
              {!item.testo.includes('/') ? (
                <CTableDataCell>
                  <div>{item.testo}</div>
                </CTableDataCell>
              ) : (
                <CButton color="success" variant="outline" onClick={() => showHtml(item)}>
                  Scarica Immagine
                </CButton>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
const MessaggiDetail = () => {
  const { state } = useLocation()
  const { listuser } = state

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader>
          <strong>Lista Messaggi Utente: {listuser['NomeDefunto']}</strong>
        </CCardHeader>
        <TablesCustom />
      </CCol>
    </CRow>
  )
}
export default MessaggiDetail
