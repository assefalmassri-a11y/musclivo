// Musclivo service worker
// - يعرض الإشعارات (من الموقع ومن السيرفر) ويفتح التطبيق عند الضغط عليها
// - يحفظ نسخة من صفحات الموقع ليفتح بدون إنترنت. يجرّب الشبكة أولاً دائماً، فتظهر التحديثات مباشرة.
const CACHE = 'musclivo-v3';
const CORE = ['./', 'index.html', 'privacy.html', 'manifest.json', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('musclivo-') && k !== CACHE).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const same = u.origin === self.location.origin;
  const cdn = u.hostname === 'cdn.jsdelivr.net';
  if (!same && !cdn) return; // لا نخزّن طلبات Supabase أو Open Food Facts
  if (/\.mp4$/i.test(u.pathname) || r.headers.has('range')) return; // الفيديوهات ما بتنخزّن (كبيرة)
  e.respondWith(
    fetch(r).then((res) => {
      if (res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
        const cp = res.clone();
        caches.open(CACHE).then((c) => c.put(r, cp)).catch(() => {});
      }
      return res;
    }).catch(async () => {
      const m = await caches.match(r, { ignoreSearch: true });
      if (m) return m;
      if (r.mode === 'navigate') return (await caches.match('index.html')) || (await caches.match('./')) || Response.error();
      return Response.error();
    })
  );
});

self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { t: 'Musclivo', b: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.t || 'Musclivo', {
    body: d.b || '', tag: d.tag || 'musclivo', icon: 'icon-192.png', badge: 'icon-192.png', data: { url: './' },
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
    for (const c of cs) if ('focus' in c) return c.focus();
    return self.clients.openWindow('./');
  }));
});
