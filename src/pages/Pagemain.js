// import { db } from '../index';
// import {ref, get, query, limitToLast } from 'firebase/database';
// import './mainpage.css';
// import React, {useState, useEffect, useContext} from 'react';
// import imgsearch from "../img/Search.svg"
// import imgadress from "../img/Adress.svg"
// import { useNavigate } from 'react-router-dom';
// import Card from './Card';
// import { useAuth } from '../App';
// import AdvertisementsMap from './YandexMap'

// const getCategories = async () => {
// const categoryRef = ref(db, '/category');
// const snapshot = await get(categoryRef);
// const categories = snapshot.val();
// // Преобразование объекта категорий в массив пар [ключ, значение]
// const categoryArray = Object.entries(categories).map(([Key, Value]) => {
// return { id: Key, name: Value };
// });
// return categoryArray;
// }

// // Функция для получения последних объявлений
// const getLastAdvertisements = async () => {
//   const advertisementsRef = ref(db, '/advertisment');
//   const lastAdvertisementsQuery = query(advertisementsRef, limitToLast(3));
//   const snapshot = await get(lastAdvertisementsQuery);
//   const advertisements = snapshot.val();
//   // Преобразование объекта объявлений в массив и сортировка по дате создания
//   const advertisementsArray = Object.entries(advertisements ?? {}).map(([key, value]) => {
//     return { id: key, ...value };
//   });
//   // Сортируем массив по убыванию даты создания
//   advertisementsArray.sort((a, b) => b.createdAt - a.createdAt);
//   return advertisementsArray; // Теперь массив отсортирован по дате создания
// };

// function Pagemain() {
// const [showMap, setShowMap] = useState(false);
// const {loggedInUser, login, logout } = useAuth();
// const [categories, setCategories] = useState([]);
// const [advertisements, setAdvertisements] = useState([]);
// const navigate = useNavigate();
// const [isDropdownVisible, setIsDropdownVisible] = useState(false);
// const [searchQuery, setSearchQuery] = useState(''); // Состояние для хранения поискового запроса

// const handleAdressClick = () => {
//   setShowMap(prevShowMap => !prevShowMap); // Переключает состояние карты
// };


// // Функция для поиска объявлений
// const searchAdvertisements = async (query) => {
//   const advertisementsRef = ref(db, '/advertisment');
//   const snapshot = await get(advertisementsRef);
//   const advertisements = snapshot.val();
//   // Фильтрация объявлений по введенным словам
//   const filteredAdvertisements = Object.entries(advertisements ?? {}).filter(([key, value]) => {
//     return value.title.toLowerCase().includes(query.toLowerCase()) || value.description.toLowerCase().includes(query.toLowerCase())|| value.place.toLowerCase().includes(query.toLowerCase());
//   }).map(([key, value]) => {
//     return { id: key, ...value };
//   });
//   setAdvertisements(filteredAdvertisements); // Обновление состояния объявлений
// };

// // Обработчик событий для кнопки поиска
// const handleSearchClick = () => {
//   searchAdvertisements(searchQuery); // Вызов функции поиска с текущим запросом
// };

// useEffect(() => {
// const fetchCategories = async () => {
// const categoriesData = await getCategories();
// console.log(categoriesData); // Добавьте это для проверки загруженных данных
// setCategories(categoriesData);
// }

// fetchCategories();

//  // Получение объявлений...
//   const fetchAdvertisements = async () => {
//     const advertisementsData = await getLastAdvertisements();
//     setAdvertisements(advertisementsData);
//   };
//     fetchAdvertisements();

// }, []);

// // Функция для перехода на страницу категории с выбранной категорией
// const handleCategoryChange = (e) => {
//   const selectedCategory = e.target.value;
//   navigate(`/category/${selectedCategory}`);
// };

// // Обработчики событий
// const handleFoundClick = () => {
// navigate('/found');
// };

// const handleLostClick = () => {
// navigate('/lost');
// };

// const handleCreateAddClick = () => {
//   if (!loggedInUser) {
//     alert('Пожалуйста, войдите в систему, чтобы создать объявление.');
//     navigate('/login');
//   } else {
//     navigate('/createadd');
//   }
// };

// const handleEnterClick = () => {
// navigate('/login');
// };

// return (
// <div className="main_page">
// <p className="name">Потеряно <br/> найдено</p>
// {loggedInUser ? (
// <p className='login_user'>{loggedInUser}</p> // Отображаем логин пользователя
// ) : (
// <button onClick={handleEnterClick} className="button_enter">Вход</button> // Кнопка для входа
// )}
// <button onClick={handleCreateAddClick} className="button_create_ad"> Создать объявление</button>
// <div className="main_part">
// <img src={imgadress} width={80} height={60} className="imgadress" onClick={handleAdressClick} />
//       {showMap && <AdvertisementsMap advertisements={advertisements} />}
// <button className='lost' id="Lost" onClick={handleLostClick}>Потеряно</button>
// <button className = 'found' id="Found" onClick={handleFoundClick}>Найдено</button>
// <div className='category' > 
// <select onChange={handleCategoryChange}>
//         {categories.map(category => (
//           <option key={category.id} value={category.name}>{category.name}</option>
//         ))}
//       </select>
// <p className='category-name'>Категории</p> 
// </div>
// <div className="search_block"></div>
// <img src={imgsearch} width={80} height={60} className="imgsearch" />
// <input className="search" placeholder='Введите ваш запрос' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
// <button onClick={handleSearchClick} className="button_search">Поиск</button>
// </div>
// <div>
// <p className='ad'>Новые объявления</p>
// <div className="container-ad">
//         {advertisements.map((item) => (
//           <Card key={item.id} {...item} />
//         ))}
//       </div>
// </div>
// </div>
// );
// }

