import React, { useState } from 'react';
import { app } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ForgetPassword( ){
    const [email, setEmail] = useState('');
    const navigate = useNavigate();    

    //Envía un correo electrónico de restablecimiento de contraseña (contraseña olvidada) 
    const submitSendEmail = (e) =>{
        e.preventDefault();
        const auth = getAuth(app);
        sendPasswordResetEmail(auth, email).then(() => {
            alert("¡Password reset email sent ",email," !");   
            navigate('/');     
        })
        .catch((error) => {
            if(error.code === "auth/user-not-found"){
                alert('El correo que proporciono no esta registrado , !Vuelva a intentarlo!');
                setEmail('');
            }
            console.error(error.message);
        });
    }

    return ( 
        <div>
            <h1>Enviar Correo De Recuperación De Cuenta</h1>
            <form onSubmit={submitSendEmail} style={{"backgroundColor":"lawngreen"}}>
                <label>Correo electronico</label><br/>
                <input type="email" 
                        placeholder="Ingresa un email" 
                        onChange={ (e) => {setEmail(e.target.value)} } 
                        value={email} required />
                <br/>
                <input type="submit" value="Enviar Correo"/>
            </form>
        </div>
    );
}