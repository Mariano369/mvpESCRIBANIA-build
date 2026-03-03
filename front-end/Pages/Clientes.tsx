import baseClasses from '@components/Themes/layout.module.scss'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { addClientes, editClientes, loadClientes, removeCliente, searchClientes, softRemoveClientes } from '@store/actions/clientesActions'
import { IClientesItem } from '@store/models'
import { IState } from '@store/reducers/index'
import stylesmodulescss from 'dist/css/styles.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../components/DataTable/dataTable'
import AddDialog from '../components/Dialog/Dialog'

const Clientes: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const clientesData = useSelector((state: IState) => state.clientes)
  const initialDataClientes = {
    Nombre: '',
    Dni: '',
    info: '',
  }
  const [Clientesdata, setClientesdata] = React.useState<any>(initialDataClientes)
  const handleClientesChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== Clientesdata[name]) {
        setClientesdata((oldValues) => {
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
  const searchForClientes = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [dialogClientesAction, setdialogClientesAction] = React.useState<'add' | 'edit' | 'view' | 'softDelete' | 'delete' | ''>('')
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
    dispatch(options.searchString ? searchClientes(options) : loadClientes(options))
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
            <Typography variant="h4">Cliente list</Typography>

            <TextField
              id="searchField-Cliente-"
              variant="outlined"
              placeholder="Search Cliente..."
              margin="dense"
              size="small"
              className={theme.extensibleInput}
              type="text"
              onChange={searchForClientes}
            />

            <LocalAddDialog
              isOpen={dialogClientesAction !== ''}
              onOpen={() => setdialogClientesAction('add')}
              onSave={() => setdialogClientesAction('')}
              onClose={() => setdialogClientesAction('')}
              action={dialogClientesAction}
              addOptions={{ title: 'Add Cliente', text: 'Enter Cliente data', button: 'Add' }}
              editOptions={{ title: 'Edit Cliente', text: 'Update Cliente data', button: 'Edit' }}
              viewOptions={{ title: '', text: '' }}
              removeOptions={{ title: '', text: '', button: '' }}
              saveDataHandler={(data: IClientesItem) => {
                if (dialogClientesAction === 'delete') {
                  dispatch(removeCliente(data))
                } else if (dialogClientesAction === 'softDelete') {
                  dispatch(softRemoveClientes(data))
                } else {
                  const cleanData: any = Object.fromEntries(
                    Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                  )
                  dialogClientesAction === 'add' ? dispatch(addClientes(cleanData)) : dispatch(editClientes(cleanData))
                }
              }}
              color="primary"
              data={Clientesdata}
              initialData={initialDataClientes}
              setData={setClientesdata}
              allowMultipleSubmit={dialogClientesAction === 'add'}
              disabledFields={dialogClientesAction === 'view'}
            >
              <TextField
                margin="dense"
                size="medium"
                label="Nombre"
                type="text"
                fullWidth
                className={'field_Nombre'}
                variant="standard"
                value={Clientesdata.Nombre || ''}
                onChange={handleClientesChange('Nombre')}
                error={Clientesdata?.errField === 'Nombre'}
                helperText={Clientesdata?.errField === 'Nombre' && Clientesdata.errMessage}
              />

              <TextField
                margin="dense"
                size="medium"
                label="Dni"
                type="text"
                fullWidth
                className={'field_Dni'}
                variant="standard"
                value={Clientesdata.Dni || ''}
                onChange={handleClientesChange('Dni')}
                error={Clientesdata?.errField === 'Dni'}
                helperText={Clientesdata?.errField === 'Dni' && Clientesdata.errMessage}
              />

              <TextField
                margin="dense"
                size="medium"
                label="info"
                type="text"
                fullWidth
                className={'field_info'}
                variant="standard"
                value={Clientesdata.info || ''}
                onChange={handleClientesChange('info')}
                error={Clientesdata?.errField === 'info'}
                helperText={Clientesdata?.errField === 'info' && Clientesdata.errMessage}
              />
            </LocalAddDialog>
          </div>

          <Container maxWidth={false}>
            <div data-title="Table Area" className={classes.tableResponsive}>
              <div data-title="Body">
                <DataTable
                  allowSorting
                  tableData={clientesData.foundclientes.length ? clientesData.foundclientes : (clientesData.clientes as any)}
                  pages={Math.ceil(clientesData.totalDocs / tableloadoptions.limit)}
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
                      id: 'Dni',
                      header: 'Dni',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() || '---'
                      },
                    },

                    {
                      id: 'info',
                      header: 'info',
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
                    setClientesdata(row)
                    setdialogClientesAction('edit')
                  }}
                  onRequestRemove={(row) => {
                    dispatch(removeCliente(row))
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

export default Clientes
