import './card.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 
import React, { useContext } from 'react';

const Card = ({ id, imageUrl, title, date, time, category, place }) => {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);

  const handleDetailsClick = () => {
    // Проверяем, вошел ли пользователь в систему
    if (loggedInUser) {
      // Если пользователь вошел, перенаправляем на страницу с подробностями
      navigate(`/pageadd/${id}`);
    } else {
      // Если пользователь не вошел, выводим сообщение
      alert('Пожалуйста, войдите в систему для просмотра объявления.');
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <img src={imageUrl} width={100} height={80} />
        <h3>{title}</h3>
      </div>
      <p>{date} {time}</p>
      <p>Категория: {category}</p>
      <p>Место: {place}</p>
      <button onClick={handleDetailsClick}>Подробнее</button>
    </div>
  );
};

export default Card;