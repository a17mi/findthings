import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { storage } from '../index'; 
import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const mapState = {
  center: [59.938784, 30.314997], // координаты центра карты
  zoom: 7,
};

const AdvertisementsMap = ({ advertisements }) => {
  const [updatedAds, setUpdatedAds] = useState([]); // Добавлено состояние для обновленных объявлений

  // Функция для определения цвета метки в зависимости от статуса
  const getPlacemarkOptions = (status) => {
    return {
      preset: status === 'lost' ? 'islands#redIcon' : 'islands#greenIcon',
    };
  };

  const onPlacemarkClick = (e) => {
    const placemark = e.get('target');
    if (placemark && placemark.balloon) {
      placemark.balloon.open();
    }
  };

  useEffect(() => {
    const updateImageURLs = async () => {
      const updatedAdvertisements = await Promise.all(advertisements.map(async (ad) => {
        if (typeof ad.imageURL === 'string' && ad.imageURL) {
          const imageRef = storageRef(storage, `images/${ad.imageURL}`);
          const url = await getDownloadURL(imageRef);
          return { ...ad, imageURL: url };
        }
        return ad;
      }));
      setUpdatedAds(updatedAdvertisements);
    };
  
    updateImageURLs();
  }, [advertisements]);

  return (
    <YMaps query={{ apikey: '2dc34bad-7fa8-4904-84ee-f3d906ba136d' }}>
      <Map defaultState={mapState} width="400px" height="200px" className="ymap-container">
        {updatedAds.map(ad => ( 
          <Placemark
            key={ad.id}
            geometry={ad.coordinates}
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
            properties={{
              balloonContent: `<strong>${ad.title}</strong><br><img src='${ad.imageURL}'/>`,
            }}
            options={getPlacemarkOptions(ad.status)}
            onClick={onPlacemarkClick}
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default AdvertisementsMap;