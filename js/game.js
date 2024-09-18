import Player from './player.js'; // Importiere die Player-Klasse
import GameMap from './map.js';   // Importiere die GameMap-Klasse
import { collisionMap, Boundary } from '/data/collisions.js'; // Importiere die Kollisionskarte und Boundary-Klasse

// Spiel-Canvas und Kontext initialisieren
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Setze eine feste Canvas-Größe
canvas.width = 1024;  // Feste Breite des Canvas
canvas.height = 576;  // Feste Höhe des Canvas

console.log(collisionMap);

// Spieler und Karte initialisieren
const player = new Player(400, 300, './images/character-pictures/playerDown.png');
const gameMap = new GameMap('./images/map-pictures/Pellet Town.png', -720, -600);

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

// Kollisionsgrenzen erstellen
const boundaries = [];
const tileSize = 48; // Die Größe eines Tiles beträgt 48x48 Pixel
collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol !== 0) {
            boundaries.push(new Boundary(j * tileSize, i * tileSize));
        }
    });
});

console.log('Boundaries:', boundaries);

function checkCollision(player, boundary) {
    return (
        player.x < boundary.x + boundary.width + gameMap.offsetX &&
        player.x + player.width > boundary.x + gameMap.offsetX &&
        player.y < boundary.y + boundary.height + gameMap.offsetY &&
        player.y + player.height > boundary.y + gameMap.offsetY
    );
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen

    const speed = 2;
    let moving = true;

    // Kollisionserkennung vor der Bewegung
    boundaries.forEach(boundary => {
        if (checkCollision(player, boundary)) {
            console.log('Kollision erkannt mit Boundary:', boundary);
            moving = false;
        }
    });

    // Bewegung basierend auf Tastendrücken, nur wenn keine Kollision erkannt wurde
    if (moving) {
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
    }

    // Karte und Spieler zeichnen
    gameMap.draw(ctx);
    player.draw(ctx, canvas.width, canvas.height);

    // Kollisionsgrenzen zeichnen (optional, zum Debuggen)
    boundaries.forEach(boundary => boundary.draw(ctx, gameMap.offsetX, gameMap.offsetY));

    // Nächsten Frame anfordern
    requestAnimationFrame(animate);
}

// Karte und Spieler zeichnen, sobald beide Bilder geladen sind
player.image.onload = gameMap.image.onload = function() {
    console.log('Bilder geladen, starte Animation');
    animate(); // Starte die Animation
};