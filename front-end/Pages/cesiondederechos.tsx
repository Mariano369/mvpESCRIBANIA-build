import baseClasses from '@components/Themes/layout.module.scss'
import stylesmodulescss from 'dist/css/styles.module.scss'
import React, { FunctionComponent } from 'react'

const Cesindederechos: FunctionComponent = (props: any) => {
  const {
    history: navigation,
    match: { params },
  } = props
  const classes = baseClasses
  const theme = { ...baseClasses, ...stylesmodulescss }

  // Theme selection

  return (
    <React.Fragment>
      <div className={classes.mainPanel}></div>
    </React.Fragment>
  )
}

export default Cesindederechos
