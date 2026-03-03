import baseClasses from '@components/Themes/layout.module.scss'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { addTelefonos, editTelefonos, loadTelefonos, removeTelefono, searchTelefonos, softRemoveTelefonos } from '@store/actions/telefonosActions'
import { ITelefonosItem } from '@store/models'
import { IState } from '@store/reducers/index'
import stylesmodulescss from 'dist/css/styles.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../components/DataTable/dataTable'
import AddDialog from '../components/Dialog/Dialog'

const Telefonos: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const telefonosData = useSelector((state: IState) => state.telefonos)
  const initialDataTelefonos = {
    Telfono: '',
  }
  const [Telefonosdata, setTelefonosdata] = React.useState<any>(initialDataTelefonos)
  const handleTelefonosChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== Telefonosdata[name]) {
        setTelefonosdata((oldValues) => {
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
  const searchForTelefonos = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [dialogTelefonosAction, setdialogTelefonosAction] = React.useState<'add' | 'edit' | 'view' | 'softDelete' | 'delete' | ''>('')
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
    dispatch(options.searchString ? searchTelefonos(options) : loadTelefonos(options))
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
            <Typography variant="h4">Telefono list</Typography>

            <TextField
              id="searchField-Telefono-"
              variant="outlined"
              placeholder="Search Telefono..."
              margin="dense"
              size="small"
              className={theme.extensibleInput}
              type="text"
              onChange={searchForTelefonos}
            />

            <LocalAddDialog
              isOpen={dialogTelefonosAction !== ''}
              onOpen={() => setdialogTelefonosAction('add')}
              onSave={() => setdialogTelefonosAction('')}
              onClose={() => setdialogTelefonosAction('')}
              action={dialogTelefonosAction}
              addOptions={{ title: 'Add Telefono', text: 'Enter Telefono data', button: 'Add' }}
              editOptions={{ title: 'Edit Telefono', text: 'Update Telefono data', button: 'Edit' }}
              viewOptions={{ title: '', text: '' }}
              removeOptions={{ title: '', text: '', button: '' }}
              saveDataHandler={(data: ITelefonosItem) => {
                if (dialogTelefonosAction === 'delete') {
                  dispatch(removeTelefono(data))
                } else if (dialogTelefonosAction === 'softDelete') {
                  dispatch(softRemoveTelefonos(data))
                } else {
                  const cleanData: any = Object.fromEntries(
                    Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                  )
                  dialogTelefonosAction === 'add' ? dispatch(addTelefonos(cleanData)) : dispatch(editTelefonos(cleanData))
                }
              }}
              color="primary"
              data={Telefonosdata}
              initialData={initialDataTelefonos}
              setData={setTelefonosdata}
              allowMultipleSubmit={dialogTelefonosAction === 'add'}
              disabledFields={dialogTelefonosAction === 'view'}
            >
              <TextField
                placeholder="Código Área + Número"
                margin="dense"
                size="medium"
                label="Teléfono"
                type="text"
                fullWidth
                className={'field_Telfono'}
                variant="standard"
                value={Telefonosdata.Telfono || ''}
                onChange={handleTelefonosChange('Telfono')}
                error={Telefonosdata?.errField === 'Telfono'}
                helperText={Telefonosdata?.errField === 'Telfono' && Telefonosdata.errMessage}
              />
            </LocalAddDialog>
          </div>

          <Container maxWidth={false}>
            <div data-title="Table Area" className={classes.tableResponsive}>
              <div data-title="Body">
                <DataTable
                  allowSorting
                  tableData={telefonosData.foundtelefonos.length ? telefonosData.foundtelefonos : (telefonosData.telefonos as any)}
                  pages={Math.ceil(telefonosData.totalDocs / tableloadoptions.limit)}
                  columnInfo={[
                    {
                      id: 'Telfono',
                      header: 'Teléfono',
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
                    setTelefonosdata(row)
                    setdialogTelefonosAction('edit')
                  }}
                  onRequestRemove={(row) => {
                    dispatch(removeTelefono(row))
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

export default Telefonos
