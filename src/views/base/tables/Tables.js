import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { cifIt, cilPeople } from '@coreui/icons'
import avatar1 from 'src/assets/images/cimitero.png'
import { deleteCimitero, getList } from '../../../services/cimitero'
import { getList as gethardwaretotem } from '../../../services/hardwaretotem'
import { getList as getListaTotem } from '../../../services/totem'

const Tables = () => {
  const navigate = useNavigate()
  const [users, setUserList] = useState([])
  const [listaTotemHardware, setlistaTotemHardware] = useState([])
  const [printvalue, setprintvalue] = useState([])

  useEffect(() => {
    var userObjectList = []
    async function fetchData() {
      var cimiteri = await getList()
      var hardware = await gethardwaretotem()
      setlistaTotemHardware(hardware)
      cimiteri.map((item) =>
        userObjectList.push({
          id: item.id,
          enable: item.enable,
          avatar: { src: avatar1, status: 'success' },
          type: item.type,
          provincia: item.regione,
          cap: item.nazione,
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
          activity: item.comune,
        }),
      )
      setUserList(userObjectList)
    }
    fetchData()
  }, [])

  const gotoadd = async () => {
    navigate('/cimitero')
  }
  const addtotem = async (item) => {
    localStorage.setItem('IdCimitero', item.id)
    localStorage.setItem('Comune', item.user.name)
    navigate('/totem', { state: { list: listaTotemHardware } })
  }

  const openlistaurne = (item) => {
    localStorage.setItem('IdCimitero', item.id)
    navigate('/base/tables/totem')
  }

  const deleteCimiteroTable = async (item) => {
    if ((await deleteCimitero(item.id)) == true) {
      window.location.reload(false)
    } else {
      console.log('Errore eliminazione utente')
    }
  }

  const exportPDF = async (item) => {
    var listaTotem = await getListaTotem()
    const unit = 'pt'
    const size = 'A4'
    const orientation = 'portrait'
    const marginLeft = 40
    const doc = new jsPDF(orientation, unit, size)
    doc.setFontSize(15)
    const title = 'Stampa lista urne'
    const headers = [['IDCIMITERO', 'IDTOTEM', 'IDURNA']]
    var data = []
    for (var i = 0; i < listaTotem.length; i++) {
      if (item.id == listaTotem[i].idCimitero) {
        const tempData = [listaTotem[i].idCimitero, listaTotem[i].idTotemHardware, listaTotem[i].id]
        data.push(tempData)
      }
    }
    let content = {
      startY: 50,
      head: headers,
      body: data,
    }

    doc.text(title, marginLeft, 40)
    doc.autoTable(content)
    doc.save('report.pdf')
  }

  return (
    <>
      <CButton onClick={() => gotoadd()}>Inserisci nuovo cimitero</CButton>
      <p></p>
      <p></p>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>Comune</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Regione</CTableHeaderCell>
            <CTableHeaderCell>Nazione</CTableHeaderCell>
            <CTableHeaderCell>Aggiungi Urna</CTableHeaderCell>
            <CTableHeaderCell>Elimina Cimitero</CTableHeaderCell>
            <CTableHeaderCell>Visualizza Urne Cimitero</CTableHeaderCell>
            <CTableHeaderCell>Stampa Lista Urne</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
              </CTableDataCell>
              <CTableDataCell>
                <div>{item.user.name}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">{item.provincia}</CTableDataCell>
              <CTableDataCell>
                <div className="clearfix">
                  <div className="float-start">
                    <strong>{item.cap}</strong>
                  </div>
                </div>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="dark" variant="outline" onClick={() => addtotem(item)}>
                  Aggiungi Urna
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" variant="outline" onClick={() => deleteCimiteroTable(item)}>
                  Delete Cimitero
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="success" variant="outline" onClick={() => openlistaurne(item)}>
                  Visualizza Urne Cimitero
                </CButton>
              </CTableDataCell>
              <CTableDataCell>
                <CButton color="success" variant="outline" onClick={() => exportPDF(item)}>
                  Stampa Lista Urne
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  )
}

export default Tables
