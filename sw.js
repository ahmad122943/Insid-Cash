const V="pos-v1",FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||!r.url.startsWith(self.registration.scope))return;
e.respondWith(caches.open(V).then(c=>c.match(r,{ignoreSearch:true}).then(m=>{const n=fetch(r).then(x=>{if(x&&x.ok)c.put(r,x.clone());return x}).catch(()=>m);return m||n})))});
