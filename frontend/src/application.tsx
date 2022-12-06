import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminRouter } from './admin/admin-router'
import { ClientRouter } from './client/client-router'

enum ApplicationRoute {
  ADMIN_BASE = "/admin/*",
  CLIENT_BASE = "/*"
}
export function Application() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path={ApplicationRoute.ADMIN_BASE} element={<AdminRouter/>}/>
       <Route path={ApplicationRoute.CLIENT_BASE} element={<ClientRouter/>}/>
     </Routes>
   </BrowserRouter>
  )
}

