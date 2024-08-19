import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
  CAlert,
} from '@coreui/react'
import { useLocation } from 'react-router-dom'
import { add, addimage, getList } from '../../../../services/messaggi'
import FileBase64 from 'react-file-base64'
import { url } from '../../../../services/settings'
import { FaImage, FaPaperPlane } from 'react-icons/fa'

const TablesCustom = () => {
  const { state } = useLocation()
  const { listuser } = state
  const [list, setList] = useState([])
  const [testoMessaggio, setTestoMessaggio] = useState('')
  const [alertVisible, setAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = await localStorage.getItem('emailuser')
        const listaMessaggi = await getList(email)
        const objectList = listaMessaggi.map((msg) => ({
          id: msg.id,
          testo: msg.testo,
          idUtenteSend: msg.idUtenteSend,
          email: msg.email,
          UserSend: msg.UserSend,
        }))
        setList(objectList)
      } catch (e) {
        ////console.error('Errore durante il recupero dei dati', e)
      }
    }
    fetchData()
  }, [])

  const changeText = (event) => {
    setTestoMessaggio(event.target.value)
  }

  const sends = async () => {
    try {
      const email = await localStorage.getItem('emailuser')
      await add(testoMessaggio, email)
      setAlertMessage('Messaggio inviato con successo!')
      setAlertVisible(true)
      setTimeout(() => setAlertVisible(false), 3000)
      setTestoMessaggio('')
    } catch (e) {
      setAlertMessage("Errore durante l'invio del messaggio.")
      setAlertVisible(true)
      setTimeout(() => setAlertVisible(false), 3000)
      //console.error("Errore durante l'invio del messaggio", e)
    }
  }

  const showHtml = (item) => {
    window.open(url + '/messagge/' + item.testo, '_blank', 'noopener,noreferrer')
  }

  const loadImage = async (image) => {
    try {
      const email = await localStorage.getItem('emailuser')
      await addimage(image[0].base64, email)
      setAlertMessage('Immagine caricata con successo!')
      setAlertVisible(true)
      setTimeout(() => setAlertVisible(false), 3000)
    } catch (e) {
      setAlertMessage("Errore durante il caricamento dell'immagine.")
      setAlertVisible(true)
      setTimeout(() => setAlertVisible(false), 3000)
      //console.error("Errore durante il caricamento dell'immagine", e)
    }
  }

  return (
    <>
      {alertVisible && (
        <CAlert color={alertMessage.includes('Errore') ? 'danger' : 'success'} dismissible>
          {alertMessage}
        </CAlert>
      )}
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Lista Messaggi</strong>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">ID</CTableHeaderCell>
                <CTableHeaderCell>Utente Invia</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Testo</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {list.map((item, index) => (
                <CTableRow key={item.id}>
                  <CTableDataCell className="text-center">{index + 1}</CTableDataCell>
                  <CTableDataCell>{item.UserSend}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {!item.testo.includes('/') ? (
                      item.testo
                    ) : (
                      <CButton color="success" variant="outline" onClick={() => showHtml(item)}>
                        Scarica Immagine
                      </CButton>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Invia un Messaggio</strong>
        </CCardHeader>
        <CCardBody>
          <CInputGroup className="mb-4">
            <CFormInput
              placeholder="Scrivi il tuo messaggio qui..."
              value={testoMessaggio}
              onChange={changeText}
            />
            <CButton color="primary" className="px-4" onClick={sends}>
              <FaPaperPlane className="me-2" /> Invia Messaggio
            </CButton>
          </CInputGroup>
          <CInputGroup className="mb-4 align-items-center">
            Per inviare un'immagine, carica qui sotto:
            <FileBase64
              multiple={true}
              onDone={(base64) => loadImage(base64)}
              text="Inserisci immagine"
            />
            <FaImage className="ms-2" />
          </CInputGroup>
        </CCardBody>
      </CCard>
    </>
  )
}

const MessaggiDetail = () => {
  const { state } = useLocation()
  const { listuser } = state

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Lista Messaggi Utente: {listuser['NomeDefunto']}</strong>
          </CCardHeader>
          <CCardBody>
            <TablesCustom />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MessaggiDetail
