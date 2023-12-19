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
import { getList } from '../../../../services/defunto'
import { getList as getListContatti, update } from '../../../../services/contatti'
import { getList as getListCimiteri } from '../../../../services/cimitero'
import { register } from '../../../../services/user'

const TablesCustom = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    var objectList = []
    async function fetchData() {
      try {
        var defunti = await getList()
        var listaMessaggi = await getListContatti()
        for (var i = 0; i < listaMessaggi.length; i++) {
          var id = listaMessaggi[i].id
          var NomeDefunto = ''
          for (var i2 = 0; i2 < defunti.length; i2++) {
            if (defunti[i2].id == listaMessaggi[i].idDefunto) {
              NomeDefunto = defunti[i2].nome + ' ' + defunti[i2].cognome
            }
          }
          objectList.push({
            id: id,
            nome: listaMessaggi[i].name,
            cognome: listaMessaggi[i].surname,
            messaggio: listaMessaggi[i].messaggio,
            NomeDefunto: NomeDefunto,
            approvazione: listaMessaggi[i].approvazione,
            idDefunto: listaMessaggi[i].idDefunto,
          })
        }
        setList(objectList)
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  const updateitem = async (item) => {
    await update(item.id, item.nome, item.cognome, item.messaggio, item.idDefunto, true)
    await register(
      item.nome,
      item.cognome,
      item.nome + '' + item.cognome,
      'default',
      item.messaggio,
      'UTENTE',
    )
    window.location.reload(false)
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
            <CTableHeaderCell>Nome Defunto</CTableHeaderCell>
            <CTableHeaderCell>Approvazione</CTableHeaderCell>
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
              {item.approvazione == false ? (
                <CTableDataCell>
                  <CButton onClick={() => updateitem(item)}>Approva</CButton>
                </CTableDataCell>
              ) : (
                <></>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
const Dialogo = () => {
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

export default Dialogo
