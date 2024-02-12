import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { eliminaDefunto, getList } from '../../../services/defunto'
import { getList as getListCimitero } from '../../../services/cimitero'

const TablesCustom = () => {
  const [list, setList] = useState([])
  useEffect(() => {
    var objectList = []
    async function fetchData() {
      var defunti = await getList()
      var cimiteri = await getListCimitero()
      for (var i = 0; i < defunti.length; i++) {
        var id = defunti[i].id
        var nome = defunti[i].nome
        var cognome = defunti[i].cognome
        var citta = ''
        for (var i2 = 0; i2 < cimiteri.length; i2++) {
          if (cimiteri[i2].id == defunti[i].idCimitero) {
            citta = cimiteri[i2].citta
          }
        }
        var data1 = defunti[i].dataNascita.substring(4)
        data1 = data1.substring(0, data1.length - 12)
        var data2 = defunti[i].dataMorte.substring(4)
        data2 = data2.substring(0, data2.length - 12)
        objectList.push({
          id: id,
          nome: nome,
          soprannome: defunti[i].soprannome,
          datanascita: data1,
          datamorte: defunti[i].dataMorte,
          cognome: cognome,
          cimitero: citta,
          nomeAdmin: defunti[i].nomeAdmin,
          sepoltura: defunti[i].luogodisepoltura,
        })
      }

      setList(objectList)
    }
    fetchData()
  }, [])

  const deleteElemento = async (item) => {
    await eliminaDefunto(item.id)
    window.location.reload(false)
  }

  return (
    <>
      <p></p>
      <p></p>
      <CTable align="middle" responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
              className="text-center"
            >
              id
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Nome
            </CTableHeaderCell>
            <CTableHeaderCell
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
              className="text-center"
            >
              Cognome
            </CTableHeaderCell>
            <CTableHeaderCell
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
              className="text-center"
            >
              Soprannome
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Sepoltura
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Cimitero
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Data Morte
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Data Nascita
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Utente Admin
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Azioni
            </CTableHeaderCell>
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
              <CTableDataCell className="text-center">{item.soprannome}</CTableDataCell>
              <CTableDataCell>
                <strong>{item.cimitero}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <strong>{item.sepoltura}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <strong>{item.datamorte}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <strong>{item.datanascita}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <strong>{item.nomeAdmin}</strong>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" variant="outline" onClick={() => deleteElemento(item)}>
                  Elimina
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}
const Cards = () => {
  var [listDefunti, setDefunti] = useState([])
  var [listaCimiteri, setLista] = useState([])

  const navigate = useNavigate()
  const gotoadd = async () => {
    navigate('/defunto/add', { state: { list: listaCimiteri } })
  }

  useEffect(() => {
    var list = []

    async function fetchData() {
      if (listDefunti.length === 0) {
        var cimiteri = await getListCimitero()
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
            <strong>Lista Defunti</strong>
          </CCardHeader>
          <CButton color="success" onClick={() => gotoadd()}>
            Inserimento Defunto
          </CButton>
          <TablesCustom />
        </CCol>
      </CRow>
    )
  } else {
    return <div>Caricamento in corso...</div>
  }
}

export default Cards
