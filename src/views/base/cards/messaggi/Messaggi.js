import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { getList } from '../../../../services/defunto'
import { getList as getListContatti } from '../../../../services/contatti'
import { getList as getListCimiteri } from '../../../../services/cimitero'
import { url } from '../../../../services/settings'

const TablesCustom = () => {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  useEffect(() => {
    var objectList = []
    async function fetchData() {
      try {
        var usertype = localStorage.getItem('type')
        var emailuser = await localStorage.getItem('email')
        var defunti = await getList()
        var listaMessaggi = await getListContatti()
        for (var i = 0; i < listaMessaggi.length; i++) {
          var id = listaMessaggi[i].id
          var idCimitero = 0
          var idUrna = 0
          var NomeDefunto = ''
          for (var i2 = 0; i2 < defunti.length; i2++) {
            if (defunti[i2].id == listaMessaggi[i].idDefunto) {
              NomeDefunto = defunti[i2].nome + ' ' + defunti[i2].cognome
              idCimitero = defunti[i2].idCimitero
              idUrna = defunti[i2].idUrna
            }
          }
          if (listaMessaggi[i].approvazione == true) {
            if (usertype != 'UTENTE') {
              objectList.push({
                id: id,
                nome: listaMessaggi[i].name,
                cognome: listaMessaggi[i].surname,
                messaggio: listaMessaggi[i].messaggio,
                NomeDefunto: NomeDefunto,
                approvazione: listaMessaggi[i].approvazione,
                idDefunto: listaMessaggi[i].idDefunto,
                idCimitero: idCimitero,
                idUrna: idUrna,
              })
            } else {
              if (listaMessaggi[i].messaggio == emailuser) {
                objectList.push({
                  id: id,
                  nome: listaMessaggi[i].name,
                  cognome: listaMessaggi[i].surname,
                  messaggio: listaMessaggi[i].messaggio,
                  NomeDefunto: NomeDefunto,
                  approvazione: listaMessaggi[i].approvazione,
                  idDefunto: listaMessaggi[i].idDefunto,
                  idCimitero: idCimitero,
                  idUrna: idUrna,
                })
              }
            }
          }
        }
        setList(objectList)
      } catch (e) {
        //console.error(e)
      }
    }
    fetchData()
  }, [])

  const gotopage = (item) => {
    localStorage.setItem('emailuser', item.messaggio)
    navigate('/messaggi/detail', { state: { listuser: item } })
  }

  const showHtml = (item) => {
    window.open(
      url + '/cimitero' + item.idCimitero + '/' + item.idUrna + '/',
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <>
      <p></p>
      <p></p>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">id</CTableHeaderCell>
            <CTableHeaderCell>Nome</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Cognome</CTableHeaderCell>
            <CTableHeaderCell>Messaggio</CTableHeaderCell>
            <CTableHeaderCell>Inviato da</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {list.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <div>{index + 1}</div>
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.nome}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">{item.cognome}</CTableDataCell>
              <CTableDataCell>
                <strong>{item.messaggio}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <strong>{item.NomeDefunto}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <CButton onClick={() => gotopage(item)}>Scambio Messaggi</CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton onClick={() => showHtml(item)}>Mostra Urna</CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
const Messaggi = () => {
  var [listDefunti, setDefunti] = useState([])
  var [, setLista] = useState([])
  useEffect(() => {
    var list = []

    async function fetchData() {
      if (listDefunti.length === 0) {
        var cimiteri = await getListCimiteri()
        cimiteri.map((item) =>
          list.push({
            id: item.id,
            nome: item.nome,
            citta: item.citta,
            cap: item.cap,
            comune: item.comune,
            provincia: item.regione,
          }),
        )
        setLista(cimiteri)
        setDefunti(...listDefunti, list)
      }
    }
    fetchData()
  }, [])

  if (listDefunti.length > 0) {
    return (
      <CRow>
        <CCol xs={12}>
          <CCardHeader>
            <strong>Lista Messaggi Utente</strong>
          </CCardHeader>
          <TablesCustom />
        </CCol>
      </CRow>
    )
  } else {
    return <div>Caricamento in corso...</div>
  }
}

export default Messaggi
