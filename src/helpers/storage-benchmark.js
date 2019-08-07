import localforage from 'localforage';

async function setup(selectedDriver) {
  await localforage.clear();
  const drivers = {
    WebSQL: localforage.WEBSQL,
    IndexedDB: localforage.INDEXEDDB,
    localStorage: localforage.LOCALSTORAGE,
  };
  await localforage.setDriver(drivers[selectedDriver]);
  await localforage.setItem('init', true);
}

export default async function storageBenchmark(size, number, driver) {
  await setup(driver);
  const startTime = Date.now();
  await localforage.setItem('test', 'test');
  const endTime = Date.now();
  const result = endTime - startTime;
  return {
    size,
    number,
    driver,
    result,
  };
}
