// import './registration.css'
// import React, {Component} from 'react';
// import firebase from 'firebase/compat/app';
// import 'firebase/database';
// import { useNavigate, Navigate } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';

// class Pagelogin extends React.Component {
//   static contextType = AuthContext;
//   constructor(props) {
//     super(props);
//     this.state = {
//       login: '',
//       password: '',
//       email: '',
//       user: '',
//       phone: '',
//       error: '',
//       isLoggingIn: true // Состояние для переключения между входом и регистрацией
//     };
//   }

//   handleInputChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value
//     });
//   };

//   // handleSignup = () => {
//   //   const { login, password, email, user, phone } = this.state;
//   //   // Сохранение данных в Firebase Realtime Database
//   //   firebase.database().ref('users').push({
//   //     login,
//   //     password,
//   //     email,
//   //     user,
//   //     phone
//   //   }).then(() => {
//   //     console.log('Данные сохранены!');
//   //     // Очистка полей ввода после сохранения данных
//   //     this.setState({
//   //       login: '',
//   //       password: '',
//   //       email: '',
//   //       user: '',
//   //       phone: ''
//   //     });
//   //   }).catch((error) => {
//   //     console.error('Ошибка:', error);
//   //   });
//   // };

//   handleSignup = () => {
//     const { login, password, email, user, phone } = this.state;
//     // Создание нового пользователя в Firebase Authentication
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         // Здесь userCredential.user.uid - это userId, который вы можете использовать
//         const userId = userCredential.user.uid;
//         // Сохранение данных пользователя в Firebase Realtime Database с использованием userId
//         firebase.database().ref('users/' + userId).set({
//           login,
//           password,
//           email,
//           user,
//           phone
//         }).then(() => {
//           console.log('Данные сохранены!');
//           // Очистка полей ввода после сохранения данных
//           this.setState({
//             login: '',
//             password: '',
//             email: '',
//             user: '',
//             phone: ''
//           });
//         }).catch((error) => {
//           console.error('Ошибка:', error);
//         });
//       })
//       .catch((error) => {
//         console.error('Ошибка создания пользователя:', error);
//       });
//   };

//   // handleLogin = () => {
//   //   const { login, password } = this.state;
//   //   // Путь к данным пользователя в базе данных
//   //   const userRef = firebase.database().ref('users').orderByChild('login').equalTo(login);
  
//   //   userRef.once('value', snapshot => {
//   //     if (snapshot.exists()) {
//   //       const userData = snapshot.val();
//   //       const userId = Object.keys(userData)[0]; // Получаем ключ первого пользователя в ответе
//   //       const userPassword = userData[userId].password;
//   //       if (userPassword === password) {
//   //         // Пользователь существует и пароль верный
//   //         console.log('Пользователь успешно вошел в систему');
//   //         this.setState({ loggedInUser: login, error:'' });
//   //         this.context.login(login);
//   //         this.props.navigate('/');
//   //       } else {
//   //         // Пароль не совпадает
//   //         this.setState({ error: 'Неверный пароль' });
//   //       }
//   //     } else {
//   //       // Пользователь не найден
//   //       this.setState({ error: 'Пользователь не найден' });
//   //     }
//   //   });
//   // };

//   handleLogin = () => {
//     const { email, password } = this.state;
//     // Вход пользователя в Firebase Authentication
//     firebase.auth().signInWithEmailAndPassword(email, password)
//       .then((userCredential) => {
//         // Пользователь успешно вошел в систему
//         const userId = userCredential.user.uid;
//         console.log('Пользователь успешно вошел в систему с userId:', userId);
//         this.setState({ loggedInUser: userId, error:'' });
//         this.context.login(userId);
//         this.props.navigate('/');
//       })
//       .catch((error) => {
//         this.setState({ error: 'Ошибка входа: ' + error.message });
//       });
//   };

//   toggleForm = () => {
//     this.setState(prevState => ({
//       isLoggingIn: !prevState.isLoggingIn
//     }));
//   };


