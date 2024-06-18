import './lostfound.css';
import React, { useState, useEffect } from 'react';
import { db } from '../index';
import Card from './Card'; 
import { useParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

const Pagecategory = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    fetchData();
  }, [category]);

  
  const fetchData = async () => {
    setLoading(true);
    const snapshot = await db.ref('advertisment').orderByChild('category').equalTo(category).once('value');
    const data = snapshot.val() || {};
    const categoryItems = Object.entries(data).map(([id, value]) => ({ id, ...value }));
    setItems(categoryItems);
    setLoading(false);
  };

  const performSearch = async () => {
    setLoading(true);
    const snapshot = await db.ref('advertisment')
      .orderByChild('category').equalTo(category)
      .once('value');
    const data = snapshot.val() || {};
    const searchLower = search.toLowerCase();
    const categoryItems = Object.entries(data)
      .map(([id, value]) => ({ id, ...value }))
      .filter(({ title, description, place }) =>
        title.toLowerCase().includes(searchLower) ||
        description.toLowerCase().includes(searchLower) ||
        place.toLowerCase().includes(searchLower)
      );
    setItems(categoryItems);
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
            <p className='things'>{category}</p>
      <div className="container">
        {currentItems.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
      {pageCount > 1 && (
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Назад
          </button>
          <span>Страница {currentPage} из {pageCount}</span>
          <button onClick={goToNextPage} disabled={currentPage === pageCount}>
            Вперед
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagecategory;
