import { Route, Routes } from 'react-router-dom'
import UserList from "./components/userList/userList";

enum AdminRoute {
  EDIT = "/edit",
  HOME = "/",
  PAGE_NOT_FOUND = "/*",
}
export function AdminRouter() {
  return (
     <Routes>
       <Route path={AdminRoute.EDIT} element={<div> Edit </div>}/>
       <Route
           path={AdminRoute.HOME}
           element={
           <UserList/>
       }/>
       <Route path={AdminRoute.PAGE_NOT_FOUND} element={<div>Admin Page Not Found </div>}/>
     </Routes>
  )
}

