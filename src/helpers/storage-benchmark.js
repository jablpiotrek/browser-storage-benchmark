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
  // Prepare data
  const data = prepareData(size, number);

  // Setup storage provider
  await setup(driver);

  // Get test start time
  const startTime = Date.now();

  // Confirm proper storage init
  await localforage.setItem('start', true);
  const initialTest = await localforage.getItem('start');
  if (!initialTest) {
    throw new Error('Storage initial test failed');
  }

  // Test loop
  data.forEach(async (item) => {
    await localforage.setItem(item.key, item.data);
    const temp = await localforage.getItem(item.key);
    if (temp !== item.data) {
      throw new Error('Data retrieved form storage does not match data wrote!');
    }
  });

  // Final tets - confirm that storage is available
  await localforage.setItem('end', true);
  const finalTest = await localforage.getItem('end');
  if (!finalTest) {
    throw new Error('Storage final test failed');
  }

  // Record test end time
  const endTime = Date.now();

  // Push results
  const result = endTime - startTime;
  return {
    size,
    number,
    driver,
    result,
  };
}
