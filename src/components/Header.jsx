import React from 'react';

export default function Header() {
  return (
    <div className="header">
      <h1>Browser storage benchmark</h1>
      <h2>
        App designed to test performance of different persistent storage
        providers in web browsers: localstorage, IndexedDB and WebSQL.
      </h2>
    </div>
  );
}
