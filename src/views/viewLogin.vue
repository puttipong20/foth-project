<template>
  <div class="container">
    <form>
      <div>
        <q-input
          standout="bg-teal text-white"
          v-model="email"
          label="Email"
          type="Email"
          required
        />
      </div>
      <div>
        <q-input
          standout="bg-teal text-white"
          v-model="password"
          label="Password"
          required
        />
      </div>
    </form>
    <q-btn color="purple" label="Log in" @click="login()" />
    <q-btn color="purple" label="Log in with Google" @click="loginGoogle()" />
    <q-btn color="black" label="Log out" @click="logout()" />
  </div>
</template>

<script>
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../plugin/config-db";
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          this.$router.replace("/login");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User : " + user);
          this.$router.replace("/form");
          alert("login successful with : " + this.email);
          this.$emit("sendData", this.email);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          alert("Please input you real account");
        });
    },
    loginGoogle() {
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(token);
          console.log(user);
          alert("login successful");
          this.$router.push("/form");
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          // The email of the user's account used.
          // const email = error.email;
          // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          this.$router.push("/form");
        });
    },
  },
};
</script>

<style>
.container {
  text-align: center;
}
</style>
