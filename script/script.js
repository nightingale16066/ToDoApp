import {render} from './modules/render.js';
import create from './modules/createElems.js';

const {createModal} = create;

const init = () => {
  const appContainer = document.querySelector('.app-container');

  appContainer.classList.add('vh-100', 'w-100', 'd-flex',
      'align-items-center', 'justify-content-center', 'flex-column');

  const {overlay} = createModal();
  appContainer.append(overlay);
  let userName;

  overlay.form.addEventListener('submit', (e) => {
    e.preventDefault();
    userName = overlay.input.value;
    overlay.style.display = 'none';
    render(userName, appContainer);
  });
};

init();
