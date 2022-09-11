import createElems from './createElems.js';
import {updateLocalStorage} from './storage.js';

const {
  createRow,
} = createElems;

const addRow = (table, item) => {
  const {row, task, phase, id, done, priority} = item;
  table.append(createRow(row, task, phase, id, done, priority));
};

const addChore = (newChore, userName, priority) => {
  const storage = localStorage.getItem(userName) ? JSON.parse(localStorage.getItem(userName)) : [];
  // eslint-disable-next-line max-len
  const newItem = {row: storage.length + 1, task: newChore, phase: 'В процессе', id: Math.random().toString().substring(2, 10), done: false, priority};

  storage.push(newItem);
  localStorage.setItem(userName, JSON.stringify(storage));
  console.log('localStorage: ', storage);

  return newItem;
};

const updateData = (form, userName, tbody) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const newChore = form.input.value;
    const priority = form.select.value;
    const newItem = addChore(newChore, userName, priority);

    addRow(tbody, newItem);
    form.input.value = '';
    form.select.selectedIndex = 0;
    form.saveBtn.classList.add('disabled');
  });

  form.addEventListener('reset', () => {
    form.saveBtn.classList.add('disabled');
  });
};

const markTask = (tbody, userName) => {
  tbody.addEventListener('click', ({target}) => {
    if (target.closest('.btn-success')) {
      const curRow = target.closest('tr');
      const id = +curRow.dataset.id;
      const task = curRow.querySelector('.task');
      const phase = curRow.querySelector('.phase');

      task.style.textDecoration = 'line-through';
      curRow.className = '';
      curRow.classList.add('table-success');

      phase.textContent = 'Выполнена';
      updateLocalStorage(userName, 'lineTrought', id);
    }

    if (target.closest('.btn-danger') && confirm('Точно хотите удалить?')) {
      const id = target.closest('tr').dataset.id;

      target.closest('tr').remove();

      const rowNums = tbody.querySelectorAll('.rowEl');
      for (let i = 0; i < rowNums.length; i++) {
        rowNums[i].textContent = i + 1;
      }

      updateLocalStorage(userName, 'del', id);
    }

    if (target.closest('.btn-primary')) {
      const curRow = target.closest('tr');
      const btn = curRow.querySelector('.btn-primary');
      console.log('btn: ', btn);
      const id = +curRow.dataset.id;
      const task = curRow.querySelector('.task');

      console.log('task: ', task);

      task.contentEditable = 'true';

      curRow.addEventListener('click', ({target}) => {
        console.log('target: ', target);
        if (!target.closest('.task')) {
          task.contentEditable = 'false';
          const textValue = task.textContent;
          updateLocalStorage(userName, 'edit', id, textValue);
        }
      });
    }
  });
};

const checkInput = (input, saveBtn) => {
  input.addEventListener('input', () => {
    if (input.value) {
      saveBtn.classList.remove('disabled');
    } else {
      saveBtn.classList.add('disabled');
    }
  });
};

export default {
  addRow,
  updateData,
  markTask,
  addChore,
  checkInput,
};
