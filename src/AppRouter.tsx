import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Auth/login'
import Layout from './components/layout'
import YourNotes from './components/yourNotes'

const AppRouter = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/" element={<Navigate to="/loginPage" />} />
      <Route path='/loginPage' element={<Login />} />
      <Route path='/signupPage' element={<Login />} />
      <Route path='/yourNotes' element={<YourNotes />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRouter