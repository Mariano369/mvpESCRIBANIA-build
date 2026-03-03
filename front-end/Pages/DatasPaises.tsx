import baseClasses from '@components/Themes/layout.module.scss'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import {
  addDataspaises,
  editDataspaises,
  loadDataspaises,
  removeDatapaises,
  searchDataspaises,
  softRemoveDataspaises,
} from '@store/actions/dataspaisesActions'
import { IDataspaisesItem } from '@store/models'
import { IState } from '@store/reducers/index'
import stylesmodulescss from 'dist/css/styles.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../components/DataTable/dataTable'
import AddDialog from '../components/Dialog/Dialog'

const DatasPaises: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const dataspaisesData = useSelector((state: IState) => state.dataspaises)
  const initialDataDatasPaises = {
    DataPais: '',
  }
  const [DatasPaisesdata, setDatasPaisesdata] = React.useState<any>(initialDataDatasPaises)
  const handleDatasPaisesChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== DatasPaisesdata[name]) {
        setDatasPaisesdata((oldValues) => {
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
  const searchForDatasPaises = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [dialogDataspaisesAction, setdialogDataspaisesAction] = React.useState<'add' | 'edit' | 'view' | 'softDelete' | 'delete' | ''>('')
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
    dispatch(options.searchString ? searchDataspaises(options) : loadDataspaises(options))
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
            <Typography variant="h4">DataPaises list</Typography>

            <TextField
              id="searchField-DataPaises-"
              variant="outlined"
              placeholder="Search DataPaises..."
              margin="dense"
              size="small"
              className={theme.extensibleInput}
              type="text"
              onChange={searchForDatasPaises}
            />

            <LocalAddDialog
              isOpen={dialogDataspaisesAction !== ''}
              onOpen={() => setdialogDataspaisesAction('add')}
              onSave={() => setdialogDataspaisesAction('')}
              onClose={() => setdialogDataspaisesAction('')}
              action={dialogDataspaisesAction}
              addOptions={{ title: 'Add DataPaises', text: 'Enter DataPaises data', button: 'Add' }}
              editOptions={{ title: 'Edit DataPaises', text: 'Update DataPaises data', button: 'Edit' }}
              viewOptions={{ title: '', text: '' }}
              removeOptions={{ title: '', text: '', button: '' }}
              saveDataHandler={(data: IDataspaisesItem) => {
                if (dialogDataspaisesAction === 'delete') {
                  dispatch(removeDatapaises(data))
                } else if (dialogDataspaisesAction === 'softDelete') {
                  dispatch(softRemoveDataspaises(data))
                } else {
                  const cleanData: any = Object.fromEntries(
                    Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                  )
                  dialogDataspaisesAction === 'add' ? dispatch(addDataspaises(cleanData)) : dispatch(editDataspaises(cleanData))
                }
              }}
              color="primary"
              data={DatasPaisesdata}
              initialData={initialDataDatasPaises}
              setData={setDatasPaisesdata}
              allowMultipleSubmit={dialogDataspaisesAction === 'add'}
              disabledFields={dialogDataspaisesAction === 'view'}
            >
              <TextField
                margin="dense"
                size="medium"
                label="DataPais"
                type="text"
                fullWidth
                className={'field_DataPais'}
                variant="standard"
                value={DatasPaisesdata.DataPais || ''}
                onChange={handleDatasPaisesChange('DataPais')}
                error={DatasPaisesdata?.errField === 'DataPais'}
                helperText={DatasPaisesdata?.errField === 'DataPais' && DatasPaisesdata.errMessage}
              />
            </LocalAddDialog>
          </div>

          <Container maxWidth={false}>
            <div data-title="Table Area" className={classes.tableResponsive}>
              <div data-title="Body">
                <DataTable
                  allowSorting
                  tableData={dataspaisesData.founddataspaises.length ? dataspaisesData.founddataspaises : (dataspaisesData.dataspaises as any)}
                  pages={Math.ceil(dataspaisesData.totalDocs / tableloadoptions.limit)}
                  columnInfo={[
                    {
                      id: 'DataPais',
                      header: 'DataPais',
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
                    setDatasPaisesdata(row)
                    setdialogDataspaisesAction('edit')
                  }}
                  onRequestRemove={(row) => {
                    dispatch(removeDatapaises(row))
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

export default DatasPaises
