import React , { useEffect, useState } from 'react';
import { Navigate ,useNavigate , Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/firebaseConfig';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [checkedPassword, setCheckedPassword] = useState(false);
    const navigate = useNavigate();

    //verifica si hay sesiones abiertas
    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            if(user){
                console.log("ya tienes sesión iniciada :", user.uid);
            }else{
              console.log("no tienes ninguna sesión iniciada");
            }
        });
    }, []);

    //muestra la contraseña del logeo
    const showPassword = () =>{ 
        var chkbox = document.getElementById("passwordCheck").checked; 
        var pass = document.getElementById("passwordLogin");
        setCheckedPassword(chkbox);
        if(checkedPassword){
        pass.setAttribute("type","password"); //Si el checkbox esta marcado, el atributo type vale password
        }else{
        pass.setAttribute("type","text"); //Si el checkbox esta sin marcar, el atributo type vale text
        }
    } 

    //iniciar sesion del usuario
    const signUser = () =>{
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert("Signed in : "+user.email.toString());
            console.log({user});
            setIsLoggedin(true);

        })
        .catch((error) => {
            alert(error.code.toString());
            setIsLoggedin(false);

        });
    }

    //submit del formulario
    const submitLogin = (e) =>{
        e.preventDefault();
        signUser();
    }

    return (
        <>
        {isLoggedin?
            <Navigate to={ {pathname: '/Home'} } replace={true} />
            :
            <div>
                <h1>Login</h1>
                <form onSubmit={submitLogin} style={{"backgroundColor":"pink"}}>
                <label>Correo electronico</label><br/>
                <input type="email" placeholder="Ingresa un email" onChange={
                    (e) => {setEmail(e.target.value)}
                } value={email} required/><br/>
                <label>Contraseña</label><br/>
                <input type="password" id="passwordLogin" placeholder="Ingresa una contraseña" onChange={
                    (e) => {setPassword(e.target.value)}
                } value={password} minLength={6} required />
                <input type="checkbox" id="passwordCheck" onClick={showPassword} defaultChecked={checkedPassword}/>
                <br/>
                <Link to="/Forget-Password">¿Olvidaste tu contraseña?</Link>  
                <br/> 
                <input type="submit" value="Iniciar Sesión"/>
                </form>
                <br/> 
                <button onClick={()=>{ navigate("/Sign-Up"); }}>Crear nueva cuenta</button>
            </div> 
        }  
        </>
    );
}