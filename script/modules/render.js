import control from './control.js';
import createElems from './createElems.js';

const {
  updateData,
  markTask,
  checkInput,
} = control;

const {
  createHeader,
  createForm,
  createTable,
} = createElems;

export const render = (userName, app) => {
  const chores = JSON.parse(localStorage.getItem(userName));
  console.log('chores: ', chores);

  const header = createHeader();
  const form = createForm();
  const {tableWrapper, tbody} = createTable(chores);

  app.append(header, form, tableWrapper);

  checkInput(form.input, form.saveBtn);
  updateData(form, userName, tbody);
  markTask(tbody, userName);
};
