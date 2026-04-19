const CACHE_NAME = 'karta-wzorow-clean-v2';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './splash.jpg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './images/drgania_fale_mechaniczne_i_swietlne.png',
  './images/dynamika.png',
  './images/elektrostatyka.png',
  './images/elementy_fizyki_atomowej_i_jadrowej.png',
  './images/elementy_mechaniki_relatywistycznej.png',
  './images/grawitacja_i_elementy_astronomii.png',
  './images/hydrostatyka_aerostatyka.png',
  './images/kinematyka.png',
  './images/magnetyzm.png',
  './images/optyka_geometryczna.png',
  './images/podstawowe_jednostki_ukladu_si.png',
  './images/prad_elektryczny.png',
  './images/przedrostki_jednostek_miar.png',
  './images/sily_tarcia_i_sila_sprezystosci.png',
  './images/termodynamika.png',
  './images/wartosci_wybranych_jednostek_spoza_ukladu_si.png',
  './images/wartosci_wybranych_stalych_fizycznych.png',
  './images/wybrane_stale_i_parametry_astrofizyczne.png',
  './images/wybrane_zaleznosci.png',
  './images/uklad_okresowy_pierwiastkow.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