//   render() {
//     const { isLoggingIn, error} = this.state;
//     return (
//       <div className="page_registration">
//         <p className="name">Потеряно <br/> найдено</p>
//         {error && <p className="error_message">{error}</p>} 
//         <button onClick={this.toggleForm} className="button_enter">
//           {isLoggingIn ? 'Регистрация' : 'Вход'}
//         </button>
//         {/* <button onClick={this.props.onClickCreateAdd} className="button_create_ad"> Создать объявление</button> */}
//         <p className="page_name">{isLoggingIn ? 'Вход' : 'Регистрация'}</p>
//         {isLoggingIn ? (
//           // Форма входа
//           <>
//             <p className="login">Логин</p>
//             <div className="input1">
//               <input className="input_login" name="login" value={this.state.login} onChange={this.handleInputChange}></input>
//             </div>
//             <p className="password">Пароль</p>
//             <div className="input2">
//               <input className="input_password" name="password"  type="password"  value={this.state.password} onChange={this.handleInputChange}></input>
//             </div>
//             <button onClick={this.handleLogin} className="button_signup"> Войти </button>
//           </>
//         ) : (
//           // Форма регистрации
//           <>
//             <p className="login">Логин</p>
//             <div className="input1">
//               <input className="input_login" name="login" value={this.state.login} onChange={this.handleInputChange}></input>
//             </div>
//             <p className="password">Пароль</p>
//             <div className="input2">
//               <input className="input_password" name="password"  type="password" value={this.state.password} onChange={this.handleInputChange}></input>
//             </div>
//             <p className="email">E-Mail</p>
//             <div className="input3">
//               <input className="input_email" name="email" value={this.state.email} onChange={this.handleInputChange}></input>
//             </div>
//             <p className="user">ФИО</p>
//             <div className="input4">
//               <input className="input_user" name="user" value={this.state.user} onChange={this.handleInputChange}></input>
//             </div>
//             <p className="phone">Телефон</p>
//             <div className="input5">
//               <input className="input_phone" name="phone" value={this.state.phone} onChange={this.handleInputChange}></input>
//             </div>
//             <button onClick={this.handleSignup} className="button_signup"> Зарегистрироваться </button>
//           </>
//         )}
//       </div>
//     );
//   }
// }

// function withNavigation(Component) {
//   return function(props) {
//     const navigate = useNavigate();
//     return <Component {...props} navigate={navigate} />;
//   };}
// export default withNavigation(Pagelogin);

import './registration.css'
import React, {Component} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/database';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

