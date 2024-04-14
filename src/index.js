import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import * as React from "react";
import './index.css'
// import SignIn from './pages/SignIn'
import App from './App'
// import SignUp from './pages/SignUp'
// import HomePage from './pages/HomePage';
// import PrivateRoutes from './pages/PrivateRoutes';
// import ServerPage from './pages/private/ServerPage';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage/>,
//   },
//   {
//     path: "/signup",
//     element: <SignUp/>,
//   },
//   {
//     path: "/signin",
//     element: <SignIn/>,
//   },
// ]);



// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

function Home() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<App/>}/>
          {/* <Route path='/message' element={<PrivateRoutes/>}>
            <Route index element={<ServerPage />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

ReactDOM.render(<Home />, document.getElementById('root'));