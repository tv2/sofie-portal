import React from 'react'
import ReactDOM from 'react-dom/client'
import { Application } from './application'

function main() {
  const mountPoint = document.querySelector('.app')
  if(!mountPoint) {
    console.warn('no mount point found')
    return
  }
  const application = ReactDOM.createRoot(mountPoint)
  application.render(React.createElement(Application))
}
main()
