export const registerServiceWorker = () => {
  function register() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }
  window.addEventListener('load', register, { once: true });
};
