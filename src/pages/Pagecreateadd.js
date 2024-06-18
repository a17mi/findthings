import  './add.css';
import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { db } from '../index';
import { ref , push, onValue  } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../index';
import { useNavigate } from 'react-router-dom';

const Pagecreateadd = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('lost');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [category, setCategory] = useState('');
  const [award, setAward] = useState('');
  const [contacts, setContacts] = useState('');
  // Состояние для отображения текста об успешном создании объявления
  const [isCreated, setIsCreated] = useState(false);
   // Состояние для хранения координат
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [image, setImage] = useState(null);
  // Состояние для хранения списка категорий
  const [categories, setCategories] = useState([]); 
  const navigate = useNavigate();

  
  const nextPage = () => {
    setPage(page + 1);
  };

 // Функция для обработки клика по карте и сохранения координат
 const handleMapClick = (e) => {
  const coords = e.get('coords');
  setCoordinates(coords);
};

// Функция для обработки изменения статуса
const handleStatusChange = (event) => {
  setStatus(event.target.value);
};

  // Функция для загрузки категорий из базы данных
  useEffect(() => {
    const categoriesRef = ref(db, 'category/');
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedCategories = [];
      for (const value in data) {
        loadedCategories.push(data[value]);
      }
      setCategories(loadedCategories);
    });
  }, []);

// Функция для обработки выбора файла
const handleImageChange = (e) => {
  if (e.target.files[0]) {
    setImage(e.target.files[0]);
  }
};

 // Функция для загрузки изображения
 const uploadImage = async () => {
  if (image) {
    const imageRef = storageRef(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef); // Возвращаем URL изображения
  }
};

// Функция для отправки данных в Firebase
const handleSubmit =  async () => {
  const currentDateTime = new Date();
  let url = '';
   // Загружаем изображение и получаем URL
   if (image) {
    url = await uploadImage(); // Дожидаемся завершения загрузки изображения и получаем URL
  setIsCreated(true);
  setTimeout(() => {
    navigate('/'); // Перенаправляем пользователя на главную страницу
  }, 3000); // Задержка в 5 секунд
  }

  const adData = {
    title,
    description,
    status: status,
    createdAt: currentDateTime.toISOString(),
    date,
    time,
    place,
    category,
    imageUrl: url,
    award,
    contacts,
    coordinates
  };
  push(ref(db, 'advertisment/'), adData);
  setIsCreated(true); // Устанавливаем isCreated в true после создания объявления
};

if (isCreated) {
  return (
    <div className='message'>
      <p className="success_message">Объявление создано!</p>
    </div>
  );
}

  return (
    <div>
      <p className="name">Потеряно <br/> найдено</p>
      <p className="page_name">Создание объявления</p>
      {page === 1 && (
        <>
        <p className="heading">Заголовок</p>
        <div className="input_block1">
        <input className="input_heading"
        value={title}
        onChange={(e) => setTitle(e.target.value)}></input>
        <p className="description">Описание</p>
        <div className="input_block2">
        <input className="input_description"
         value={description}
         onChange={(e) => setDescription(e.target.value)}></input></div>
        {/* Добавление радиокнопки */}
        <div className="status" >
              <label className="lost_radio">
                <input
                  type="radio"
                  value="lost"
                  checked={status === 'lost'}
                  onChange={handleStatusChange}
                />
                Утеряно
              </label>
              <label>
                <input
                  type="radio"
                  value="found"
                  checked={status === 'found'}
                  onChange={handleStatusChange}
                />
                Найдено
              </label>
            </div>
         <p className="page_num"> 1/3 </p>
        <button onClick={nextPage} className="nextpage">Далее</button>
        </div>
        </>
      )}
      {page === 2 && (
        <>
        <p className="date"> Дата </p>
        <div className="input_block8">
        <input className="input_date"
        value={date}
        onChange={(e) => setDate(e.target.value)}></input>
        </div>
        <p className="time"> Время </p>
        <div className="input_block3">
        <input className="input_time"
        value={time}
        onChange={(e) => setTime(e.target.value)}></input>
        </div>
        <p className="place"> Место </p>
        <div className="input_block4">
        <input className="input_place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}></input>
        </div>
        <p className="photo"> Фото </p>
        <input className='photo_input' type="file" onChange={handleImageChange} />
        <p className="page_num2"> 2/3 </p>
        <YMaps query={{ apikey: '2dc34bad-7fa8-4904-84ee-f3d906ba136d' }}>
            <div className='map'>
              <Map defaultState={{ center: [59, 30.314997], zoom: 7 }} width="200px" height="200px"  onClick={handleMapClick}>
                {coordinates[0] !== 0 && <Placemark geometry={coordinates} />}
              </Map>
            </div>
          </YMaps>
        <button onClick={nextPage} className="nextpage2">Далее</button>
        </>
      )}
      {page === 3 && (<>
        <p className="categoria"> Категория </p>
        <div className="input_block5">
        <select
              className="input_categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
        </div>
        <p className="award"> Вознаграждение </p>
        <div className="input_block6">
        <input className="input_award"
        value={award}
        onChange={(e) => setAward(e.target.value)}></input>
        </div>
        <p className="contacts"> Контакты </p>
        <div className="input_block7">
        <input className="input_contacts"
        value={contacts}
        onChange={(e) => setContacts(e.target.value)}></input>
        </div>
        <p className="page_num3"> 3/3 </p>
        <button onClick={handleSubmit} className="create">Создать</button>
      </>
      )}
    </div>
  );
  
};

