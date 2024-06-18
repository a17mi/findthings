// import Pagemain from './pages/Pagemain.js';
// import Pagefound from './pages/Pagefound.js';
// import Pagelost from './pages/Pagelost.js';
// import Pagelogin from './pages/Pagelogin.js';
// import Pagecreateadd from './pages/Pagecreateadd.js';
// import Pageadd from './pages/Pageadd.js';
// import Pagecategory from './pages/Pagecategory.js';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import React, { useState, createContext, useContext } from 'react';
// import { AuthContext } from './AuthContext'; 
// import UserProfile from './pages/UserProfile';


// // Провайдер аутентификации
// const AuthProvider = ({ children }) => {
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   // Функции для управления состоянием входа
//   const login = user => {
//     setLoggedInUser(user);
//   };

//   const logout = () => {
//     setLoggedInUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ loggedInUser, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Хук для использования контекста аутентификации
// export const useAuth = () => useContext(AuthContext);

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Pagelogin />} />
//           <Route path="/" element={<Pagemain />} />
//           <Route path="/createadd" element={<Pagecreateadd />} />
//           <Route path="/found" element={<Pagefound />} />
//           <Route path="/lost" element={<Pagelost />} />
//           <Route path="/pageadd/:id" element={<Pageadd />} />
//           <Route path="/category/:category" element={<Pagecategory/>} />
//           <Route path="/profile" element={<UserProfile />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;

import Pagemain from './pages/Pagemain.js';
import Pagefound from './pages/Pagefound.js';
import Pagelost from './pages/Pagelost.js';
import Pagelogin from './pages/Pagelogin.js';
import Pagecreateadd from './pages/Pagecreateadd.js';
import Pageadd from './pages/Pageadd.js';
import Pagecategory from './pages/Pagecategory.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserProfile from './pages/UserProfile';


// Провайдер аутентификации
const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Пользователь вошел в систему
        setLoggedInUser(user); // Сохраняем всю информацию о пользователе
      } else {
        // Пользователь вышел из системы
        setLoggedInUser(null);
      }
    });
  }, []);

  // Функции для управления состоянием входа
  const login = user => {
    setLoggedInUser(user);
  };

  const logout = () => {
    setLoggedInUser(null);
  };


  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста аутентификации
export const useAuth = () => useContext(AuthContext);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Pagelogin />} />
          <Route path="/" element={<Pagemain />} />
          <Route path="/createadd" element={<Pagecreateadd />} />
          <Route path="/found" element={<Pagefound />} />
          <Route path="/lost" element={<Pagelost />} />
          <Route path="/pageadd/:id" element={<Pageadd />} />
          <Route path="/category/:category" element={<Pagecategory/>} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;