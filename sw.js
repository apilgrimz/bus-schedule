// 캐시 사용 안 함 — 항상 최신 파일 로드
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request, {cache: 'no-store'}).catch(() => new Response('')));
});
