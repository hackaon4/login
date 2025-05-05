
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
  import { getAuth , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCW853OW6RJqJKZ8mdBrOuLVUAoUKKoJMA",
    authDomain: "learn-79f89.firebaseapp.com",
    projectId: "learn-79f89",
    storageBucket: "learn-79f89.firebasestorage.app",
    messagingSenderId: "130902290534",
    appId: "1:130902290534:web:e5910c48fde83cd0ffbda7",
    measurementId: "G-FQTWK5MW0W"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app)
 
  //inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  //submit button 
  const submit = document.getElementById('submit');
  submit.addEventListener("click",function(event){
    event.preventDefault()
    //inputs

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

    
    alert("hi")
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("done login")
    window.location.href = "/Dashboard";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("something is worng")
  });

  })

