const CACHE_NAME = 'karta-wzorow-v1.1';

const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './splash.jpg',

  './images/kinematyka.png',
  './images/dynamika.png',
  './images/sily_tarcia_i_sila_sprezystosci.png',
  './images/grawitacja_i_elementy_astronomii.png',
  './images/drgania_fale_mechaniczne_i_swietlne.png',
  './images/optyka_geometryczna.png',
  './images/hydrostatyka_aerostatyka.png',
  './images/termodynamika.png',
  './images/elektrostatyka.png',
  './images/prad_elektryczny.png',
  './images/magnetyzm.png',
  './images/elementy_mechaniki_relatywistycznej.png',
  './images/elementy_fizyki_atomowej_i_jadrowej.png',
  './images/wybrane_zaleznosci.png',
  './images/podstawowe_jednostki_ukladu_si.png',
  './images/przedrostki_jednostek_miar.png',
  './images/wartosci_wybranych_stalych_fizycznych.png',
  './images/wybrane_stale_i_parametry_astrofizyczne.png',
  './images/wartosci_wybranych_jednostek_spoza_ukladu_si.png',
  './images/uklad_okresowy_pierwiastkow.png'
];

// INSTALL
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).catch(() => {
        if (request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
