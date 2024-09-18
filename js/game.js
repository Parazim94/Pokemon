// js/game.js
import Player from './player.js'; // Importiere die Player-Klasse
import GameMap from './map.js';   // Importiere die GameMap-Klasse

// Spiel-Canvas und Kontext initialisieren
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Setze eine feste Canvas-Größe
canvas.width = 1024;  // Feste Breite des Canvas
canvas.height = 576;  // Feste Höhe des Canvas

// Spieler und Karte initialisieren
const player = new Player(800, 600, './images/character-pictures/playerDown.png');
const gameMap = new GameMap('./images/map-pictures/zoom-map2.png', -660, -1300);

// Bewegung des Spielers
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
};

// Spielerbewegung abfangen
window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = false;
    }
});

// Zeichen- und Aktualisierungsfunktion (Game Loop)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen
    ctx.fillStyle = 'white'; // Hintergrundfarbe setzen
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Hintergrund zeichnen

    const speed = 4;

    // Bewegung basierend auf Tastendrücken
    if (keys.w) {
        player.y -= speed;
        gameMap.offsetY += speed;
    }
    if (keys.s) {
        player.y += speed;
        gameMap.offsetY -= speed;
    }
    if (keys.a) {
        player.x -= speed;
        gameMap.offsetX += speed;
    }
    if (keys.d) {
        player.x += speed;
        gameMap.offsetX -= speed;
    }

    // Karte und Spieler zeichnen
    gameMap.draw(ctx);
    player.draw(ctx, canvas.width, canvas.height);

    // Nächsten Frame anfordern
    requestAnimationFrame(animate);
}

// Karte und Spieler zeichnen, sobald beide Bilder geladen sind
player.image.onload = gameMap.image.onload = function() {
    animate(); // Starte die Animation
};
