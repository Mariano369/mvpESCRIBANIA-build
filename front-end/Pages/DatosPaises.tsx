import baseClasses from '@components/Themes/layout.module.scss'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import authHeaders from '@services/auth-header'
import AuthService from '@services/auth.service'
import {
  addDatospaises,
  editDatospaises,
  loadDatospaises,
  removeDatopais,
  searchDatospaises,
  softRemoveDatospaises,
} from '@store/actions/datospaisesActions'
import { IDatospaisesItem } from '@store/models'
import { IState } from '@store/reducers/index'
import stylesmodulescss from 'dist/css/styles.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../components/DataTable/dataTable'
import AddDialog from '../components/Dialog/Dialog'

const DatosPaises: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const datospaisesData = useSelector((state: IState) => state.datospaises)
  const initialDataDatosPaises = {
    DataPais: '',
  }
  const [DatosPaisesdata, setDatosPaisesdata] = React.useState<any>(initialDataDatosPaises)
  const handleDatosPaisesChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== DatosPaisesdata[name]) {
        setDatosPaisesdata((oldValues) => {
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
  const [currentUser, setcurrentUser] = React.useState<any>({})
  const [profileMenuAnchor, setprofileMenuAnchor] = React.useState<any>(null)
  const dispatch = useDispatch()
  let searchTimeout = null
  const searchForDatosPaises = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [dialogDatospaisesAction, setdialogDatospaisesAction] = React.useState<'add' | 'edit' | 'view' | 'softDelete' | 'delete' | ''>('')
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
    dispatch(options.searchString ? searchDatospaises(options) : loadDatospaises(options))
  }
  React.useEffect(() => {
    performtableload({
      ...tableloadoptions,
    })
  }, [tableloadoptions])

  React.useEffect(() => {
    AuthService.getCurrentUser().then((currentUser) => {
      setcurrentUser(currentUser)
    })
  }, [])

  authHeaders().then((result) => {
    if (!result) {
      navigation.push('/')
    }
  })

  // Theme selection

  return (
    <React.Fragment>
      <div className={theme.pages}>
        {currentUser && (
          <React.Fragment>
            <AppBar elevation={3} color="transparent" position="absolute" title="">
              <Toolbar>
                <IconButton
                  onClick={(event) => {
                    setprofileMenuAnchor(event.currentTarget)
                  }}
                  className={theme.profilePicture}
                >
                  <picture>
                    <img src={`/img/${currentUser.ProfilePic}`} alt={`/img/${currentUser.ProfilePic}`} />
                  </picture>
                </IconButton>

                <Menu
                  anchorEl={profileMenuAnchor}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={Boolean(profileMenuAnchor)}
                  onClose={(params) => {
                    setprofileMenuAnchor(null)
                  }}
                >
                  <div data-title="div" className={theme.menuProfileDetails}>
                    {currentUser.FirstName} {currentUser.LastName}
                  </div>

                  <MenuItem>Profile</MenuItem>
                  <MenuItem
                    onClick={(params) => {
                      AuthService.logout()
                      props.history.push('/')
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
          </React.Fragment>
        )}

        <div data-title="div" className={theme.mainarea}>
          <div data-title="Head" className={theme.tableHeading}>
            <Typography variant="h4">DatoPais list</Typography>

            <TextField
              id="searchField-DatoPais-"
              variant="outlined"
              placeholder="Search DatoPais..."
              margin="dense"
              size="small"
              className={theme.extensibleInput}
              type="text"
              onChange={searchForDatosPaises}
            />

            <LocalAddDialog
              isOpen={dialogDatospaisesAction !== ''}
              onOpen={() => setdialogDatospaisesAction('add')}
              onSave={() => setdialogDatospaisesAction('')}
              onClose={() => setdialogDatospaisesAction('')}
              action={dialogDatospaisesAction}
              addOptions={{ title: 'Add DatoPais', text: 'Enter DatoPais data', button: 'Add' }}
              editOptions={{ title: 'Edit DatoPais', text: 'Update DatoPais data', button: 'Edit' }}
              viewOptions={{ title: '', text: '' }}
              removeOptions={{ title: '', text: '', button: '' }}
              saveDataHandler={(data: IDatospaisesItem) => {
                if (dialogDatospaisesAction === 'delete') {
                  dispatch(removeDatopais(data))
                } else if (dialogDatospaisesAction === 'softDelete') {
                  dispatch(softRemoveDatospaises(data))
                } else {
                  const cleanData: any = Object.fromEntries(
                    Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                  )
                  dialogDatospaisesAction === 'add' ? dispatch(addDatospaises(cleanData)) : dispatch(editDatospaises(cleanData))
                }
              }}
              color="primary"
              data={DatosPaisesdata}
              initialData={initialDataDatosPaises}
              setData={setDatosPaisesdata}
              allowMultipleSubmit={dialogDatospaisesAction === 'add'}
              disabledFields={dialogDatospaisesAction === 'view'}
            >
              <TextField
                margin="dense"
                size="medium"
                label="DataPais"
                type="text"
                fullWidth
                className={'field_DataPais'}
                variant="standard"
                value={DatosPaisesdata.DataPais || ''}
                onChange={handleDatosPaisesChange('DataPais')}
                error={DatosPaisesdata?.errField === 'DataPais'}
                helperText={DatosPaisesdata?.errField === 'DataPais' && DatosPaisesdata.errMessage}
              />
            </LocalAddDialog>
          </div>

          <Container maxWidth={false}>
            <div data-title="Table Area" className={classes.tableResponsive}>
              <div data-title="Body">
                <DataTable
                  pagination={false}
                  tableData={datospaisesData.founddatospaises.length ? datospaisesData.founddatospaises : (datospaisesData.datospaises as any)}
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
                  onRequestEdit={(row) => {
                    setDatosPaisesdata(row)
                    setdialogDatospaisesAction('edit')
                  }}
                  onRequestRemove={(row) => {
                    dispatch(removeDatopais(row))
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

export default DatosPaises
