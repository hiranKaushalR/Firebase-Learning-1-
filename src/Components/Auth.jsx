import React, { useState } from "react";
import { auth, googleProvider } from "../Config/FireBase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  

  async function signIn() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <form>
      <input type="email" placeholder="Email..." onChange={(email) => setEmail(email.target.value)} />
      <input type="password" placeholder="Password..." onChange={(password) => setPasword(password.target.value)} />
    <div>
      <button type="button" onClick={signIn}>
        Submit
      </button>
      <button type="button" onClick={signInWithGoogle}>
        Sign In W// Google
      </button>
    </div>
    </form>
  );
}

export default Auth;
