import { Routes, Route, Outlet } from "react-router-dom"
import Home from "./routes/home/home.component";

const Navigation = () => {
  return (
    <div>
      <p>Navigation</p>
      <Outlet />
    </div>
  )
}
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}></Route>
      </Route>
    </Routes>
  )
}

export default App