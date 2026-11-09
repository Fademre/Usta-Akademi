/* Usta Akademi service worker — version e428b47200 */
const CACHE='usta-e428b47200';
const FILES=["./", "index.html", "manifest.webmanifest", "fonts/fonts.css", "fonts/10d6a582947e.woff2", "fonts/16db5cbe6178.woff2", "fonts/3b58e8bdf772.woff2", "fonts/7471c0c20c13.woff2", "fonts/f96cbbc03519.woff2", "audio/ar.json", "audio/de.json", "audio/en.json", "audio/es.json", "audio/fr.json", "audio/it.json", "audio/ko.json", "audio/nl.json", "audio/pt.json", "audio/ru.json", "audio/tr.json", "audio/zh.json", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(r=>{
  if(r.ok&&new URL(e.request.url).origin===location.origin){const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}return r;
 }).catch(()=>caches.match('index.html'))));
});
