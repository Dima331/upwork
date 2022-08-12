import Modal from './modules/modal';

const modalFormElement = document.querySelector('.modal-form');

if (modalFormElement) {
  const modalForm = new Modal(modalFormElement);

  contactsButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();

    modalForm.show();
  });
}