export default Pagecreateadd;

// import  './add.css';
// import React, { useState, useEffect, useContext } from 'react';
// import { YMaps, Map, Placemark } from 'react-yandex-maps';
// import { db } from '../index';
// import { ref , push, onValue  } from 'firebase/database';
// import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../index';
// import { useNavigate  } from 'react-router-dom';
// import { AuthContext } from '../AuthContext';

// const Pagecreateadd = () => {
//   const [page, setPage] = useState(1);
//   const [status, setStatus] = useState('lost');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [place, setPlace] = useState('');
//   const [category, setCategory] = useState('');
//   const [award, setAward] = useState('');
//   const [contacts, setContacts] = useState('');
//   // Состояние для отображения текста об успешном создании объявления
//   const [isCreated, setIsCreated] = useState(false);
//    // Состояние для хранения координат
//   const [coordinates, setCoordinates] = useState([0, 0]);
//   const [image, setImage] = useState(null);
//   // Состояние для хранения списка категорий
//   const [categories, setCategories] = useState([]); 
//   const navigate = useNavigate();
//   const { loggedInUser } = useContext(AuthContext);

  
//   const nextPage = () => {
//     setPage(page + 1);
//   };

//  // Функция для обработки клика по карте и сохранения координат
//  const handleMapClick = (e) => {
//   const coords = e.get('coords');
//   setCoordinates(coords);
// };

// // Функция для обработки изменения статуса
// const handleStatusChange = (event) => {
//   setStatus(event.target.value);
// };

//   // Функция для загрузки категорий из базы данных
//   useEffect(() => {
//     const categoriesRef = ref(db, 'category/');
//     onValue(categoriesRef, (snapshot) => {
//       const data = snapshot.val();
//       const loadedCategories = [];
//       for (const value in data) {
//         loadedCategories.push(data[value]);
//       }
//       setCategories(loadedCategories);
//     });
//   }, []);

// // Функция для обработки выбора файла
// const handleImageChange = (e) => {
//   if (e.target.files[0]) {
//     setImage(e.target.files[0]);
//   }
// };

//  // Функция для загрузки изображения
//  const uploadImage = async () => {
//   if (image) {
//     const imageRef = storageRef(storage, `images/${image.name}`);
//     await uploadBytes(imageRef, image);
//     return await getDownloadURL(imageRef); // Возвращаем URL изображения
//   }
// };

