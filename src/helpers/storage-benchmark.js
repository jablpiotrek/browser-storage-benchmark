import localforage from 'localforage';
import randomstring from 'randomstring';


async function setup(selectedDriver) {
  await localforage.clear();
  const drivers = {
    WebSQL: localforage.WEBSQL,
    IndexedDB: localforage.INDEXEDDB,
    localStorage: localforage.LOCALSTORAGE,
  };
  await localforage.setDriver(drivers[selectedDriver]);
}

function prepareData(size, number) {
  const data = [];
  for (let i = 0; i < number; i += 1) {
    data.push({
      key: randomstring.generate(10),
      data: randomstring.generate(size),
    });
  }
  return data;
}

export default async function storageBenchmark(size, number, driver) {
  const data = prepareData(size, number);
  await setup(driver);
  const startTime = Date.now();
  await localforage.setItem('start', 'true');
  data.forEach(async (item) => {
    await localforage.setItem(item.key, item.data);
  });
  await localforage.setItem('end', 'true');
  const endTime = Date.now();
  const result = endTime - startTime;
  return {
    size,
    number,
    driver,
    result,
  };
}
