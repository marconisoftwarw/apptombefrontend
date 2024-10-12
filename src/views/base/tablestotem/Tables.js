/* eslint-disable react/prop-types */

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
import urnaAvatar from 'src/assets/urna.png'
import avatarvisualizza from 'src/assets/visualizza.png'
import { getCimiteroNomeById } from '../../../services/cimitero'

import avatardelete from 'src/assets/delete.png'
const TablesTotem = (props) => {
  const [users, setUserList] = useState([])

  useEffect(() => {
    var list = []

    async function fetchData() {
      var cimiteri = await getList()

      // Iterate over cimiteri and ensure data is set properly
      for (const item of cimiteri) {
        var nomeCitta = await getCimiteroNomeById(item.idCimitero)
        item.citta = nomeCitta
        console.log('Citta: ', item.citta)

        list.push({
          id: item.id,
          nome: item.nome,
          avatar: { src: avatar1, status: 'success' },
          type: item.type,
          provincia: item.regione,
          cap: item.cap,
          user: {
            name: nomeCitta || 'Città non disponibile', // Ensure citta exists
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
        })
      }

      // Filtering list by IdCimitero if needed
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
        console.error('Error filtering by IdCimitero: ', e)
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
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            ></CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              Id Urna
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              Nome Urna
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              Nome Cimitero
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              IdCimitero
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              style={{ backgroundColor: 'rgb(176, 219, 240)' }}
            >
              Elimina Urna
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <img
                  src={urnaAvatar}
                  width={50}
                  height={50}
                  style={{ backgroundColor: 'white', borderRadius: '5px' }}
                />
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.id}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.nome}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.user.name}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">{item.idCimitero}</CTableDataCell>
              <CTableDataCell className="text-center">
                <img src={avatardelete} width={40} onClick={() => deleteTotemUI(item)} />
              </CTableDataCell>
              {item.istemplatevalid == true ? (
                <>
                  <CTableDataCell className="text-center" key={Math.random()}>
                    <img
                      src={avatarvisualizza}
                      width={140}
                      onClick={() => showHtml(item.id, item.idCimitero)}
                    />
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
