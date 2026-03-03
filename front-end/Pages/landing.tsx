import baseClasses from '@components/Themes/layout.module.scss'
import { loadSuscriptores, searchSuscriptores } from '@store/actions/suscriptoresActions'
import { IState } from '@store/reducers/index'
import axios from 'axios'
import React, { FunctionComponent } from 'react'
import _server from 'react-dom/server'
import { useDispatch, useSelector } from 'react-redux'

import Autocomplete from '@components/Autocomplete'
import { Icon as YesIcon } from '@iconify/react'
import { ArrowRight, Call, Email, LocationOn, Place, Schedule, WhatsApp } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { addSuscriptores, editSuscriptores } from '@store/actions/suscriptoresActions'
import stylesmodulescss from 'dist/css/styles.module.scss'
import { NavLink } from 'react-router-dom'

const Landing: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
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
  const [pepe, setpepe] = React.useState<any>(null)
  const sendEmail = (to, extra: any = {}) => {
    const from = extra.from || 'Mariano  <marianomartingl@gmail.com>'
    const subject = extra.subject || 'hola'
    const messageHtml = InlineLink()
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:4567/api/sendEmail',
      data: {
        name: from,
        email: to,
        messageHtml: messageHtml,
        extra: extra,
        subject: subject,
      },
    })
      .then((response) => {
        if (response.data.msg === 'success') {
          console.log('Email sent, awesome!')
        } else if (response.data.msg === 'fail') {
          console.log('error', response)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const Suscriptores = useSelector((state: IState) => state.suscriptores).suscriptores
  const suscriptoresData = useSelector((state: IState) => state.suscriptores)
  const dispatch = useDispatch()
  const [LoadfromDatabaseloadoptions, setLoadfromDatabaseloadoptions] = React.useState<any>({
    page: 1,
    populate: true,
    limit: 25,
    sort: { field: null, method: 'DESC' },
    totalItems: 0,
    sortLanguage: 'en',
  })
  const performLoadfromDatabaseload = (options) => {
    dispatch(options.searchString ? searchSuscriptores(options) : loadSuscriptores(options))
  }
  React.useEffect(() => {
    performLoadfromDatabaseload({
      ...LoadfromDatabaseloadoptions,
    })
  }, [LoadfromDatabaseloadoptions])
  function InlineLink(emailParameters: any = {}) {
    var _server2 = _interopRequireDefault(_server)
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj }
    }

    function renderEmail(emailComponent) {
      var doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'
      return `${doctype}${_server2.default.renderToStaticMarkup(emailComponent).replaceAll('/img/', 'https://escribanialite.aptugo.com/img/')}`
    }

    return emailParameters.content || renderEmail(<div></div>)
  }
  const [openSnackbar, setopenSnackbar] = React.useState(false)

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

  // Theme selection

  const saveInfo = () => {
    sendEmail('marianomartingl@gmail.com')
    const data = { ...Suscriptoresdata }
    setSuscriptoresdata({ ...initialDataSuscriptores })

    if (data._id) {
      dispatch(editSuscriptores(data as any))
    } else {
      dispatch(addSuscriptores(data as any))
    }
  }

  const Principal = () => {
    const headerElement = document.getElementById('principal')
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const Final = () => {
    const footerElement = document.getElementById('final')
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <React.Fragment>
      <div className={theme.pages}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={(e) => {
            setopenSnackbar(false)
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant="filled" severity="success">
            <AlertTitle>Mensaje enviado!</AlertTitle>
          </Alert>
        </Snackbar>

        <Container className={theme.topBarContainerSuperior} maxWidth="lg">
          <div data-title="Div Top Bar Superior" className={theme.topBarDivSuperior}>
            <div data-title="div" className={theme.divSaltoPagina}>
              <NavLink
                to="#principal"
                onClickCapture={(e) => {
                  Principal()
                }}
              >
                <Typography variant="subtitle2" className={theme.subtitle2}>
                  Saltar al contenido principal
                </Typography>
              </NavLink>

              <Hidden smDown>
                <NavLink
                  to="#final"
                  onClickCapture={(e) => {
                    Final()
                  }}
                >
                  <Typography variant="subtitle2" className={theme.subtitle2}>
                    Saltar al pie de página
                  </Typography>
                </NavLink>
              </Hidden>
            </div>

            <div data-title=" Div Material Ui" className={theme.divIconMaterialUi}>
              <a
                target="_blank"
                href="https://www.google.com.ar/maps/place/Av.+Arturo+Illia+145,+Villa+Dolores,+C%C3%B3rdoba/@-31.932416,-65.1788288,14z/data=!4m6!3m5!1s0x942cd35e540a54cb:0x1b53fe58cc1795cb!8m2!3d-31.9478966!4d-65.1940448!16s%2Fg%2F11lg2nlbbt?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
              >
                <LocationOn color="primary" className={theme.materialIconEncontranos} sx={{}} />
              </a>
            </div>

            <div data-title="div" className={theme.divButtonComoLlegar}>
              <a
                target="_blank"
                href="https://www.google.com.ar/maps/place/Av.+Arturo+Illia+145,+Villa+Dolores,+C%C3%B3rdoba/@-31.932416,-65.1788288,14z/data=!4m6!3m5!1s0x942cd35e540a54cb:0x1b53fe58cc1795cb!8m2!3d-31.9478966!4d-65.1940448!16s%2Fg%2F11lg2nlbbt?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
              >
                <Button variant="text" color="primary" className={theme.buttonEncontranos}>
                  Localizar oficina
                </Button>
              </a>
            </div>
          </div>
        </Container>

        <Grid container alignItems="center" justifyContent="center" direction="row" wrap="wrap" className={theme.topBarContainerInferiorGrid}>
          <div data-title="div" id="principal" className={theme.divFaviconPrincipal}>
            <NavLink to="/">
              <picture className={theme.faviconPrincipalGrid}>
                <img src="/img/logo godoy-02.png" alt="/img/logo godoy-02.png" width="170" height="auto" />
              </picture>
            </NavLink>
          </div>

          <div data-title="div" className={theme.gridItemLinks}>
            <a target="_blank" href="/Nosotros">
              <Typography variant="h5">Nosotros</Typography>
            </a>

            <Accordion
              sx={{
                backgroundColor: ' #242c4f;',
              }}
              className={theme.accordionUno}
            >
              <AccordionSummary sx={{}} expandIcon={<ExpandMoreIcon sx={{}} />}>
                <Typography variant="h5">Servicios</Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: ' #242c4f',
                }}
              >
                <div data-title="div" className={theme.accordionDetails}>
                  <a target="_blank" href="/">
                    <Typography variant="h6">Certificación de firma</Typography>
                  </a>

                  <a target="_blank" href="/">
                    <Typography variant="h6">Actas</Typography>
                  </a>

                  <a target="_blank" href="/">
                    <Typography variant="h6">Poderes</Typography>
                  </a>

                  <a target="_blank" href="/">
                    <Typography variant="h6">Apostillas y Legalizaciones Digitales</Typography>
                  </a>

                  <a target="_blank" href="/">
                    <Typography variant="h6">Autorizaciones para viajes de menores</Typography>
                  </a>

                  <a target="_blank" href="/">
                    <Typography variant="h6">Boletos de Compraventa y Escrituras de Compraventa</Typography>
                  </a>

                  <a target="_blank" href="/">
                    <Typography variant="h6">Formulario 08</Typography>
                  </a>

                  <a target="_blank" href="/">
                    <Typography variant="h6">Cesion de derechos</Typography>
                  </a>

                  <a target="_blank" href="/">
                    <Typography variant="h6">Autorizaciones para conducir</Typography>
                  </a>

                  <div data-title="div" className={theme.buttonContainerAccordion}>
                    <a target="_blank" href="/firmadigital">
                      <Button variant="text" color="primary" className={theme.buttonTarjetasAccordion}>
                        Ver más
                        <ArrowRight
                          color="primary"
                          className={theme.materialIconAccordion}
                          sx={{
                            fontSize: 35,
                          }}
                        />
                      </Button>
                    </a>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <div data-title="div" className={theme.divButtonContacto}>
              <a target="_blank" href="/contacto">
                <Button variant="contained" color="primary" className={theme.buttonContactoDivLinks}>
                  CONTACTO
                </Button>
              </a>
            </div>

            <div data-title="Menu" className={theme.divMenuHamburguesa}>
              <Menu
                className={theme.menuHamburguesa}
                anchorEl={pepe}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={Boolean(pepe)}
                onClose={() => {
                  setpepe(null)
                }}
              >
                <MenuItem className={theme.itemHamburguesaUno}>
                  <a target="_blank" href="/Nosotros">
                    <Typography variant="h6">Nosotros</Typography>
                  </a>
                </MenuItem>
                <MenuItem className={theme.itemHamburguesaDos}>
                  <Accordion
                    sx={{
                      backgroundColor: ' #242c4f;',
                    }}
                    className={theme.accordionUno}
                  >
                    <AccordionSummary sx={{}} expandIcon={<ExpandMoreIcon sx={{}} />}>
                      <Typography variant="h5">Servicios</Typography>
                    </AccordionSummary>
                  </Accordion>

                  <Accordion
                    sx={{
                      padding: '0rem;',

                      margin: '0rem;',

                      color: '#ffffff',
                    }}
                    className={theme.accordionHamburguesaUno}
                  >
                    <AccordionSummary
                      sx={{
                        color: '#333',
                      }}
                      expandIcon={
                        <ExpandMoreIcon
                          sx={{
                            color: '#333',
                          }}
                        />
                      }
                    >
                      <Typography variant="h6">Servicios</Typography>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        backgroundColor: ' #242c4f',
                      }}
                    >
                      <div data-title="div" className={theme.containerAccordionHamburguesa}>
                        <div data-title="div" className={theme.accordionDetailsHamburguesa}>
                          <a target="_blank" href="/">
                            <Typography variant="h6">Autorizaciones para conducir</Typography>
                          </a>

                          <a target="_blank" href="/">
                            <Typography variant="h6">Cesion de derechos</Typography>
                          </a>

                          <a target="_blank" href="/">
                            <Typography variant="h6">Formulario 08</Typography>
                          </a>

                          <a target="_blank" href="/">
                            <Typography variant="h6">Boletos de Compraventa y Escrituras de Compraventa</Typography>
                          </a>

                          <a target="_blank" href="/">
                            <Typography variant="h6">Autorizaciones para viajes de menores</Typography>
                          </a>

                          <a target="_blank" href="/">
                            <Typography variant="h6">Apostillas y Legalizaciones Digitales</Typography>
                          </a>

                          <a target="_blank" href="/">
                            <Typography variant="h6">Poderes</Typography>
                          </a>

                          <a target="_blank" href="/">
                            <Typography variant="h6">Actas</Typography>
                          </a>

                          <a target="_blank" href="/">
                            <Typography variant="h6">Certifiación de firma</Typography>
                          </a>
                        </div>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </MenuItem>
                <MenuItem className={theme.itemHamburguesaTres}>
                  <Accordion
                    sx={{
                      backgroundColor: 'rgb(10, 47, 136)',
                    }}
                    className={theme.accordionHamburguesaDos}
                  >
                    <AccordionSummary sx={{}} expandIcon={<ExpandMoreIcon sx={{}} />}>
                      <Typography variant="h6">Certificaciones</Typography>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        backgroundColor: 'rgb(10, 47, 136);',
                      }}
                    >
                      <div data-title="div" className={theme.containerDetailsHamburguesa}>
                        <a target="_blank" href="/firmadigital">
                          <Typography variant="h6">Certificaciones</Typography>
                        </a>

                        <a target="_blank" href="/firmasolografas">
                          <Typography variant="h6">Certificaciones</Typography>
                        </a>

                        <a target="_blank" href="/documentosdigitales">
                          <Typography variant="h6">Certificaciones</Typography>
                        </a>

                        <a target="_blank" href="/certificacionesremotas">
                          <Typography variant="h6">Certificaciones</Typography>
                        </a>

                        <a target="_blank" href="/testimoniosdigitales">
                          <Typography variant="h6">Certificaciones</Typography>
                        </a>

                        <a target="_blank" href="/documentoselectronicos">
                          <Typography variant="h6">Certificaciones</Typography>
                        </a>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </MenuItem>
                <MenuItem className={theme.itemHamburguesaCuatro}>
                  <a target="_blank" href="/contacto">
                    <Button variant="contained" color="primary" className={theme.buttonContactoDivLinks}>
                      CONTACTO
                    </Button>
                  </a>
                </MenuItem>
              </Menu>

              <Button
                color="primary"
                onClickCapture={(e) => {
                  setpepe(pepe ? null : e.currentTarget)
                }}
                className={theme.menuHamburguesa}
              >
                <YesIcon icon="game-icons:hamburger-menu" style={{ fontSize: '36' }} />
              </Button>
            </div>
          </div>
        </Grid>

        <div data-title="Header" className={theme.header}>
          <div data-title="DIV IMAGEN PRINCIPPAL" className={theme.divimagenPrincipal}>
            <picture className={theme.imagenPrincipal}>
              <img src="/img/ESCRIBANÍA GODOY.png" alt="/img/ESCRIBANÍA GODOY.png" width="100%" height="100%" />
            </picture>
          </div>

          <Container className={theme.containerCards} maxWidth={false} disableGutters>
            <div data-title="DIV TARJETAS CERTIFICACIONES" className={theme.divTarjetas}>
              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/Certificaciondefirma">
                  <Typography variant="h1">Certificación de firma en general</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/Certificaciondefirma">
                    <Button variant="text" color="primary" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="primary"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/Actas">
                  <Typography variant="h1">Actas</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/Actas">
                    <Button variant="text" color="primary" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="info"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/Poderes">
                  <Typography variant="h1">Poderes</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/Poderes">
                    <Button variant="text" color="primary" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="info"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/Apostillasylegalizacionesdigitales">
                  <Typography variant="h1">Apostillas y Legalizaciones Digitales</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/Apostillasylegalizacionesdigitales">
                    <Button variant="text" color="primary" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="info"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/Autorizacionesparaviajes">
                  <Typography variant="h1">Autorizaciones para viajes de menores</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/Autorizacionesparaviajes">
                    <Button variant="text" color="primary" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="info"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/BoletosEscriturasCompraventa">
                  <Typography variant="h1">Boletos y Escrituras de Compraventa</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/BoletosEscriturasCompraventa">
                    <Button variant="text" color="inherit" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="info"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/Transferenciasdeautomotores ">
                  <Typography variant="h1">Transferencias de automotores Formulario 08</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/Transferenciasdeautomotores ">
                    <Button variant="text" color="inherit" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="info"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/Cesiondederechos">
                  <Typography variant="h1">Cesion de derechos</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/Transferenciasdeautomotores ">
                    <Button variant="text" color="inherit" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="info"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/Autorizacionesparaconducir">
                  <Typography variant="h1">Autorizaciones para conducir</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/Autorizacionesparaconducir">
                    <Button variant="text" color="inherit" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="info"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="CARD CERTIFICACIONES" className={theme.aboutCard}>
                <a target="_blank" href="/Autorizacionesparaconducir">
                  <Typography variant="h1">Actuaciones Notariales en General</Typography>

                  <Typography variant="h2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt sed do eiusmod tempor incididunt sed do
                    eiusmod tempor Lorem ipsum dolor sit amet
                  </Typography>
                </a>

                <div data-title="div" className={theme.buttonContainer}>
                  <a target="_blank" href="/Autorizacionesparaconducir">
                    <Button variant="text" color="inherit" className={theme.buttonTarjetasCertificaciones}>
                      Saber más
                      <ArrowRight
                        color="info"
                        className={theme.materialIconTarjetasCertificaciones}
                        sx={{
                          fontSize: 35,
                        }}
                      />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Container>

          <Container className={theme.contenedorTarjetasContacto} maxWidth={false}>
            <div data-title="DIV TARJETAS CONTACTO" className={theme.divTarjetasContacto}>
              <div data-title="DIV CONTACTO TARJETA UNO " className={theme.divContenidoContactoTarjetaUno}>
                <Call
                  color="inherit"
                  className={theme.materialIconTarjetasContacto}
                  sx={{
                    fontSize: 50,
                  }}
                />

                <Typography variant="h6">Llámanos</Typography>

                <div data-title="div" className={theme.divBotonContactanos}>
                  <a target="_blank" href="tel:+5493544121212">
                    <Button variant="contained" color="primary" className={theme.botonContactanos}>
                      +5493544123123
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="DIV CONTACTO TARJETA DOS" className={theme.divContenidoContactoTarjetaDos}>
                <Schedule
                  color="inherit"
                  className={theme.materialIconTarjetasContacto}
                  sx={{
                    fontSize: 50,
                  }}
                />

                <Typography variant="h6">
                  <span className={theme.tituloHorario}>Horarios de oficina:</span>
                </Typography>

                <Typography variant="subtitle2">
                  <span className={theme.textoSubtitle}>Lunes a Viernes: 9:00 a 21:00 hs</span>
                </Typography>

                <Typography variant="subtitle2">
                  <span className={theme.textoSubtitle}>Lorem ipsum, 123, X5870 Villa Dolores, Córdoba, Argentina</span>
                </Typography>
              </div>

              <div data-title="DIV CONTACTO TARJETA TRES" className={theme.divContenidoContactoTarjetaTres}>
                <Email
                  color="primary"
                  className={theme.materialIconTarjetasContacto}
                  sx={{
                    fontSize: 50,
                  }}
                />

                <Typography variant="h6">Envíenos un email</Typography>

                <div data-title="div" className={theme.divBotonContactanos}>
                  <a target="_blank" href="mailto:tuemail@ejemplo.com">
                    <Button variant="contained" color="primary" className={theme.botonContactanos}>
                      loremipsum@gmail.com
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Container>

          <Container className={theme.containerFields} maxWidth={false} disableGutters>
            <div data-title="div" className={theme.formCard}>
              <Typography variant="h1">Complete el formulario y nos pondremos en contacto</Typography>

              <div data-title="div" className={theme.fieldGroupNombre}>
                <Typography variant="subtitle2">Nombre*</Typography>

                <TextField
                  inputProps={{ maxLength: 35 }}
                  placeholder="