class Pagelogin extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      email: '',
      user: '',
      phone: '',
      error: '',
      isLoggingIn: true // Состояние для переключения между входом и регистрацией
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSignup = () => {
    const { login, password, email, user, phone } = this.state;
    // Сохранение данных в Firebase Realtime Database
    firebase.database().ref('users').push({
      login,
      password,
      email,
      user,
      phone
    }).then(() => {
      console.log('Данные сохранены!');
      // Очистка полей ввода после сохранения данных
      this.setState({
        login: '',
        password: '',
        email: '',
        user: '',
        phone: ''
      });
    }).catch((error) => {
      console.error('Ошибка:', error);
    });
  };

  // handleSignup = () => {
  //   const { login, password, email, user, phone } = this.state;
  //   // Создание нового пользователя в Firebase Authentication
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Здесь userCredential.user.uid - это userId, который вы можете использовать
  //       const userId = userCredential.user.uid;
  //       // Сохранение данных пользователя в Firebase Realtime Database с использованием userId
  //       firebase.database().ref('users/' + userId).set({
  //         login,
  //         password,
  //         email,
  //         user,
  //         phone
  //       }).then(() => {
  //         console.log('Данные сохранены!');
  //         // Очистка полей ввода после сохранения данных
  //         this.setState({
  //           login: '',
  //           password: '',
  //           email: '',
  //           user: '',
  //           phone: ''
  //         });
  //       }).catch((error) => {
  //         console.error('Ошибка:', error);
  //       });
  //     })
  //     .catch((error) => {
  //       console.error('Ошибка создания пользователя:', error);
  //     });
  // };

  handleLogin = () => {
    const { login, password } = this.state;
    // Путь к данным пользователя в базе данных
    const userRef = firebase.database().ref('users').orderByChild('login').equalTo(login);
  
    userRef.once('value', snapshot => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData)[0]; // Получаем ключ первого пользователя в ответе
        const userPassword = userData[userId].password;
        if (userPassword === password) {
          // Пользователь существует и пароль верный
          console.log('Пользователь успешно вошел в систему');
          this.setState({ loggedInUser: login, error:'' });
          this.context.login(login);
          this.props.navigate('/');
        } else {
          // Пароль не совпадает
          this.setState({ error: 'Неверный пароль' });
        }
      } else {
        // Пользователь не найден
        this.setState({ error: 'Пользователь не найден' });
      }
    });
  };

  // handleLogin = () => {
  //   const { email, password } = this.state;
  //   // Вход пользователя в Firebase Authentication
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Пользователь успешно вошел в систему
  //       const userId = userCredential.user.uid;
  //       console.log('Пользователь успешно вошел в систему с userId:', userId);
  //       this.setState({ loggedInUser: userId, error:'' });
  //       this.context.login(userId);
  //       this.props.navigate('/');
  //     })
  //     .catch((error) => {
  //       this.setState({ error: 'Ошибка входа: ' + error.message });
  //     });
  // };

  toggleForm = () => {
    this.setState(prevState => ({
      isLoggingIn: !prevState.isLoggingIn
    }));
  };


  render() {
    const { isLoggingIn, error} = this.state;
    return (
      <div className="page_registration">
        <p className="name">Потеряно <br/> найдено</p>
        {error && <p className="error_message">{error}</p>} 
        <button onClick={this.toggleForm} className="button_enter">
          {isLoggingIn ? 'Регистрация' : 'Вход'}
        </button>
        {/* <button onClick={this.props.onClickCreateAdd} className="button_create_ad"> Создать объявление</button> */}
        <p className="page_name">{isLoggingIn ? 'Вход' : 'Регистрация'}</p>
        {isLoggingIn ? (
          // Форма входа
          <>
            <p className="login">Логин</p>
            <div className="input1">
              <input className="input_login" name="login" value={this.state.login} onChange={this.handleInputChange}></input>
            </div>
            <p className="password">Пароль</p>
            <div className="input2">
              <input className="input_password" name="password"  type="password"  value={this.state.password} onChange={this.handleInputChange}></input>
            </div>
            <button onClick={this.handleLogin} className="button_signup"> Войти </button>
          </>
        ) : (
          // Форма регистрации
          <>
            <p className="login">Логин</p>
            <div className="input1">
              <input className="input_login" name="login" value={this.state.login} onChange={this.handleInputChange}></input>
            </div>
            <p className="password">Пароль</p>
            <div className="input2">
              <input className="input_password" name="password"  type="password" value={this.state.password} onChange={this.handleInputChange}></input>
            </div>
            <p className="email">E-Mail</p>
            <div className="input3">
              <input className="input_email" name="email" value={this.state.email} onChange={this.handleInputChange}></input>
            </div>
            <p className="user">ФИО</p>
            <div className="input4">
              <input className="input_user" name="user" value={this.state.user} onChange={this.handleInputChange}></input>
            </div>
            <p className="phone">Телефон</p>
            <div className="input5">
              <input className="input_phone" name="phone" value={this.state.phone} onChange={this.handleInputChange}></input>
            </div>
            <button onClick={this.handleSignup} className="button_signup"> Зарегистрироваться </button>
          </>
        )}
      </div>
    );
  }
}

function withNavigation(Component) {
  return function(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };}
export default withNavigation(Pagelogin);