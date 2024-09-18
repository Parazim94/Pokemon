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
const player = new Player(300, 300, './images/character-pictures/playerDown.png');
const gameMap = new GameMap('./images/map-pictures/Pellet Town.png', -620, -800);

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

// Kollisionserkennung
function checkCollision(player, boundary) {
    return (
        player.x < boundary.x + boundary.width &&
        player.x + player.width > boundary.x &&
        player.y < boundary.y + boundary.height &&
        player.y + player.height > boundary.y
    );
}
// Zeichen- und Aktualisierungsfunktion (Game Loop)
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen

    const speed = 2;
    let playerMoved = false; // Flag, um zu sehen, ob der Spieler sich bewegt hat
    let previousX = player.x; // Speichere vorherige Position des Spielers
    let previousY = player.y;

    // Bewegung basierend auf Tastendrücken
    if (keys.w) {
        player.y -= speed;
        gameMap.offsetY += speed;
        playerMoved = true;
    }
    if (keys.s) {
        player.y += speed;
        gameMap.offsetY -= speed;
        playerMoved = true;
    }
    if (keys.a) {
        player.x -= speed;
        gameMap.offsetX += speed;
        playerMoved = true;
    }
    if (keys.d) {
        player.x += speed;
        gameMap.offsetX -= speed;
        playerMoved = true;
    }

    // Kollisionserkennung nach der Bewegung
    if (playerMoved) {
        let collisionDetected = false;
        boundaries.forEach(boundary => {
            if (checkCollision(player, boundary)) {
                console.log('Kollision erkannt mit Boundary:', boundary);
                collisionDetected = true;
            }
        });

        // Wenn eine Kollision erkannt wurde, setzen wir die Bewegung zurück
        if (collisionDetected) {
            player.x = previousX;
            player.y = previousY;
            gameMap.offsetX = -previousX + canvas.width / 2; // Passe das Offset an, damit es zur neuen Position passt
            gameMap.offsetY = -previousY + canvas.height / 2;
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