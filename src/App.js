
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import { Provider } from "react-redux";
import store from './store';
import Alert from './components/Alert';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import profileForm from './components/create-profile/ProfileForm';
import AddEducation from './components/create-profile/AddEducation';
import AddExperience from './components/create-profile/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Post from './components/post/Post';
import Posts from './components/posts/Posts';


function App() {

  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.getItem("token")) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.getItem("token"));
      store.dispatch(loadUser());
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API


    // log user out from all tabs if they log out in one tab

  }, []);
  return (
    <Provider store={store}>
    <Router>
    <Fragment>
    <Navbar/>

    <Routes>
    <Route path="/" element={ <Landing/> } />




    <Route path="/register" element={ <Register/> } />
    <Route path="/login" element={ <Login/> } />
    <Route path="/profiles" element={ <Profiles/> } />
    <Route path="/profile/:id" element={ <Profile/> } />
    <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route path="create-profile" element={<PrivateRoute component={profileForm}/>}/>
          <Route
            path="edit-profile"
            element={<PrivateRoute component={profileForm} />}
          />
            <Route
            path="add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="add-education"
            element={<PrivateRoute component={AddEducation} />}
          />

<Route path="posts" element={<PrivateRoute component={Posts} />} />
          <Route path="posts/:id" element={<PrivateRoute component={Post} />} />




    </Routes>


    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
