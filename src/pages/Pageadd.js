import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../index';
import './pageadd.css';

function Pageadd() {
  const { id } = useParams(); // Получаем id из URL
  const navigate = useNavigate();
  const [itemDetails, setItemDetails] = useState(null);
  const [contacts, setContacts] = useState('');
  const [showContacts, setShowContacts] = useState(false);

  // Функция для получения данных о вещи
  useEffect(() => {
    const fetchItemDetails = async () => {
      const itemRef = ref(db, `/advertisment/${id}`);
      const snapshot = await get(itemRef);
      if (snapshot.exists()) {
        setItemDetails(snapshot.val());
        setContacts(snapshot.val().contacts || 'Контактная информация отсутствует');
      } else {
        alert('Объявление не найдено');
        navigate(-1); // Возврат на предыдущую страницу
      }
    };

    fetchItemDetails();
  }, [id, navigate]);

 
  // Функция для возврата на предыдущую страницу
  const handleBackClick = () => {
    navigate(-1);
  };

 // Функция для обработки отклика на объявление
 const handleRespondClick = () => {
  // При нажатии на кнопку изменяем состояние на true, чтобы показать контакты
  setShowContacts(true);
};

  return (
    <div className="pageadd">
      {/* <p className="name">Потеряно <br/> найдено</p> */}
      {itemDetails ? (
        <>
          <img src={itemDetails.imageUrl} width={200} height={150} />
          <h1>{itemDetails.title}</h1>
          <p className='descr'>{itemDetails.description}</p>
          <p className='date-a'>Дата: {itemDetails.date}</p>
          <p className='time-a'>Время: {itemDetails.time}</p>
          <p className='place-a'>Место: {itemDetails.place}</p>
          {showContacts && (
            <p className='contacts-a'>Контакты: {itemDetails.contacts}</p>
          )}
          <button className='b-a'onClick={handleRespondClick}>Откликнуться</button>
          <button className='back'onClick={handleBackClick}>Назад</button>
        </>
      ) : (
        <p>Загрузка информации о вещи...</p>
      )}
    </div>
  );
}

export default Pageadd;