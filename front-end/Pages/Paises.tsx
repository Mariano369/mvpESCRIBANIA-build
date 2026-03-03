import Autocomplete from '@components/Autocomplete'
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
import { addPaises, editPaises, loadPaises, removePais, searchPaises, softRemovePaises } from '@store/actions/paisesActions'
import { IPaisesItem } from '@store/models'
import { IState } from '@store/reducers/index'
import axios from 'axios'
import stylesmodulescss from 'dist/css/styles.module.scss'
import React, { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '../components/DataTable/dataTable'
import AddDialog from '../components/Dialog/Dialog'

const Paises: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const paisesData = useSelector((state: IState) => state.paises)
  const initialDataPaises = {
    Pais: [],
  }
  const [Paisesdata, setPaisesdata] = React.useState<any>(initialDataPaises)
  const handlePaisesChange = (name: string) => (event: any) => {
    return new Promise((resolve, reject) => {
      const value = event?.target ? (event.target.files ? event.target.files[0] : event.currentTarget?.value || event.target.value) : event
      if (value !== Paisesdata[name]) {
        setPaisesdata((oldValues) => {
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
  const searchForPaises = (event, field = null) => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      settableloadoptions({
        ...tableloadoptions,
        searchString: event.target.value,
        searchField: field,
      })
    }, 500)
  }
  const [dialogPaisesAction, setdialogPaisesAction] = React.useState<'add' | 'edit' | 'view' | 'softDelete' | 'delete' | ''>('')
  const LocalAddDialog = AddDialog

  const datospaisesAutocompleteData = useSelector((state: IState) => state.datospaises)
  const [PaisOptions, setPaisOptions] = React.useState<{ label: String; value: String }[]>([])
  const typeInSearchPaisDatospaises = (typedIn) => {
    const searchOptions = {
      searchString: typedIn,
      searchField: 'DataPais',
      page: 1,
      limit: 25,
      sortLanguage: 'en',
    }
    axios.get('http://127.0.0.1:4567/api/datospaises/search/', { params: searchOptions }).then((result) => {
      setPaisOptions(
        result.data.docs.map((datopais) => {
          return {
            label: datopais.DataPais,
            value: datopais._id,
          }
        })
      )
    })
  }
  const [PaisValue, setPaisValue] = React.useState(null)
  React.useEffect(() => {
    if (!Paisesdata.Pais) return undefined
    const asArray = Array.isArray(Paisesdata.Pais) ? Paisesdata.Pais : [Paisesdata.Pais]
    setPaisValue(asArray.map((item) => ({ label: item.DataPais, value: item._id })))
  }, [Paisesdata.Pais])
  const [tableloadoptions, settableloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
    sortLanguage: 'en',
  })
  const performtableload = (options) => {
    dispatch(options.searchString ? searchPaises(options) : loadPaises(options))
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
            <Typography variant="h4">Pais list</Typography>

            <TextField
              id="searchField-Pais-"
              variant="outlined"
              placeholder="Search Pais..."
              margin="dense"
              size="small"
              className={theme.extensibleInput}
              type="text"
              onChange={searchForPaises}
            />

            <LocalAddDialog
              isOpen={dialogPaisesAction !== ''}
              onOpen={() => setdialogPaisesAction('add')}
              onSave={() => setdialogPaisesAction('')}
              onClose={() => setdialogPaisesAction('')}
              action={dialogPaisesAction}
              addOptions={{ title: 'Add Pais', text: 'Enter Pais data', button: 'Add' }}
              editOptions={{ title: 'Edit Pais', text: 'Update Pais data', button: 'Edit' }}
              viewOptions={{ title: '', text: '' }}
              removeOptions={{ title: '', text: '', button: '' }}
              saveDataHandler={(data: IPaisesItem) => {
                if (dialogPaisesAction === 'delete') {
                  dispatch(removePais(data))
                } else if (dialogPaisesAction === 'softDelete') {
                  dispatch(softRemovePaises(data))
                } else {
                  const cleanData: any = Object.fromEntries(
                    Object.entries(data).filter(([_, v]) => v !== null && v !== '' && (v.length !== 0 || v.length === undefined))
                  )
                  dialogPaisesAction === 'add' ? dispatch(addPaises(cleanData)) : dispatch(editPaises(cleanData))
                }
              }}
              color="primary"
              data={Paisesdata}
              initialData={initialDataPaises}
              setData={setPaisesdata}
              allowMultipleSubmit={dialogPaisesAction === 'add'}
              disabledFields={dialogPaisesAction === 'view'}
            >
              <Autocomplete
                chips
                value={PaisValue}
                onType={typeInSearchPaisDatospaises}
                onChange={(newValue) => {
                  // handlePaisesChange('Pais')(newValue?.length ? newValue.map((item) => ({ id: item.value !== 'new' ? item.value : null, name: item.label }))[0].id : [])
                  handlePaisesChange('Pais')(
                    newValue?.length ? newValue.map((item) => ({ _id: item.value !== 'new' ? item.value : null, DataPais: item.label })) : []
                  )
                }}
                loading={datospaisesAutocompleteData.loadingStatus === 'loading'}
                placeholder="Seleccione un país"
                options={PaisOptions}
                label="Pais"
                fullWidth
                variant="standard"
                margin="dense"
                size="medium"
                add={true}
              />
            </LocalAddDialog>
          </div>

          <Container maxWidth={false}>
            <div data-title="Table Area" className={classes.tableResponsive}>
              <div data-title="Body">
                <DataTable
                  allowSorting
                  tableData={paisesData.foundpaises.length ? paisesData.foundpaises : (paisesData.paises as any)}
                  pages={Math.ceil(paisesData.totalDocs / tableloadoptions.limit)}
                  columnInfo={[
                    {
                      id: 'Pais',
                      header: 'Pais',
                      type: 'string',
                      size: 300,
                      renderValue: (cell) => {
                        let value = cell.getValue()
                        value = value?.map((x) => x.DataPais).join(', ')
                        return value || '---'
                      },
                    },
                  ]}
                  onRequestPaginate={(options) => {
                    settableloadoptions({ ...tableloadoptions, ...options })
                  }}
                  onRequestEdit={(row) => {
                    setPaisesdata(row)
                    setdialogPaisesAction('edit')
                  }}
                  onRequestRemove={(row) => {
                    dispatch(removePais(row))
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

export default Paises
