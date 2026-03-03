import baseClasses from '@components/Themes/layout.module.scss'
import React, { FunctionComponent } from 'react'

import { Icon as YesIcon } from '@iconify/react'
import { ArrowLeft, ArrowRight, Call, Email, LocationOn, Place, WhatsApp } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Hidden from '@mui/material/Hidden'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { mergeClasses } from '@services/utils'
import stylesmodulescss from 'dist/css/styles.module.scss'
import { NavLink } from 'react-router-dom'

const localStyles = {
  mainPanel: { ['@media (min-width:960px)']: { backgroundColor: '#56baec', width: '100%', flexGrow: 1 } },
  loginHolder: { margin: '5rem auto 0', width: '30vw', textAlign: 'center' },
  loginArea: {
    position: 'relative',
    background: 'white',
    padding: '4rem 3rem 2rem',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    boxSizing: 'border-box',
    boxShadow: '0px 3px 20px 5px #00000030',
  },
  loginTitle: { textTransform: 'uppercase', fontSize: '1.2rem', letterSpacing: '0.1rem', color: '#3084af' },
  image: {
    width: '5rem',
    position: 'absolute',
    top: '-2.5rem',
    left: 'calc(15vw - (2.5rem + 2.5px))',
    border: '5px solid white',
    borderRadius: '5rem',
  },
}
const Nosotros: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = mergeClasses(baseClasses, localStyles)
  const theme = { ...baseClasses, ...stylesmodulescss }
  const [pepe, setpepe] = React.useState<any>(null)

  // Theme selection

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
        <Container className={theme.topBarContainerSuperior} maxWidth="md">
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
          <Container className={theme.contenedorServicios} maxWidth={false} disableGutters>
            <div data-title="div" className={theme.divTituloServicios}>
              <div data-title="div" className={theme.divMaterialIconCertificados}>
                <a target="_blank" href="/">
                  <ArrowLeft color="primary" className={theme.materialIconCertificado} sx={{}} />
                </a>

                <a target="_blank" href="/">
                  <Button variant="text" color="inherit" className={theme.buttonUnoCertificados}>
                    Inicio
                  </Button>
                </a>
              </div>

              <Typography variant="h1">La escribanía</Typography>

              <Typography variant="h3">
                Somos un equipo notarial comprometido con la seguridad jurídica y la excelencia en el servicio a servicio
              </Typography>

              <a target="_blank" href="/contacto">
                <Button variant="contained" color="primary" className={theme.botonContactanos}>
                  Contactanos
                </Button>
              </a>
            </div>
          </Container>

          <Container className={theme.contenedorContenidoNosotros} maxWidth={false} disableGutters>
            <div data-title="div" className={theme.divContenidoNosotros}>
              <div data-title="div" className={theme.bloqueTexto}>
                <Typography variant="h1">Qué nos distingue</Typography>

                <Typography variant="h2">Más de 40 años acompañando a nuestros clientes</Typography>
              </div>

              <Typography variant="h3">
                Responsabilidad y celeridad en la atención de los servicios notariales. Certificación de firmas, contratos y escrituras públicas. Nos
                avalan más de 40 años de actuación profesional prestando servicios jurídicos notariales. Además de las actuaciones generales,
                asesoramos especialmente en el ámbito del derecho posesorio y hereditario, acompañados por profesionales idóneos —ingenieros y
                abogados—, garantizando seguridad jurídica a los cesionarios y compradores de inmuebles cuyos poseedores invocan títulos de propiedad
                no inscriptos en el Registro General de la Provincia, lo que se trata de una casuística habitual en la zona de Traslasierra.
              </Typography>
            </div>
          </Container>

          <Container className={theme.gridDiferenciales} maxWidth={false} disableGutters>
            <div data-title="div" className={theme.itemDiferencial}>
              <Typography variant="h3">+40 años de trayectoria</Typography>
            </div>

            <div data-title="div" className={theme.itemDiferencial}>
              <Typography variant="h3">Seguridad jurídica garantizada</Typography>
            </div>

            <div data-title="div" className={theme.itemDiferencial}>
              <Typography variant="h3">Atención personalizada</Typography>
            </div>
          </Container>

          <Container className={theme.nuestroEquipo} maxWidth={false} disableGutters>
            <div data-title="div" className={theme.nuestroEquipoInner}>
              <Typography variant="h1">Nuestro equipo</Typography>

              <div data-title="div" className={theme.imagenPerfilNosotros}>
                <div data-title="div" className={theme.cardPersona}>
                  <picture>
                    <img src="/img/Ellipse 2.png" alt="/img/Ellipse 2.png" width="100" height="auto" />
                  </picture>

                  <Typography variant="h3">Titular del Registro Escribano - Abogado - Diplomado en Contratos y Sociedades</Typography>
                </div>

                <div data-title="div" className={theme.cardPersona}>
                  <picture>
                    <img src="/img/Ellipse 2.png" alt="/img/Ellipse 2.png" width="100" height="auto" />
                  </picture>

                  <Typography variant="h3">Titular del Registro Escribano - Abogado - Diplomado en Contratos y Sociedades</Typography>
                </div>
              </div>
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

export default Nosotros
