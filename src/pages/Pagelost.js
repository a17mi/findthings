import './lostfound.css';
import React, { useState, useEffect } from 'react';
import { db } from '../index';
import Card from './Card'; 


const ITEMS_PER_PAGE = 6;

const Pagelost = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const snapshot = await db.ref('advertisment').orderByChild('status').equalTo('lost').once('value');
    const data = snapshot.val() || {};
    const foundItems = Object.entries(data).map(([id, value]) => ({ id, ...value }));
    setItems(foundItems);
    setLoading(false);
  };

  const performSearch = async () => {
    setLoading(true);
    const snapshot = await db.ref('advertisment')
      .orderByChild('status').equalTo('lost')
      .once('value');
    const data = snapshot.val() || {};
    const searchLower = search.toLowerCase();
    const foundItems = Object.entries(data)
      .map(([id, value]) => ({ id, ...value }))
      .filter(({ title, description, place }) =>
        title.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower) ||
        place.toLowerCase().includes(searchLower)
      );
    setItems(foundItems);
    setCurrentPage(1);
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  // Вычисляем количество страниц
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  // Получаем элементы для текущей страницы
  const currentItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Функция для перехода на следующую страницу
  const goToNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <p className="name">Потеряно <br/> найдено</p>
      <div className="search_block_mini"></div>
      <input
        className="search-mini"
        placeholder='Поиск'
        value={search}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
            <p className='things'>Утерянные вещи</p>
      <div className="container">
        {currentItems.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="pagination">
          <button  onClick={goToPreviousPage} disabled={currentPage === 1}>
            Назад
          </button>
          <span>Страница {currentPage} из {pageCount}</span>
          <button   onClick={goToNextPage} disabled={currentPage === pageCount}>
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagelost;

