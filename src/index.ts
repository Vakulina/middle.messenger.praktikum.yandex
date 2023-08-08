import renderPage from './services/myRenderPage';

const vh = window.innerHeight / 100;
document.documentElement.style.setProperty('--vh', `${vh}px`);

renderPage();
