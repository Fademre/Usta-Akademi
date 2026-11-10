/* Usta Akademi service worker — v2.9 */
const CHARS='usta-chars-1';
const CACHE='usta-8f11d0e5';
const FILES=["./", "vendor/three-min.js", "index.html", "manifest.webmanifest", "fonts/fonts.css", "fonts/10d6a582947e.woff2", "fonts/16db5cbe6178.woff2", "fonts/3b58e8bdf772.woff2", "fonts/7471c0c20c13.woff2", "fonts/f96cbbc03519.woff2", "icons/apple-touch-icon.png", "icons/favicon-32.png", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&k!==CHARS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const req=e.request;if(req.method!=='GET')return;
 const url=new URL(req.url);if(url.origin!==location.origin)return;
 if(url.pathname.endsWith('/version.json')){e.respondWith(fetch(req,{cache:'no-store'}));return;}
 const isPage=req.mode==='navigate'||url.pathname.endsWith('/index.html')||url.pathname.endsWith('/');
 if(isPage){
  // network first: always show the newest version when online, cached copy when offline
  e.respondWith(fetch(req,{cache:'no-store'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(CACHE).then(c=>c.put('index.html',cp));}return r;}).catch(()=>caches.match('index.html')));
  return;
 }
 const store=url.pathname.includes('/chars/')?CHARS:CACHE;
 e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(r=>{if(r.ok){const cp=r.clone();caches.open(store).then(c=>c.put(req,cp));}return r;})));
});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{for(const c of cs){if('focus' in c)return c.focus();}return self.clients.openWindow('./');}));});
