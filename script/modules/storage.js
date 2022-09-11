export const updateLocalStorage = (userName, purpose, id, task) => {
  const storage = JSON.parse(localStorage.getItem(userName));
  if (purpose === 'lineTrought') {
    storage.forEach(elem => {
      // eslint-disable-next-line eqeqeq
      if (+elem.id === +id) {
        elem.done = true;
        elem.phase = 'Выполнена';
      }
    });
    localStorage.setItem(userName, JSON.stringify(storage));
  }
  if (purpose === 'del') {
    const newStorage = storage
        .filter(elem => +elem.id !== +id);

    newStorage.forEach((item, index) => {
      item.row = index + 1;
    });

    console.log('newStorage: ', newStorage);
    localStorage.setItem(userName, JSON.stringify(newStorage));
  }
  if (purpose === 'edit') {
    storage.forEach(elem => {
      // eslint-disable-next-line eqeqeq
      if (+elem.id === +id) {
        elem.task = task;
      }
    });
    localStorage.setItem(userName, JSON.stringify(storage));
  }
};
