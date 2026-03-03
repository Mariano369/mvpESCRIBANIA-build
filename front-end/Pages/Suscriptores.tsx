import baseClasses from '@components/Themes/layout.module.scss'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  addSuscriptores,
  editSuscriptores,
  loadSuscriptores,
  removeSuscriptor,
  searchSuscriptores,
  softRemoveSuscriptores,
} from '@store/actions/suscriptoresActions'
import { ISuscriptoresItem } from '@store/models'
import { IState } from '@store/reducers/index'
import stylesmodulescss from 'dist/css/styles.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../components/DataTable/dataTable'
import AddDialog from '../components/Dialog/Dialog'

const Suscriptores: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const suscriptoresData = useSelector((state: IState) => state.suscriptores)
  const initialDataSuscriptores = {
    Nombre: '',
    Apellido: '',
    Correoelectronico: '',
    Telfono: '',
    Mensaje: '',
  }
  const [Suscriptoresdata, setSuscriptoresdata] = React.useState<any>(initialDataSuscriptores)
  const handleSuscriptoresChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== Suscriptoresdata[name]) {
        setSuscriptoresdata((oldValues) => {
          return {
            ...oldValues,
            [name]: value,
          }
        })
      }
      resolve(value)
    })
  }
  const theme = { ...baseClasses, ...stylesmodulescss }
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForSuscriptores = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [dialogSuscriptoresAction, setdialogSuscriptoresAction] = React.useState<'add' | 'edit' | 'view' | 'softDelete' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
    sortLanguage: 'en',
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchSuscriptores(options) : loadSuscriptores(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.pages}>
        <div data-title="div" className={theme.mainarea}>
          <div data-title="Head" className={theme.tableHeading}>
            <Typography variant="h4">Suscriptor list</Typography>

            <TextField
              id="searchField-Suscriptor-"
              variant="outlined"
              placeholder="Search Suscriptor..."
              margin="dense"
              size="small"
              className={theme.extensibleInput}
              type="text"
              onChange={searchForSuscriptores}
            />

            <LocalAddDialog
              isOpen={dialogSuscriptoresAction !== ''}
              onOpen={() => setdialogSuscriptoresAction('add')}
              onSave={() => setdialogSuscriptoresAction('')}
              onClose={() => setdialogSuscriptoresAction('')}
              action={dialogSuscriptoresAction}
              addOptions={{ title: 'Add Suscriptor', text: 'Enter Suscriptor data', button: 'Add' }}
              editOptions={{ title: 'Edit Suscriptor', text: 'Update Suscriptor data', button: 'Edit' }}
              viewOptions={{ title: '', text: '' }}
              removeOptions={{ title: '', text: '', button: '' }}
              saveDataHandler={(data: ISuscriptoresItem) => {
                if (dialogSuscriptoresAction === 'delete') {
                  dispatch(removeSuscriptor(data))
                } else if (dialogSuscriptoresAction === 'softDelete') {
                  dispatch(softRemoveSuscriptores(data))
                } else {
                  const cleanData: any = Object.fromEntries(
                    Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                  )
                  dialogSuscriptoresAction === 'add' ? dispatch(addSuscriptores(cleanData)) : dispatch(editSuscriptores(cleanData))
                }
              }}
              color="primary"
              data={Suscriptoresdata}
              initialData={initialDataSuscriptores}
              setData={setSuscriptoresdata}
              allowMultipleSubmit={dialogSuscriptoresAction === 'add'}
              disabledFields={dialogSuscriptoresAction === 'view'}
            >
              <TextField
                placeholder="
"
                margin="dense"
                size="medium"
                label="Nombre"
                type="text"
                fullWidth
                className={'field_Nombre'}
                variant="standard"
                value={Suscriptoresdata.Nombre || ''}
                onChange={handleSuscriptoresChange('Nombre')}
                error={Suscriptoresdata?.errField === 'Nombre'}
                helperText={Suscriptoresdata?.errField === 'Nombre' && Suscriptoresdata.errMessage}
              />

              <TextField
                placeholder="
"
                margin="dense"
                size="medium"
                label="Apellido"
                type="text"
                fullWidth
                className={'field_Apellido'}
                variant="standard"
                value={Suscriptoresdata.Apellido || ''}
                onChange={handleSuscriptoresChange('Apellido')}
                error={Suscriptoresdata?.errField === 'Apellido'}
                helperText={Suscriptoresdata?.errField === 'Apellido' && Suscriptoresdata.errMessage}
              />

              <TextField
                margin="dense"
                size="medium"
                label="Correoelectronico"
                type="text"
                fullWidth
                className={'field_Correoelectronico'}
                variant="standard"
                value={Suscriptoresdata.Correoelectronico || ''}
                onChange={handleSuscriptoresChange('Correoelectronico')}
                error={Suscriptoresdata?.errField === 'Correoelectronico'}
                helperText={Suscriptoresdata?.errField === 'Correoelectronico' && Suscriptoresdata.errMessage}
              />

              <TextField
                margin="dense"
                size="medium"
                label="Teléfono"
                type="text"
                fullWidth
                className={'field_Telfono'}
                variant="standard"
                value={Suscriptoresdata.Telfono || ''}
                onChange={handleSuscriptoresChange('Telfono')}
                error={Suscriptoresdata?.errField === 'Telfono'}
                helperText={Suscriptoresdata?.errField === 'Telfono' && Suscriptoresdata.errMessage}
              />

              <TextField
                margin="dense"
                size="medium"
                label="Déjanos tu mensaje"
                type="text"
                fullWidth
                multiline
                className={'field_Mensaje'}
                variant="standard"
                value={Suscriptoresdata.Mensaje || ''}
                onChange={handleSuscriptoresChange('Mensaje')}
              />
            </LocalAddDialog>
          </div>

          <Container maxWidth={false}>
            <div data-title="Table Area" className={classes.tableResponsive}>
              <div data-title="Body">
                <DataTable
                  allowSorting
                  tableData={suscriptoresData.foundsuscriptores.length ? suscriptoresData.foundsuscriptores : (suscriptoresData.suscriptores as any)}
                  pages={Math.ceil(suscriptoresData.totalDocs / tableloadoptions.limit)}
                  columnInfo={[
                    {
                      id: 'Nombre',
                      header: 'Nombre',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() || '---'
                      },
                    },

                    {
                      id: 'Apellido',
                      header: 'Apellido',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() || '---'
                      },
                    },

                    {
                      id: 'Correoelectronico',
                      header: 'Correoelectronico',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() || '---'
                      },
                    },

                    {
                      id: 'Telfono',
                      header: 'Teléfono',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() || '---'
                      },
                    },

                    {
                      id: 'Mensaje',
                      header: 'Mensaje',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() || '---'
                      },
                    },
                  ]}
                  onRequestPaginate={(options) => {
                    settableloadoptions({ ...tableloadoptions, ...options })
                  }}
                  onRequestEdit={(row) => {
                    setSuscriptoresdata(row)
                    setdialogSuscriptoresAction('edit')
                  }}
                  onRequestRemove={(row) => {
                    dispatch(removeSuscriptor(row))
                  }}
                  onRequestSort={(property) => {
                    settableloadoptions({
                      ...tableloadoptions,
                      sort: {
                        field: property,
                        method: tableloadoptions.sort.field === property ? (tableloadoptions.sort.method === 'asc' ? 'desc' : 'asc') : 'asc',
                      },
                    })
                  }}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Suscriptores
