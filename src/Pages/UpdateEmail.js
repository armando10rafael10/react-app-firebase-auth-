import React , { useState } from 'react';
import { getAuth, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from '../firebase/firebaseConfig';

export default function UpdateEmail( ){
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmailConfirm] = useState('');
    const navigate = useNavigate();
    
    //Configura la dirección de correo electrónico de un usuario
    const submitChangeEmail = (e) =>{
        e.preventDefault();
        if(email === emailConfirm){
            const auth = getAuth(app);
            updateEmail(auth.currentUser, email).then(() => {
                alert("Email updated!");
                window.localStorage.setItem('emailUser', email);
                navigate("/Home");
            }).catch((error) => {
                console.log("An Error Ocurred In The Email : ",error.code);
                alert("An Error Ocurred In The Email : ",error.code);
                if(error.code === "auth/requires-recent-login"){
                    navigate("/Sign-Up");
                }
            });
        }else{
            alert('The emails not are equals');
        }
    }
    
    return ( 
        <div>
            <h1>Update Email</h1>
            <form onSubmit={submitChangeEmail} style={{"backgroundColor":"yellow"}}>
                <label>Correo electronico</label>
                <br/>
                <input type="email" 
                        placeholder="Ingresa un nuevo email" 
                        onChange={(e) => { setEmail(e.target.value); }} 
                        value={email} 
                        required/>
                <br/>
                <label>Nuevo Correo</label>
                <br/>
                <input type="email" 
                        placeholder="Confirma el email" 
                        onChange={(e) => { setEmailConfirm(e.target.value); }} 
                        value={emailConfirm} 
                        required />
                <br />
                <input type="submit" value="actualizar correo"/>
            </form>
        </div>
    );
}