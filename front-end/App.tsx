import React from 'react'
import { Route, Switch } from 'react-router-dom'

const DatosPaises = React.lazy(() => import('./Pages/DatosPaises'))
const Paises = React.lazy(() => import('./Pages/Paises'))
const Suscriptores = React.lazy(() => import('./Pages/suscriptores'))
const Autorizacionesparaconducir = React.lazy(() => import('./Pages/autorizacionesparaconducir'))
const Cesindederechos = React.lazy(() => import('./Pages/cesiondederechos'))
const Transferenciasdeautomotores = React.lazy(() => import('./Pages/transferenciasdeautomotores'))
const BoletosEscriturascompraventa = React.lazy(() => import('./Pages/boletosescriturascompraventa'))
const Autorizacionesparaviajes = React.lazy(() => import('./Pages/autorizacionesparaviajes'))
const Apostillasylegalizacionesdigitales = React.lazy(() => import('./Pages/apostillasylegalizacionesdigitales'))
const Poderes = React.lazy(() => import('./Pages/poderes'))
const Actas = React.lazy(() => import('./Pages/actas'))
const Certificacindefirma = React.lazy(() => import('./Pages/certificaciondefirma'))
const Contacto = React.lazy(() => import('./Pages/contacto'))
const Nosotros = React.lazy(() => import('./Pages/nosotros'))
const Landing = React.lazy(() => import('./Pages/landing'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/DatosPaises',
      name: 'DatosPaises',
      component: DatosPaises,
    },
    {
      path: '/Paises',
      name: 'Paises',
      component: Paises,
    },
    {
      path: '/Suscriptores',
      name: 'Suscriptores',
      component: Suscriptores,
    },
    {
      path: '/Autorizacionesparaconducir',
      name: 'Autorizaciones para conducir',
      component: Autorizacionesparaconducir,
    },
    {
      path: '/Cesiondederechos',
      name: 'Cesión de derechos',
      component: Cesindederechos,
    },
    {
      path: '/Transferenciasdeautomotores ',
      name: 'Transferencias de automotores ',
      component: Transferenciasdeautomotores,
    },
    {
      path: '/BoletosEscriturasCompraventa',
      name: 'Boletos Escrituras compraventa',
      component: BoletosEscriturascompraventa,
    },
    {
      path: '/Autorizacionesparaviajes',
      name: 'Autorizaciones para viajes ',
      component: Autorizacionesparaviajes,
    },
    {
      path: '/Apostillasylegalizacionesdigitales',
      name: 'Apostillas y legalizaciones digitales',
      component: Apostillasylegalizacionesdigitales,
    },
    {
      path: '/poderes',
      name: 'Poderes',
      component: Poderes,
    },
    {
      path: '/Actas',
      name: 'Actas',
      component: Actas,
    },
    {
      path: '/Certificaciondefirma',
      name: 'Certificación de firma',
      component: Certificacindefirma,
    },
    {
      path: '/Contacto',
      name: 'Contacto',
      component: Contacto,
    },
    {
      path: '/Nosotros',
      name: 'Nosotros',
      component: Nosotros,
    },
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