// export default Pagemain;


import { db } from '../index';
import {ref, get, query, limitToLast } from 'firebase/database';
import './mainpage.css';
import React, {useState, useEffect, useContext} from 'react';
import imgsearch from "../img/Search.svg"
import imgadress from "../img/Adress.svg"
import { useNavigate, Link } from 'react-router-dom';
import Card from './Card';
import { useAuth } from '../App';
import AdvertisementsMap from './YandexMap'

const getCategories = async () => {
const categoryRef = ref(db, '/category');
const snapshot = await get(categoryRef);
const categories = snapshot.val();
// Преобразование объекта категорий в массив пар [ключ, значение]
const categoryArray = Object.entries(categories).map(([Key, Value]) => {
return { id: Key, name: Value };
});
return categoryArray;
}

// Функция для получения последних объявлений
const getLastAdvertisements = async () => {
  const advertisementsRef = ref(db, '/advertisment');
  const lastAdvertisementsQuery = query(advertisementsRef, limitToLast(3));
  const snapshot = await get(lastAdvertisementsQuery);
  const advertisements = snapshot.val();
  // Преобразование объекта объявлений в массив и сортировка по дате создания
  const advertisementsArray = Object.entries(advertisements ?? {}).map(([key, value]) => {
    return { id: key, ...value };
  });
  // Сортируем массив по убыванию даты создания
  advertisementsArray.sort((a, b) => b.createdAt - a.createdAt);
  return advertisementsArray; // Теперь массив отсортирован по дате создания
};

function Pagemain() {
const [showMap, setShowMap] = useState(false);
const {loggedInUser, login, logout } = useAuth();
const [categories, setCategories] = useState([]);
const [advertisements, setAdvertisements] = useState([]);
const navigate = useNavigate();
const [isDropdownVisible, setIsDropdownVisible] = useState(false);
const [searchQuery, setSearchQuery] = useState(''); // Состояние для хранения поискового запроса

const handleAdressClick = () => {
  setShowMap(prevShowMap => !prevShowMap); // Переключает состояние карты
};


// Функция для поиска объявлений
const searchAdvertisements = async (query) => {
  const advertisementsRef = ref(db, '/advertisment');
  const snapshot = await get(advertisementsRef);
  const advertisements = snapshot.val();
  // Фильтрация объявлений по введенным словам
  const filteredAdvertisements = Object.entries(advertisements ?? {}).filter(([key, value]) => {
    return value.title.toLowerCase().includes(query.toLowerCase()) || value.description.toLowerCase().includes(query.toLowerCase())|| value.place.toLowerCase().includes(query.toLowerCase());
  }).map(([key, value]) => {
    return { id: key, ...value };
  });
  setAdvertisements(filteredAdvertisements); // Обновление состояния объявлений
};

// Обработчик событий для кнопки поиска
const handleSearchClick = () => {
  searchAdvertisements(searchQuery); // Вызов функции поиска с текущим запросом
};

useEffect(() => {
const fetchCategories = async () => {
const categoriesData = await getCategories();
console.log(categoriesData); // Добавьте это для проверки загруженных данных
setCategories(categoriesData);
}

fetchCategories();

 // Получение объявлений...
  const fetchAdvertisements = async () => {
    const advertisementsData = await getLastAdvertisements();
    setAdvertisements(advertisementsData);
  };
    fetchAdvertisements();

}, []);

// Функция для перехода на страницу категории с выбранной категорией
const handleCategoryChange = (e) => {
  const selectedCategory = e.target.value;
  navigate(`/category/${selectedCategory}`);
};

// Обработчики событий
const handleFoundClick = () => {
navigate('/found');
};

const handleLostClick = () => {
navigate('/lost');
};

const handleCreateAddClick = () => {
  if (!loggedInUser) {
    alert('Пожалуйста, войдите в систему, чтобы создать объявление.');
    navigate('/login');
  } else {
    navigate('/createadd');
  }
};

const handleEnterClick = () => {
navigate('/login');
};

return (
<div className="main_page">
<p className="name">Потеряно <br/> найдено</p>
{loggedInUser ? (
<Link to="/profile" className='login_user'>{loggedInUser}</Link>// Отображаем логин пользователя
) : (
<button onClick={handleEnterClick} className="button_enter">Вход</button> // Кнопка для входа
)}
<button onClick={handleCreateAddClick} className="button_create_ad"> Создать объявление</button>
<div className="main_part">
<img src={imgadress} width={80} height={60} className="imgadress" onClick={handleAdressClick} />
      {showMap && <AdvertisementsMap advertisements={advertisements} />}
<button className='lost' id="Lost" onClick={handleLostClick}>Потеряно</button>
<button className = 'found' id="Found" onClick={handleFoundClick}>Найдено</button>
<div className='category' > 
<select onChange={handleCategoryChange}>
        {categories.map(category => (
          <option key={category.id} value={category.name}>{category.name}</option>
        ))}
      </select>
<p className='category-name'>Категории</p> 
</div>
<div className="search_block"></div>
<img src={imgsearch} width={80} height={60} className="imgsearch" />
<input className="search" placeholder='Введите ваш запрос' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
<button onClick={handleSearchClick} className="button_search">Поиск</button>
</div>
<div>
<p className='ad'>Новые объявления</p>
<div className="container-ad">
        {advertisements.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
</div>
</div>
);
}

export default Pagemain;
