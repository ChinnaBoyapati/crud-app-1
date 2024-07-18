import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import CreateCourse from './components/CreateCourse'
import CourseView from './components/CourseView'
import PageNotFound from './components/PageNotFound'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';
import store from './global/actions/store'
import Users from './users/Users'
import Login from './components/auth/Login'


const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/create-course' element={<CreateCourse />} />
            <Route path="/edit-course/:id" element={<CreateCourse />} />
            <Route path="/course/:id" element={<CourseView />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />


            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
    </Provider>
  )
}

export default App