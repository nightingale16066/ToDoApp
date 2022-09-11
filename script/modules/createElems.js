const createHeader = () => {
  const header = document.createElement('h3');
  header.textContent = 'Todo App';

  return header;
};

const createOptions = () => {
  const tl = document.createElement('option');
  const tw = document.createElement('option');
  const td = document.createElement('option');

  tl.value = 'table-light';
  tl.textContent = 'обычная';

  tw.value = 'table-warning';
  tw.textContent = 'важная';

  td.value = 'table-danger';
  td.textContent = 'срочная';

  return {
    tl,
    tw,
    td,
  };
};

const createForm = () => {
  const form = document.createElement('form');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const select = document.createElement('select');
  console.dir(select);
  const {tl, tw, td} = createOptions();
  const saveBtn = document.createElement('button');
  const clearBtn = document.createElement('button');

  form.classList.add('d-flex', 'align-items-center', 'mb-3');

  label.classList.add('form-group', 'me-3', 'mb-0', 'w-100');

  input.classList.add('form-control');
  input.placeholder = 'ввести задачу';
  input.type = 'text';

  select.classList.add('form-select', 'me-2');
  select.ariaLabel = 'Default select example';
  select.append(tl, tw, td);

  saveBtn.classList.add('btn', 'btn-primary', 'me-3', 'disabled');
  saveBtn.textContent = 'Сохранить';
  saveBtn.type = 'submit';

  clearBtn.classList.add('btn', 'btn-warning');
  clearBtn.textContent = 'Очистить';
  clearBtn.type = 'reset';

  label.append(input);

  form.append(label, select, saveBtn, clearBtn);

  form.input = input;
  form.select = select;
  form.saveBtn = saveBtn;
  form.clearBtn = clearBtn;

  return form;
};

const createBtnGroup = () => {
  const delBtn = document.createElement('button');
  const endBtn = document.createElement('button');
  const editBtn = document.createElement('button');

  delBtn.classList.add('btn', 'btn-danger', 'me-1');
  delBtn.textContent = 'Удалить';

  endBtn.classList.add('btn', 'btn-success', 'me-1');
  endBtn.textContent = 'Завершить';

  editBtn.classList.add('btn', 'btn-primary');
  editBtn.textContent = 'Редактировать';

  return {
    delBtn,
    endBtn,
    editBtn,
  };
};

const createRow = (row, task, phase, id, done, priority) => {
  const tr = document.createElement('tr');
  const rowElem = document.createElement('td');
  const taskElem = document.createElement('td');
  const phaseElem = document.createElement('td');
  const btnContainer = document.createElement('td');

  const {delBtn, endBtn, editBtn} = createBtnGroup();

  done ? tr.classList.add('table-success') : tr.classList.add(priority);
  if (done) taskElem.style.textDecoration = 'line-through';

  btnContainer.append(delBtn, endBtn, editBtn);

  rowElem.textContent = row;
  rowElem.classList.add('rowEl');

  taskElem.classList.add('task');
  taskElem.textContent = task;

  phaseElem.textContent = phase;
  phaseElem.classList.add('phase');

  tr.dataset.id = id;
  tr.delBtn = delBtn;
  tr.endBtn = endBtn;

  tr.append(rowElem, taskElem, phaseElem, btnContainer);

  return tr;
};

const createTable = (taskList) => {
  const tableWrapper = document.createElement('div');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  tableWrapper.classList.add('table-wrapper');
  table.classList.add('table', 'table-hover', 'table-bordered');

  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  if (taskList) {
    taskList.forEach(({row, task, phase, id, done, priority}) => {
      console.log(row, task, phase);
      tbody.append(createRow(row, task, phase, id, done, priority));
    });
  }

  table.append(thead, tbody);
  tableWrapper.append(table);

  return {
    tableWrapper,
    tbody,
  };
};

const createModal = () => {
  const overlay = document.createElement('div');
  const header = document.createElement('h3');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');

  overlay.style.cssText = `
    padding: 0 15px;
  `;

  header.textContent = 'Для начала работы необходимо аворизоваться';
  header.classList.add('mb-3');

  form.classList.add('d-flex', 'align-items-center', 'justify-content-center');

  input.classList.add('form-control', 'me-2', 'w-50');
  input.placeholder = 'Введите свое имя';
  input.type = 'text';
  input.required = true;

  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Ввести';
  button.type = 'submit';

  form.append(input, button);
  overlay.append(header, form);

  overlay.form = form;
  overlay.input = input;

  return {
    overlay,
  };
};

export default {
  createHeader,
  createOptions,
  createForm,
  createBtnGroup,
  createRow,
  createTable,
  createModal,
};
