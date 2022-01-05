import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { app } from '../firebase/firebaseConfig';
import NotAuthenticated from './NotAuthenticated';
import { getAuth, signOut, deleteUser, sendEmailVerification, onAuthStateChanged } from "firebase/auth";

export default function Home( ) {
    const [isUsuarioAuth, setIsUsuarioAuth] = useState(false);    
    const [usuarioFirebase, setUsuarioFirebase] = useState(false);    
    const navigate = useNavigate();

    useEffect(() => {
        IsAuthenticated()
    }, []);

    //verifica si hay sesiones abiertas
    const IsAuthenticated = ( ) =>{
        onAuthStateChanged( getAuth(app), (user) => {
            if(user){
                console.log("ya tienes sesión iniciada :", user.uid);
                setUsuarioFirebase(user);//se obtiéne el perfil del usuario
                setIsUsuarioAuth(false);
            }else{
                console.log("no tienes ninguna sesión iniciada");
                setIsUsuarioAuth(true);
            }
        });
    }

    //envia un mail para verificar 
    const verificationUser = () => {  
        const auth = getAuth(app);
        console.log({auth});
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log("Email verification sent!");
        });
    }

    //Borra un usuario
    const delete_User = () =>{
        verificationUser();

        const auth = getAuth(app);
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            console.log("User deleted");
            navigate("/");
        }).catch((error) => {
            console.log("An error ocurred", error.code);
        });
    }

    //salir de la sesión de un usuario
    const signOutUser = () =>{
        signOut( getAuth(app) ).then(() => {
            window.localStorage.clear();
            console.log("Sign-out successful");
            navigate("/");
        }).catch((error) => {
            console.log(error.code.toString());
        });
    }

    const ReauthUser = ( ) =>{
        // const emailUser = window.localStorage.getItem('emailUser');
        // const passwUser = window.localStorage.getItem('passwUser');
        // console.log(app.auth().currentUser.reauthenticate(credential));
    }

    return(
        <>
            {isUsuarioAuth?  <NotAuthenticated />: 
            <>
                <h1>home</h1>
                <h4>display Name : {usuarioFirebase.displayName}</h4>
                <h4>email : {usuarioFirebase.email}</h4>
                <h4>uid : {usuarioFirebase.uid}</h4>
                <h4>provider Id : {usuarioFirebase.providerId}</h4>
                <h4>refresh Token : {usuarioFirebase.refreshToken}</h4>
                <img src={usuarioFirebase.photoURL} alt="imagen" height={80}/>
                <br/>
                <button onClick={() => { navigate("/Update-User-Profile");}}>actualizar perfil</button>
                <br/>
                <button onClick={() => { navigate("/Update-Password"); }}>actualizar contraseña</button>
                <br/>
                <button onClick={() => { navigate("/Update-Email"); }}>actualizar correo</button>
                <br/>
                <button onClick={ReauthUser}>reautenticar cuenta</button>
                <br/>
                <button onClick={delete_User}>eliminar cuenta</button>
                <br/>
                <button onClick={signOutUser}>cerrar sesión</button>
            </>
            }
        </>
    )
}