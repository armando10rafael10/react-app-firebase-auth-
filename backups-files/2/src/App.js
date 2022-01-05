import React , { useState } from 'react';
// import { app } from './firebase/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,signOut} from "firebase/auth";
import { app } from './firebase/firebaseConfig';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCredentialFire, setUserCredentialFire] = useState('');
  const [isRegistred, setIsRegistred] = useState(false);

  const submit = () =>{
    createUser();
    // signUser();
    // signOutUser();
    // sendEmailVerification();
    // sendPasswordReset();
  }

  const sendEmailVerification = () => {
    // [START auth_send_email_verification]
    app.auth().currentUser.sendEmailVerification()
      .then(() => {
        console.log("Email verification sent!");
      });
    // [END auth_send_email_verification]
  }
  const sendPasswordReset = () =>{
    // [START auth_send_password_reset]
    app.auth().sendPasswordResetEmail("sam@example.com")
      .then(() => {
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    // [END auth_send_password_reset]
  }
  //salir de la sesión de un usuario
  const signOutUser = () =>{
    const auth = getAuth(app);
    signOut(auth).then(() => {
      console.log("Sign-out successful");
    }).catch((error) => {
      console.log("An error happened : ", error);
    });
    // app.auth().signOut().then(() => {
    //   console.log("Sign-out successful");
    // }).catch((error) => {
    //   console.log("An error happened : ", error);
    // });
  }
  //iniciar sesion del usuario
  const signUser = () =>{
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth,"adriana@hotmail.com","123men")
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("Signed in : ",user);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
      // app.auth().signInWithEmailAndPassword("adriana@hotmail.com","123men")
      // .then((userCredential) => {
      //   var user = userCredential.user;
      //   console.log("Signed in : ",user);
      // })
      // .catch((error) => {
      //   console.log(error.code);
      //   console.log(error.message);
      // });
  }
  //crear usuario
  const createUser = () =>{
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("created user : ",user);
      setUserCredentialFire(userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
    // app.auth().createUserWithEmailAndPassword("aris@hotmail.com","123men")
    // .then((c) => {
    //   console.log("entro",c);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    setEmail(e.target.emailField.value);
    setPassword(e.target.passwordField.value); 
    createUser();
  }

  return (
    <div>
        <h1>{isRegistred? "Registrate" : "Iniciar sesión"}</h1>
        <form onSubmit={submitHandler}>
          <label htmlFor='emailField'>correo electronico</label>
          <br/>
          <input type="email" id="emailField"/>
          <br/>
          <label htmlFor='passwordField'>contraseña</label>
          <br/>
          <input type="password" id="passwordField"/>
          <br/><br/>
          <button type="submit">
            {" "}
            {isRegistred? "Registrate" : "Iniciar Sesion"}{" "}
          </button>
        </form>
        <br/>
        <button onClick={ ()=>setIsRegistred(!isRegistred) }>
          {isRegistred? "¿Ya tienes cuenta? -> ¡Inicia sesión!" : "¿No tienes cuenta? -> ¡Registrate Gratis!"}
        </button>
        {/* <div>
          <label>correo</label>
          <input type="email" id="email" onChange={ (ev)=>setEmail(ev.target.value) } />
          <label>contraseña</label>
          <input type="password" id="password" onChange={ (ev)=>setPassword(ev.target.value) } />
          <button onClick={submit} >iniciar sesion</button>
        </div> */}
    </div>
  );
}
export default App;