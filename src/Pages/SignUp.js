import React , { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from '../firebase/firebaseConfig';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [checkedPassword, setCheckedPassword] = useState(false);
  const navigate = useNavigate();

  //mostrar contraseña
  const showPassword = () =>{ 
    var chkbox = document.getElementById("passwordCheckSignUp").checked; 
    var pass = document.getElementById("passwordSignUp");
    var passConfirm = document.getElementById("passwordConfirmSignUp");
    setCheckedPassword(chkbox);
    if(checkedPassword){
      pass.setAttribute("type","password"); //Si el checkbox esta marcado, el atributo type vale password
      passConfirm.setAttribute("type","password"); //Si el checkbox esta marcado, el atributo type vale password
    }else{
      pass.setAttribute("type","text"); //Si el checkbox esta sin marcar, el atributo type vale text
      passConfirm.setAttribute("type","text"); //Si el checkbox esta sin marcar, el atributo type vale text
    }
  } 

  //salir de la sesión de un usuario
  const signOutUser = () =>{
      const auth = getAuth(app);
      signOut(auth).then(() => {
          console.log("Sign-out successful");
          navigate("/");
      }).catch((error) => {
          console.log(error.code.toString());
      });
  }
  
  //submit del formulario (crear usuario)
  const submitLogin = (e) =>{
    e.preventDefault();

    if(password === passwordConfirm){
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        alert("created user : "+userCredential.user.email.toString());
        console.log({userCredential});
        signOutUser();
      })
      .catch((error) => {
        alert(error.code)
        console.log({error});
      });
    }else{
      alert("no coinciden las contraseñas");
    }
  }

  return (
    <div>
        <h1>Sign Up</h1>
        <form onSubmit={submitLogin} style={{"backgroundColor":"orange"}}>
          <label>Correo electronico</label><br/>
          <input type="email" placeholder="Ingresa un email" onChange={
            (e) => {setEmail(e.target.value)}
          } value={email} required/><br/>
          <label>Contraseña</label><br/>
          <input type="password" id="passwordSignUp" placeholder="Ingresa una contraseña" onChange={
            (e) => {setPassword(e.target.value)}
          } value={password} minLength={6} required />
          <input type="checkbox" id="passwordCheckSignUp" onClick={showPassword} defaultChecked={checkedPassword}/>
          <br />
          <input type="password" id="passwordConfirmSignUp" placeholder="Confirma la contraseña" onChange={
            (e) => {setPasswordConfirm(e.target.value)}
          } value={passwordConfirm} minLength={6} required />
           <br />
          <input type="submit" value="Crear nueva cuenta"/>
        </form>
    </div>
  );
}