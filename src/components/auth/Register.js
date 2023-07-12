import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from "prop-types";
import Alert from '../Alert';

export const Register = ( {setAlert,register} ) => {

  const [formData,setFormData] = useState({
    name: "",
    email: "",
    
    password: "",
    password2: ""
  });
  const {name, email,password,password2} = formData;

  const onChangeHandler = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value});
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(password !== password2){
      setAlert("password not match","danger");
    }else{
      register({ name, email, password });
    }
  }
  return <Fragment>
      <section className="container">
        <Alert/>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmitHandler(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required onChange={e => onChangeHandler(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange={e => onChangeHandler(e)} />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" onChange={e => onChangeHandler(e)}/>
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  </Fragment>;
};
Register.propTypes={
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired
}

export default connect(null,{setAlert,register})(Register);