"
                  margin="normal"
                  size="small"
                  label="Ingrese su nombre"
                  type="text"
                  fullWidth
                  className={theme.fieldContactoNombre}
                  variant="outlined"
                  value={Suscriptoresdata.Nombre || ''}
                  onChange={handleSuscriptoresChange('Nombre')}
                  error={Suscriptoresdata?.errField === 'Nombre'}
                  helperText={Suscriptoresdata?.errField === 'Nombre' && Suscriptoresdata.errMessage}
                />

                <Typography variant="subtitle2">Apellido*</Typography>

                <TextField
                  inputProps={{ maxLength: 35 }}
                  placeholder="
"
                  margin="normal"
                  size="small"
                  label="Ingrese su apellido"
                  type="text"
                  fullWidth
                  className={theme.fieldContactoApellido}
                  variant="outlined"
                  value={Suscriptoresdata.Apellido || ''}
                  onChange={handleSuscriptoresChange('Apellido')}
                  error={Suscriptoresdata?.errField === 'Apellido'}
                  helperText={Suscriptoresdata?.errField === 'Apellido' && Suscriptoresdata.errMessage}
                />
              </div>

              <div data-title="div" className={theme.fieldGroup}>
                <Typography variant="subtitle2">Correo electrónico</Typography>

                <TextField
                  inputProps={{ maxLength: 40 }}
                  margin="normal"
                  size="small"
                  label="ejemplo@correo.com"
                  type="text"
                  fullWidth
                  className={theme.fieldContacto}
                  variant="outlined"
                  value={Suscriptoresdata.Correoelectronico || ''}
                  onChange={handleSuscriptoresChange('Correoelectronico')}
                  error={Suscriptoresdata?.errField === 'Correoelectronico'}
                  helperText={Suscriptoresdata?.errField === 'Correoelectronico' && Suscriptoresdata.errMessage}
                />
              </div>

              <div data-title="div" className={theme.fieldGroup}>
                <Typography variant="subtitle2">Contacto*</Typography>

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
                  margin="normal"
                  size="small"
                  add={true}
                />

                <Typography variant="subtitle2">Teléfono*</Typography>

                <TextField
                  inputProps={{ maxLength: 20 }}
                  margin="normal"
                  size="small"
                  label="Cod. área + Número"
                  type="text"
                  fullWidth
                  className={theme.fieldContacto}
                  variant="outlined"
                  value={Suscriptoresdata.Telfono || ''}
                  onChange={handleSuscriptoresChange('Telfono')}
                  error={Suscriptoresdata?.errField === 'Telfono'}
                  helperText={Suscriptoresdata?.errField === 'Telfono' && Suscriptoresdata.errMessage}
                />
              </div>

              <div data-title="div" className={theme.fieldGroupMensaje}>
                <Typography variant="subtitle2">Mensaje</Typography>

                <TextField
                  inputProps={{ maxLength: 550 }}
                  margin="normal"
                  size="medium"
                  label="Déjanos tu mensaje"
                  type="text"
                  fullWidth
                  multiline
                  className={theme.fieldMensaje}
                  variant="outlined"
                  value={Suscriptoresdata.Mensaje || ''}
                  onChange={handleSuscriptoresChange('Mensaje')}
                />
              </div>

              <Button
                color="primary"
                onClickCapture={(e) => {
                  saveInfo()
                  setopenSnackbar(true)
                }}
              >
                Button
              </Button>
            </div>
          </Container>
        </div>
      </div>

      <Container className={theme.containerIcons} maxWidth={false}>
        <div data-title="div" id="final" className={theme.footer}>
          <div data-title="div" className={theme.divLogoFooter}>
            <div data-title="div" className={theme.logoFooter}>
              <picture className={theme.faviconFooter}>
                <img src="/img/logo godoy-02.png" alt="/img/logo godoy-02.png" width="180" height="auto" />
              </picture>
            </div>
          </div>

          <div data-title="div" className={theme.LinksFooterColumnOneAndTwo}>
            <div data-title="FOOTER" className={theme.principalFooter}>
              <Typography variant="h1">PRINCIPAL</Typography>

              <a target="_blank" href="/contacto">
                <Button variant="text" color="inherit" className={theme.linksBotonesFooter}>
                  Contáctenos
                </Button>
              </a>

              <NavLink to="/firmadigital">
                <Button variant="text" color="inherit" className={theme.linksBotonesFooter}>
                  Certificaciones
                </Button>
              </NavLink>

              <a target="_blank" href="/">
                <Button variant="text" color="inherit" className={theme.linksBotonesFooter}>
                  Servicios
                </Button>
              </a>

              <a target="_blank" href="/nosotros">
                <Button variant="text" color="inherit" className={theme.linksBotonesFooter}>
                  Nosotros
                </Button>
              </a>
            </div>

            <div data-title="DIV CONTACTO FOOTER" className={theme.contactoFooter}>
              <Typography variant="h1">CONTACTO</Typography>

              <div data-title="div" className={theme.divIconLinksFooter}>
                <Call color="inherit" className={theme.IconLinksFooter} sx={{}} />

                <Typography variant="h2">
                  <span className={theme.linksTextosFooter}>Teléfono: +5493544123</span>
                </Typography>
              </div>

              <div data-title="div" className={theme.divIconLinksFooter}>
                <WhatsApp color="inherit" className={theme.IconLinksFooter} sx={{}} />

                <Typography variant="h2">
                  <span className={theme.linksTextosFooter}>Celular: +5493544123</span>
                </Typography>
              </div>

              <div data-title="div" className={theme.divIconLinksFooter}>
                <Email color="inherit" className={theme.IconLinksFooter} sx={{}} />

                <Typography variant="h2">
                  <span className={theme.linksTextosFooter}>Correo: Loremipsum@gmail.com</span>
                </Typography>
              </div>

              <div data-title="div" className={theme.divIconLinksFooter}>
                <Place color="inherit" className={theme.IconLinksFooter} sx={{}} />

                <Typography variant="h2">
                  <span className={theme.linksTextosFooter}>Lorem ipsum, 123, X5870 Villa Dolores, Córdoba, Argentina</span>
                </Typography>
              </div>

              <div data-title="div" className={theme.logoFlotante}>
                <picture>
                  <img src="/img/Texto del párrafo33_processed.png" alt="/img/Texto del párrafo33_processed.png" width="170" height="auto" />
                </picture>
              </div>
            </div>
          </div>

          <div data-title="div" className={theme.LinksFooterColumnThree}>
            <div data-title="div" className={theme.horarioFooter}>
              <Typography variant="h1">HORARIOS</Typography>

              <div data-title="div" className={theme.divLinksFooterHorarios}>
                <Typography variant="h2">
                  <span className={theme.linksTextosFooter}>Lunes a Viernes: 9:00 a 21:00 hs</span>
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div data-title="divWhatsappPrincipal" className={theme.divWhatsappPrincipal}>
          <div data-title="div" className={theme.divTextoWhatsApp}>
            <Typography variant="h1">Podemos ayudarte?</Typography>

            <Typography variant="h2">Escribinos</Typography>
          </div>

          <a target="_blank" className={theme.whatsappLink} href="https://walink.co/a9e37d">
            <WhatsApp
              color="primary"
              className={theme.whatsappIcon}
              sx={{
                fontSize: 60,
              }}
            />
          </a>
        </div>
      </Container>

      <div data-title="DIV DERECHOS DE AUTOR" className={theme.divDerechosDeAutor}>
        <Typography variant="h1">© Escribanía Lorem 2026 Todos los derechos reservados</Typography>
      </div>

      <div data-title="DIV DERECHOS DE AUTOR DOS" className={theme.divDerechosDeAutor}>
        <Typography variant="h1">Sitio web creado por Mariano G.</Typography>
      </div>
    </React.Fragment>
  )
}

export default Landing
