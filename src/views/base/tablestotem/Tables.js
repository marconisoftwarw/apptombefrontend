/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cifIt } from '@coreui/icons'
import avatar1 from 'src/assets/images/totem.jpeg'
import { deleteTotem, getList } from '../../../services/totem'
import { url } from '../../../services/settings'

const TablesTotem = (props) => {
  const [users, setUserList] = useState([])
  useEffect(() => {
    var list = []
    async function fetchData() {
      var cimiteri = await getList()
      cimiteri.map(async (item) =>
        list.push({
          id: item.id,
          nome: item.nome,
          avatar: { src: avatar1, status: 'success' },
          type: item.type,
          provincia: item.regione,
          cap: item.cap,
          user: {
            name: item.citta,
            new: false,
            registered: '',
          },
          country: { name: 'ITA', flag: cifIt },
          usage: {
            value: item.cap,
            period: '',
            color: 'success',
          },
          idCimitero: item.idCimitero,
          activity: item.comune,
          istemplatevalid: item.istemplatevalid,
        }),
      )
      try {
        var listfilter = []
        var IdCimiterofilter = localStorage.getItem('IdCimitero')
        if (IdCimiterofilter > 0) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].idCimitero == IdCimiterofilter) {
              listfilter.push(list[i])
            }
          }
          list = listfilter
        }
      } catch (e) {
        console.log('Errorre err: ' + e)
      }

      setUserList(list)
      localStorage.setItem('IdCimitero', 0)
    }
    fetchData()
  }, [])

  const deleteTotemUI = async (item) => {
    await deleteTotem(item.id)
    window.location.reload(false)
  }

  const showHtml = (id, idCimitero) => {
    window.open(url + '/cimitero' + idCimitero + '/' + id, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <p></p>
      <p></p>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center"></CTableHeaderCell>
            <CTableHeaderCell className="text-center">Id Urna</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Nome Urna</CTableHeaderCell>
            <CTableHeaderCell className="text-center">IdCimitero</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Elimina Urna</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <img src={item.avatar.src} width={80} height={80} style={{ border: '1px solid' }} />
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.id}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.nome}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">{item.idCimitero}</CTableDataCell>
              <CTableDataCell className="text-center">
                <CButton color="danger" variant="outline" onClick={() => deleteTotemUI(item)}>
                  Elimina Urna
                </CButton>
              </CTableDataCell>
              {item.istemplatevalid == true ? (
                <>
                  <CTableDataCell className="text-center" key={Math.random()}>
                    <CButton
                      key={Math.random()}
                      color="success"
                      variant="outline"
                      onClick={() => showHtml(item.id, item.idCimitero)}
                    >
                      Visualizza Template
                    </CButton>
                  </CTableDataCell>
                </>
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

export default TablesTotem
