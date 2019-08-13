import React from 'react';
import '../styles/header.scss';

export default function Header() {
  return (
    <div className="header">
      <h1 className="header__title">Browser storage benchmark</h1>
      <h2 className="header__subtitle">
        App designed to test performance of different persistent storage
        providers in web browsers: localstorage, IndexedDB and WebSQL.
      </h2>
    </div>
  );
}
