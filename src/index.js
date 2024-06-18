import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/reset.css'
import './styles/common.css'
import firebaseConfig from './firebaseConfig';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();
const storage = getStorage(firebaseApp);

// const db = firebaseApp.firestore();
const auth = firebase.auth();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

export {db,storage};


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './styles/reset.css'
// import './styles/common.css'
// import firebaseConfig from './firebaseConfig';
// import { getStorage } from 'firebase/storage';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// // import 'firebase/compat/database';
// import { getDatabase } from 'firebase/database';
// import { deleteAds } from './delete'; 

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.database();
// const storage = getStorage(firebaseApp);
// const auth = getAuth(firebaseApp);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <App />
// );

// export {db,storage, auth };
