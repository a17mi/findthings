import { db } from '../index';
import { ref, update, get } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import './profile.css';

function UserProfile() {
  const { loggedInUser } = useAuth();
  const [user, setUser] = useState({});
  const [userAdvertisements, setUserAdvertisements] = useState([]);
  const [selectedAd, setSelectedAd] = useState(null);

  const showAdDetails = (ad) => {
    setSelectedAd(ad);
  };

  const closeAdDetails = () => {
    setSelectedAd(null);
  };

  // Загрузка данных пользователя
  useEffect(() => {
    const userRef = ref(db, '/users/' + loggedInUser);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      } else {
        console.log("Нет данных");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [loggedInUser]);

  // Загрузка объявлений пользователя
  useEffect(() => {
    const adsRef = ref(db, '/advertisment');
    get(adsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const ads = snapshot.val();
        const userAds = Object.entries(ads).filter(([key, value]) => value.userId === loggedInUser)
          .map(([key, value]) => ({ id: key, ...value }));
        setUserAdvertisements(userAds);
      } else {
        console.log("Нет данных");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [loggedInUser]);

  // Обработчик для обновления данных пользователя
  const handleUpdateUser = (event) => {
    event.preventDefault();
    const newUserData = {
      login: event.target.login.value,
      password: event.target.password.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    const userRef = ref(db, '/users/' + loggedInUser);
    update(userRef, newUserData).then(() => {
      alert('Данные успешно обновлены');
    }).catch((error) => {
      alert('Ошибка обновления данных: ' + error.message);
    });
  };

  // Форма для редактирования данных пользователя
  const renderEditUserForm = () => (
    <form onSubmit={handleUpdateUser}>
      <p className="profile-login">Логин</p>
      <div className="profile-input1">
        <input className="profile-input_login" name="login" defaultValue={user.login} />
      </div>
      <p className="profile-password">Пароль</p>
      <div className="profile-input2">
        <input className="profile-input_password" name="password" type="password" defaultValue={user.password} />
      </div>
      <p className="profile-email">E-Mail</p>
      <div className="profile-input3">
        <input className="profile-input_email" name="email" defaultValue={user.email} />
      </div>
      <p className="profile-phone">Телефон</p>
      <div className="profile-input5">
        <input className="profile-input_phone" name="phone" defaultValue={user.phone} />
      </div>
      <button type="submit" className="button_change">Сохранить изменения</button>
    </form>
  );

// // Отображение объявлений пользователя
// const renderUserAdvertisements = () => (
//     <div>
//       <h2>Мои объявления</h2>
//       {userAdvertisements.map(ad => (
//         <div key={ad.id} onClick={() => showAdDetails(ad)}>
//           <h3>{ad.title}</h3>
//         </div>
//       ))}
//       {selectedAd && <Modal ad={selectedAd} onClose={closeAdDetails} />}
//     </div>
//   );


  return (
    <div>
      <h1 className='cabinet'>Личный кабинет</h1>
      {renderEditUserForm()}
      {/* {renderUserAdvertisements()} */}
    </div>
  );
}

export default UserProfile