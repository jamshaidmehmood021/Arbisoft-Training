import '@testing-library/jest-dom';
import Modal from 'react-modal';

// Make sure to set the app element before running tests
Modal.setAppElement(document.createElement('div').setAttribute('id', 'root'));
