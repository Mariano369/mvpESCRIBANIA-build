import baseClasses from '@components/Themes/layout.module.scss'
import React, { FunctionComponent } from 'react'

import { Icon as YesIcon } from '@iconify/react'
import { ArrowCircleRightOutlined, ArrowLeft, ArrowRight, Call, Email, LocationOn, Place, Schedule, WhatsApp } from '@mui/icons-material'
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
import stylesmodulescss from 'dist/css/styles.module.scss'
import { NavLink } from 'react-router-dom'

const Certificacindefirma: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
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

        <div data-title="div" id="principal" className={theme.header}>
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

              <Typography variant="h1">Certificación de firma en general</Typography>

              <a target="_blank" href="/contacto">
                <Button variant="contained" color="primary" className={theme.botonContactanos}>
                  Contactanos
                </Button>
              </a>
            </div>
          </Container>

          <Container className={theme.containerCardsFirmaDigital}>
            <div data-title="divTarjetas" className={theme.divTarjetasFirmaDigital}>
              <div data-title="Card" className={theme.aboutCardFirmaDigital}>
                <Typography variant="h1">Personas</Typography>

                <Typography variant="h2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </Typography>

                <div data-title="div" className={theme.divButtonFirmaDigital}>
                  <a target="_blank" href="/firmaOlógrafa">
                    <Button variant="text" color="primary">
                      Más sobre Personas
                      <a target="_blank" href="/">
                        <ArrowCircleRightOutlined color="info" sx={{}} />
                      </a>
                    </Button>
                  </a>
                </div>
              </div>

              <div data-title="Card" className={theme.aboutCardFirmaDigital}>
                <Typography variant="h1">Empresas</Typography>

                <Typography variant="h2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </Typography>

                <div data-title="div" className={theme.divButtonFirmaDigital}>
                  <a target="_blank" href="/firmaOlógrafa">
                    <Button variant="text" color="primary">
                      Más sobre Empresas
                      <a target="_blank" href="/">
                        <ArrowCircleRightOutlined color="info" sx={{}} />
                      </a>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>

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

export default Certificacindefirma
