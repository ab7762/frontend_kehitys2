/*
Websocket -protokolla luo kaksisuuntaisen reaaliaikaisen yhteyden
palvelimen ja asiakkaan välille. Se on siis kommunikaatioprotokolla
joka sopii paremmin reaaliaikasovelluksiin kuin http -protokolla.

Tässä luodaan ws-kirjastolla (https://www.npmjs.com/package/ws)
yksinkertainen websocket-serveri. Serveri arpoo lämpötilan
joka lähetetään socket -protokollalla Angular -clientille.
Lämpötiloista voisi piirtää ajan funktiona reaaliaikaisen viivadiagrammin
Angularin templaattiin.

Tämä serveri ainostaan lähettää dataa, eikä vastaanota mitään dataa clientilta.

Käynnistys: npm start tai node server

Websocket API: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

*/

const WebSocket = require('ws'); // WebSocket -luokka

const wss = new WebSocket.Server({ port: 8085 }); // Serverin luonti
console.log('WebSocket-serveri portissa 8085');

let temp = 20; // alkulämpötila

// avataan websocket-yhteys
// callbackin parametrina ws-olio
wss.on('connection', function(ws) {

    setInterval(() => {

        // lämpötilan muutos sijoitetaan edellisen lämpötilan päälle 3s välein
        temp += (Math.random() - 0.49);
        // Lähetetään lämpötila ws-oliolla string-muodossa
        ws.send(temp.toString());

    }, 3000); // lähtee kolmen sekunnin välein
});