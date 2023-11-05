/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CButton,
  CTableRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import ReactImg from 'src/assets/images/react.jpeg'
import { getList as getListCimitero } from '../../../services/cimitero'
import { getList as getListDefunti } from '../../../services/defunto'
import { getList as getTotemList } from '../../../services/totem'
import Dropdown from 'react-bootstrap/Dropdown'

const TablesCustom = () => {
  const navigate = useNavigate()
  const [users, setUserList] = useState([])
  useEffect(() => {
    var userObjectList = []
    async function fetchData() {
      var defunti = await getListDefunti()
      var cimiteri = await getListCimitero()
      var listaTotem = await getTotemList()

      for (var i = 0; i < defunti.length; i++) {
        var totemListValue = []
        var isValid = false
        var idCimitero = 0
        var id = defunti[i].id
        var nome = defunti[i].nome
        var cognome = defunti[i].cognome
        var dataMorte = defunti[i].dataMorte
        var citta = ''
        for (var i2 = 0; i2 < cimiteri.length; i2++) {
          if (cimiteri[i2].id == defunti[i].idCimitero) {
            citta = cimiteri[i2].citta
            idCimitero = cimiteri[i2].id
          }
        }

        for (var i3 = 0; i3 < listaTotem.length; i3++) {
          if (idCimitero == listaTotem[i3].idCimitero) {
            isValid = true
            var totemName = listaTotem[i3].id
            totemListValue.push(totemName)
          }
        }
        if (isValid == true) {
          userObjectList.push({
            id: id,
            nome: nome,
            cognome: cognome,
            cimitero: citta,
            idCimitero: idCimitero,
            totemList: totemListValue,
            dataMorte: dataMorte,
          })
        }
      }

      setUserList(userObjectList)
    }
    fetchData()
  }, [])

  const setlayout = (item, idTotem) => {
    localStorage.setItem('idDefunto', item.id)
    localStorage.setItem('idCimitero', item.idCimitero)
    localStorage.setItem('idTotem', idTotem)
    localStorage.setItem(
      'NomeDefuntoLoad',
      item.nome + ' ' + item.cognome + '<br></br>' + item.dataMorte,
    )
    navigate('/acquisto/add', {
      state: { idDefunto: item.id, idCimitero: item.idCimitero, idTotem: idTotem },
    })
  }

  return (
    <>
      <p></p>
      <p></p>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>id</CTableHeaderCell>
            <CTableHeaderCell>Nome</CTableHeaderCell>
            <CTableHeaderCell>Cognome</CTableHeaderCell>
            <CTableHeaderCell>Cimitero</CTableHeaderCell>
            <CTableHeaderCell>Configura Layout</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <div>{item.id}</div>
              </CTableDataCell>
              <CTableDataCell>{item.nome}</CTableDataCell>
              <CTableDataCell>
                <strong>{item.cognome}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <strong>{item.cimitero}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Seleziona Urna
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {item.totemList.map((value) => (
                      <Dropdown.Item onClick={() => setlayout(item, value)}>{value}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
const Cards = () => {
  var [cimiteriList, setCimiteriList] = useState([])
  useEffect(() => {
    var list = []
    async function fetchData() {
      if (cimiteriList.length === 0) {
        var cimiteri = await getTotemList()
        cimiteri.map((item) =>
          list.push({
            id: item.id,
            nome: item.nome,
            idCimitero: item.idCimitero,
          }),
        )

        setCimiteriList(...cimiteriList, list)
      }
    }
    fetchData()
  }, [])

  if (cimiteriList.length > 0) {
    return (
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Acquisto Spazio</strong>
            </CCardHeader>
            <CCardBody>
              <p className="text-medium-emphasis small">
                Per effettuare un acquisto seleziona il cimitero e inserisci una delle immagini che
                vuoi visualizzare sui monitor
              </p>
              <CCard style={{ width: '30rem' }}>
                <CCardImage orientation="top" src={ReactImg} />
                <CCardBody>
                  <CCardTitle>Acquista uno spazio</CCardTitle>
                  <CCardText>1) Seleziona sotto il defunto </CCardText>
                  <p></p>
                  <CCardText>2) Seleziona il layout da visualizzare</CCardText>
                  <p></p>
                </CCardBody>
              </CCard>
            </CCardBody>
          </CCard>

          <TablesCustom />
        </CCol>
      </CRow>
    )
  } else {
    return <div>Caricamento in corso...</div>
  }
}

export default Cards
