/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import {
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CButton,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
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

      const urneAssociate = new Set() // Per tenere traccia delle urne già associate

      for (var i = 0; i < defunti.length; i++) {
        var totemListValue = []
        var isValid = false
        var idCimitero = 0
        var id = defunti[i].id
        var nome = defunti[i].nome
        var cognome = defunti[i].cognome
        var dataMorte = defunti[i].dataMorte
        var istemplatevalid = false
        var citta = ''

        // Cerca il cimitero
        for (var i2 = 0; i2 < cimiteri.length; i2++) {
          if (cimiteri[i2].id == defunti[i].idCimitero) {
            citta = cimiteri[i2].citta
            idCimitero = cimiteri[i2].id
          }
        }

        // Cerca i totem per il cimitero e registra quelli associati
        for (var i3 = 0; i3 < listaTotem.length; i3++) {
          if (idCimitero == listaTotem[i3].idCimitero) {
            isValid = true
            var totemName = listaTotem[i3].id
            istemplatevalid = listaTotem[i3].istemplatevalid
            if (istemplatevalid) {
              urneAssociate.add(totemName) // Aggiungi l'urna alla lista di quelle associate
            }
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
            istemplatevalid: istemplatevalid,
          })
        }
      }

      // Filtra le urne non associate
      userObjectList = userObjectList.map((user) => ({
        ...user,
        totemList: user.totemList.filter((totem) => !urneAssociate.has(totem)),
      }))

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
      <CTable align="middle" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              id
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Nome
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Cognome
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Cimitero
            </CTableHeaderCell>
            <CTableHeaderCell style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
              Configura Layout
            </CTableHeaderCell>
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
                {item.istemplatevalid == true ? (
                  <>
                    <CTableDataCell className="text-center" key={Math.random()}>
                      <CButton onClick={() => setlayout(item, item.totemList[0])}>
                        Modifica Urna
                      </CButton>
                    </CTableDataCell>
                  </>
                ) : (
                  <Dropdown style={{ height: 80 }}>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{ marginTop: '10px' }}
                    >
                      Seleziona Urna
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {item.totemList.map((value) => (
                        <Dropdown.Item onClick={() => setlayout(item, value)}>
                          {value}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                )}
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
      <CRow style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
        <CCol style={{ backgroundColor: 'rgb(176, 219, 240)' }}>
          <CCardHeader style={{ backgroundColor: 'rgb(176, 219, 240)', marginTop: '30px' }}>
            <strong>Acquisto Spazio</strong>
          </CCardHeader>

          <TablesCustom />
        </CCol>
      </CRow>
    )
  } else {
    return <div>Caricamento in corso...</div>
  }
}

export default Cards
