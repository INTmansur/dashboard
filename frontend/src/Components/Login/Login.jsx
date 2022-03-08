import {useState, useEffect} from "react";
import "./Login.css";

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import axios from "axios";
import {Redirect, Link} from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,

};


const Login = () => {



//create user page and all the functionality

const [open, setOpen] = useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

const [formData, setFormData] = useState({});



const handleChange = (e) => {
   const {name, value} = e.target;
   setFormData({...formData, [name] : value});
   

}






const handleCreateAccount = async () => {
    await axios.post("http://localhost:2233/user/register", formData);
    
}


const [isLogin, setIsLogin] = useState(false);
const [login, setLogin] = useState({});

const handleLoginData = (e) => {
    const {name, value} = e.target;

    setLogin({...login, [name] : value});

}

const handleLogin = async () => {
    const {data} = await axios.post("http://localhost:2233/user/login", login)
    sessionStorage.setItem("userid", JSON.stringify(data.user))
    setIsLogin(true);
}


if(isLogin) {
    return <Redirect to = "/dashboard" />
}


    return (
        <div className = "mainContainer">
            <div className = "header-container">
                <div className = "heading">
                    <h1>Login page</h1>
                </div>
                <div className = "create-account-btn">
                    <button onClick={handleOpen} className = "create-btn">Create Account</button>
                </div>
            </div>
            <div className = "login-container">
                <div className = "email-container">
                    <label>Email : </label><br/>
                    <input onChange = {(e) => handleLoginData(e)} name = "email" type = "email" className = "input-email" required />
                </div>
                <div className = "password-container">
                    <label>Password: </label><br />
                    <input onChange = {(e) => handleLoginData(e)} name = "password" type = "password" className = "input-password" required/>
                </div>
                <div className = "login-button">
                    <button onClick = {handleLogin}  className = "login-btn">Login</button>
                </div>
            </div>
            <div>
      {/* <Button >Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
           <div className = "create-account-container">
               {/* <div>
                   Create new account
               </div> */}
               <div>
                   <form onSubmit = {(e) => {
                       e.preventDefault();
                   }}>
                    <div className = "username-container">
                        <label> Username : </label><br />
                        <input onChange = {(e) => handleChange(e)} type = "text" name = "username" className = "username-input" />
                    </div>
                    <div className = "name-container">
                        <label>Name : </label><br />
                        <input onChange = {(e) => handleChange(e)} type = "text" name = "name" className = "name-input" required />
                    </div>
                    
                    <div className = "email-container">
                        <label>Email : </label><br />
                        <input onChange = {(e) => handleChange(e)} type = "email" name = "email" className = "email-input" required/>
                    </div>
                    <div className = "password-container">
                        <label>Password : </label><br />
                        <input onChange = {(e) => handleChange(e)} type = "password" name = "password" className = "password-input" required />
                    </div>
                   
                    {/* <div className = "permissions-container">
                        <label>Permissions</label>
                    </div> */}
                    <div className = "create-account-btna">
                        <button onClick = {handleCreateAccount} className = "crt-btn">Create Account</button>
                    </div>
                   </form>
               </div>
           </div>
          </Box>
        </Fade>
      </Modal>
    </div>
        </div>
    )
}

export {Login};