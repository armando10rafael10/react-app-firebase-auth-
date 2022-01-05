import React , { useState } from 'react';
import { getAuth, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from '../firebase/firebaseConfig';

export default function UpdatePassword( ){
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checkedPassword, setCheckedPassword] = useState(false);
    const navigate = useNavigate();
    
    //mostrar contraseña
    const showPassword = () =>{ 
        var chkbox = document.getElementById("passwordCheckChangePass").checked; 
        var pass = document.getElementById("passwordChangePass");
        var passConfirm = document.getElementById("passwordConfirmChangePass");
        setCheckedPassword(chkbox);
        if(checkedPassword){
            pass.setAttribute("type","password");
            passConfirm.setAttribute("type","password");
        }else{
            pass.setAttribute("type","text"); 
            passConfirm.setAttribute("type","text"); 
        }
    } 

    //Configura la contraseña de un usuario
    const submitChangePass = (e) =>{
        e.preventDefault();
        if(password === passwordConfirm){
            const auth = getAuth(app);
            const user = auth.currentUser;
            updatePassword(user, password).then(() => {
                alert("Update Password Successful");
                window.localStorage.setItem('passwUser', password);
                navigate("/Home");
            }).catch((error) => {
                console.log("An Error Ocurred In The Password: ",error.code);
                if(error.code === "auth/requires-recent-login"){
                    navigate("/Sign-In");
                }
            });
        }else{
            alert('The passwords not are equals');
        }
    }
    
    return ( 
        <div>
            <h1>Update Password</h1>
            <form onSubmit={submitChangePass} 
                    style={{"backgroundColor":"yellow"}}>
                <label>Nueva Contraseña</label><br/>
                <input type="password" 
                        id="passwordChangePass" 
                        placeholder="Ingresa una nueva contraseña" 
                        onChange={(e) => {setPassword(e.target.value)}} 
                        value={password} 
                        minLength={6} required />
                <input type="checkbox" 
                        id="passwordCheckChangePass" 
                        onClick={showPassword} 
                        defaultChecked={checkedPassword}/>
                <br />
                <input type="password" 
                        id="passwordConfirmChangePass" 
                        placeholder="Confirma la contraseña" 
                        onChange={(e) => {setPasswordConfirm(e.target.value)}} 
                        value={passwordConfirm} 
                        minLength={6} required />
                <br />
                <input type="submit" value="Cambiar contraseña"/>
            </form>
        </div>
    );
}