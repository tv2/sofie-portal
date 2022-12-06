import { Route, Routes } from 'react-router-dom'

enum ClientRoute {
  HOME = "/",
  PAGE_NOT_FOUND = "/*",
}
export function ClientRouter() {
  return (
    <Routes>
      <Route path={ClientRoute.HOME} element={<div> Client </div>}/>
      <Route path={ClientRoute.PAGE_NOT_FOUND} element={<div>Client Page Not Found </div>}/>
    </Routes>
  )
}

