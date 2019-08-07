import localforage from 'localforage';

async function setup() {
  localforage.config({
    driver: localforage.WEBSQL,
  });
  await localforage.setItem('init', true);
}

export default async function storageBenchmark(size, number, driver) {
  await setup();
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
