import localforage from 'localforage';

async function setup(selectedDriver) {
  const drivers = {
    WebSQL: localforage.WEBSQL,
    IndexedDB: localforage.INDEXEDDB,
    localStorage: localforage.LOCALSTORAGE,
  };

  localforage.config({
    driver: drivers[selectedDriver],
  });
  console.log(drivers[selectedDriver])
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