// // Функция для отправки данных в Firebase
// const handleSubmit =  async () => {
//   const currentDateTime = new Date();
//   const userId = loggedInUser ? loggedInUser.uid : null; 
//   let url = '';
//    // Загружаем изображение и получаем URL
//    if (image) {
//     url = await uploadImage(); // Дожидаемся завершения загрузки изображения и получаем URL
//   setIsCreated(true);
//   setTimeout(() => {
//     navigate('/'); // Перенаправляем пользователя на главную страницу
//   }, 3000); // Задержка в 5 секунд
//   }

//   const adData = {
//     userId,
//     title,
//     description,
//     status: status,
//     createdAt: currentDateTime.toISOString(),
//     date,
//     time,
//     place,
//     category,
//     imageUrl: url,
//     award,
//     contacts,
//     coordinates
//   };
//   push(ref(db, 'advertisment/'), adData);
//   setIsCreated(true); // Устанавливаем isCreated в true после создания объявления
// };

// if (isCreated) {
//   return (
//     <div className='message'>
//       <p className="success_message">Объявление создано!</p>
//     </div>
//   );
// }

//   return (
//     <div>
//       <p className="name">Потеряно <br/> найдено</p>
//       <p className="page_name">Создание объявления</p>
//       {page === 1 && (
//         <>
//         <p className="heading">Заголовок</p>
//         <div className="input_block1">
//         <input className="input_heading"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}></input>
//         <p className="description">Описание</p>
//         <div className="input_block2">
//         <input className="input_description"
//          value={description}
//          onChange={(e) => setDescription(e.target.value)}></input></div>
//         {/* Добавление радиокнопки */}
//         <div className="status" >
//               <label className="lost_radio">
//                 <input
//                   type="radio"
//                   value="lost"
//                   checked={status === 'lost'}
//                   onChange={handleStatusChange}
//                 />
//                 Утеряно
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   value="found"
//                   checked={status === 'found'}
//                   onChange={handleStatusChange}
//                 />
//                 Найдено
//               </label>
//             </div>
//          <p className="page_num"> 1/3 </p>
//         <button onClick={nextPage} className="nextpage">Далее</button>
//         </div>
//         </>
//       )}
//       {page === 2 && (
//         <>
//         <p className="date"> Дата </p>
//         <div className="input_block8">
//         <input className="input_date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}></input>
//         </div>
//         <p className="time"> Время </p>
//         <div className="input_block3">
//         <input className="input_time"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}></input>
//         </div>
//         <p className="place"> Место </p>
//         <div className="input_block4">
//         <input className="input_place"
//         value={place}
//         onChange={(e) => setPlace(e.target.value)}></input>
//         </div>
//         <p className="photo"> Фото </p>
//         <input className='photo_input' type="file" onChange={handleImageChange} />
//         <p className="page_num2"> 2/3 </p>
//         <YMaps query={{ apikey: '2dc34bad-7fa8-4904-84ee-f3d906ba136d' }}>
//             <div className='map'>
//               <Map defaultState={{ center: [59, 30.314997], zoom: 7 }} width="200px" height="200px"  onClick={handleMapClick}>
//                 {coordinates[0] !== 0 && <Placemark geometry={coordinates} />}
//               </Map>
//             </div>
//           </YMaps>
//         <button onClick={nextPage} className="nextpage2">Далее</button>
//         </>
//       )}
//       {page === 3 && (<>
//         <p className="categoria"> Категория </p>
//         <div className="input_block5">
//         <select
//               className="input_categoria"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               {categories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>
//         </div>
//         <p className="award"> Вознаграждение </p>
//         <div className="input_block6">
//         <input className="input_award"
//         value={award}
//         onChange={(e) => setAward(e.target.value)}></input>
//         </div>
//         <p className="contacts"> Контакты </p>
//         <div className="input_block7">
//         <input className="input_contacts"
//         value={contacts}
//         onChange={(e) => setContacts(e.target.value)}></input>
//         </div>
//         <p className="page_num3"> 3/3 </p>
//         <button onClick={handleSubmit} className="create">Создать</button>
//       </>
//       )}
//     </div>
//   );
  
// };

// export default Pagecreateadd;