import baseClasses from '@components/Themes/layout.module.scss'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { addPrefijos, editPrefijos, loadPrefijos, removePrefijo, searchPrefijos, softRemovePrefijos } from '@store/actions/prefijosActions'
import { IPrefijosItem } from '@store/models'
import { IState } from '@store/reducers/index'
import stylesmodulescss from 'dist/css/styles.module.scss'
import React, { FunctionComponent } from 'react'
import { NumericFormat } from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../components/DataTable/dataTable'
import AddDialog from '../components/Dialog/Dialog'

const Prefijos: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const prefijosData = useSelector((state: IState) => state.prefijos)
  const initialDataPrefijos = {
    Prefijo: '',
  }
  const [Prefijosdata, setPrefijosdata] = React.useState<any>(initialDataPrefijos)
  const handlePrefijosChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== Prefijosdata[name]) {
        setPrefijosdata((oldValues) => {
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
  const searchForPrefijos = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [dialogPrefijosAction, setdialogPrefijosAction] = React.useState<'add' | 'edit' | 'view' | 'softDelete' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const PrefijoTextFieldProps = {
    id: 'filled-multiline-flexible',
    margin: 'dense',
    size: 'medium',
    type: 'number',
    multiline: true,
    maxRows: 4,
    variant: 'standard',
  }
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
    sortLanguage: 'en',
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchPrefijos(options) : loadPrefijos(options))
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
            <Typography variant="h4">Prefijo list</Typography>

            <TextField
              id="searchField-Prefijo-"
              variant="outlined"
              placeholder="Search Prefijo..."
              margin="dense"
              size="small"
              className={theme.extensibleInput}
              type="text"
              onChange={searchForPrefijos}
            />

            <LocalAddDialog
              isOpen={dialogPrefijosAction !== ''}
              onOpen={() => setdialogPrefijosAction('add')}
              onSave={() => setdialogPrefijosAction('')}
              onClose={() => setdialogPrefijosAction('')}
              action={dialogPrefijosAction}
              addOptions={{ title: 'Add Prefijo', text: 'Enter Prefijo data', button: 'Add' }}
              editOptions={{ title: 'Edit Prefijo', text: 'Update Prefijo data', button: 'Edit' }}
              viewOptions={{ title: '', text: '' }}
              removeOptions={{ title: '', text: '', button: '' }}
              saveDataHandler={(data: IPrefijosItem) => {
                if (dialogPrefijosAction === 'delete') {
                  dispatch(removePrefijo(data))
                } else if (dialogPrefijosAction === 'softDelete') {
                  dispatch(softRemovePrefijos(data))
                } else {
                  const cleanData: any = Object.fromEntries(
                    Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                  )
                  dialogPrefijosAction === 'add' ? dispatch(addPrefijos(cleanData)) : dispatch(editPrefijos(cleanData))
                }
              }}
              color="primary"
              data={Prefijosdata}
              initialData={initialDataPrefijos}
              setData={setPrefijosdata}
              allowMultipleSubmit={dialogPrefijosAction === 'add'}
              disabledFields={dialogPrefijosAction === 'view'}
            >
              <NumericFormat
                value={Prefijosdata.Prefijo || 0}
                label="Prefijo"
                fullWidth
                className={'field_Prefijo'}
                decimalSeparator=","
                customInput={TextField}
                onValueChange={(values, sourceInfo) => {
                  handlePrefijosChange('Prefijo')(values.floatValue || 0)
                }}
                {...PrefijoTextFieldProps}
              />
            </LocalAddDialog>
          </div>

          <Container maxWidth={false}>
            <div data-title="Table Area" className={classes.tableResponsive}>
              <div data-title="Body">
                <DataTable
                  allowSorting
                  tableData={prefijosData.foundprefijos.length ? prefijosData.foundprefijos : (prefijosData.prefijos as any)}
                  pages={Math.ceil(prefijosData.totalDocs / tableloadoptions.limit)}
                  columnInfo={[
                    {
                      id: 'Prefijo',
                      header: 'Prefijo',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        return cell.getValue() ? <NumericFormat value={cell.getValue()} displayType="text" decimalSeparator="," /> : '---'
                      },
                    },
                  ]}
                  onRequestPaginate={(options) => {
                    settableloadoptions({ ...tableloadoptions, ...options })
                  }}
                  onRequestEdit={(row) => {
                    setPrefijosdata(row)
                    setdialogPrefijosAction('edit')
                  }}
                  onRequestRemove={(row) => {
                    dispatch(removePrefijo(row))
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

export default Prefijos
