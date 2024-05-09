// TODO: Replace with your Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyBS-E-W1L3XK7stlVsS1c02FRzCBSA1zsE",
  authDomain: "pfep-9ded1.firebaseapp.com",
  projectId: "pfep-9ded1",
  storageBucket: "pfep-9ded1.appspot.com",
  messagingSenderId: "333176142301",
  appId: "1:333176142301:web:afced671374fc979e35e34"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById('sign-up-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('passwordInput').value;
  const name = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const countryCode = document.getElementById('country-code').value;
  const countrySelect = document.getElementById('countrySelect').value;
  const currency = document.getElementById('currencySelect').value;

  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          console.log('User signed up:', user);

          // Add a new document in collection "users"
          return db.collection("users").doc(user.uid).set({
              name: name,
              lastName: lastName,
              phoneNumber: phoneNumber,
              countryCode: countryCode,
              currency: currency,
              countrySelect: countrySelect
          });

          
      })
      .then(() => {
          console.log("User details saved successfully!");
          window.location.href = "Account.html";
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error('Error signing up:', errorCode, errorMessage);
      });
});
