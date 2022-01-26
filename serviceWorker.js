const staticchaTinco = "chaTinco-site-v1";
const assets = [
  "./",
  "index.html",
  "chat.html",
  "qrgen.html",
  "qrscan.html",
  "css/style.css",
  "css/nav.css",
  "css/table.css",
  "app.js"
];

self.addEventListener("install", installEvent => {
  caches.delete(staticchaTinco)
  console.log("Installing Service Worker")
  installEvent.waitUntil(
    caches.open(staticchaTinco).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});

self.addEventListener("activate", activateEvent => {
  console.log("Activating Service Worker")
  activateEvent.waitUntil(
      caches.keys().then(keys => {
          return Promise.all(
              keys
                  .filter(key => key !== staticchaTinco && key.includes("static"))
                  .map(key => caches.delete(key))
          )
      })
  )
  // localStorage.clear();
});