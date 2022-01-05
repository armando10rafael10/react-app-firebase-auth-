import React , { useState } from 'react';
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from '../firebase/firebaseConfig';

export default function UpdateUserProfile( ){
    const [nombre, setNombre] = useState('');
    const [urlPhoto, setUrlPhoto] = useState('');
    const navigate = useNavigate();
    
    //Actualiza el perfil de un usuario
    const submitChangeUserProfile = (e) =>{
        e.preventDefault();
        const auth = getAuth(app);
        updateProfile(auth.currentUser, {
            displayName: nombre, 
            photoURL: urlPhoto,
        }).then(() => {
            alert("Profile updated!");
            navigate("/Home");
        }).catch((error) => {
            alert("An error occurred : ",error.code);
            console.log("An error occurred : ",error.code);
            if(error.code === "auth/requires-recent-login"){
                navigate("/Sign-Up");
            }
        });
    }
    
    return ( 
        <div>
            <h1>Update User Profile</h1>
            <form onSubmit={submitChangeUserProfile} style={{"backgroundColor":"yellow"}}>
                <label>Nombre</label><br/>
                <input type="text" 
                        placeholder="Ingresa un nombre" 
                        onChange={(e) => { setNombre(e.target.value); }} 
                        value={nombre} />
                <br/>
                <label>Photo Url</label><br/>
                <input type="text" 
                        placeholder="Ingresa una nueva url photo" 
                        onChange={(e) => { setUrlPhoto(e.target.value); }} 
                        value={urlPhoto} />
                <br/>
                <input type="submit" value="Actualizar Perfil"/>
            </form>
        </div>
    );
}