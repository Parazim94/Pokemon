import Player from './player.js'; // Importiere die Player-Klasse
import GameMap from './map.js';   // Importiere die GameMap-Klasse

// Spiel-Canvas und Kontext initialisieren
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;  // Breite des Spiels
canvas.height = window.innerHeight; // Höhe des Spiels

// Spieler und Karte initialisieren
const player = new Player(400, 400, './images/character-pictures/playerDown.png');
const gameMap = new GameMap('./images/map-pictures/zoom-map.png', -700, -1200);

// Zeichenfunktion für das Spiel
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen
    gameMap.draw(ctx); // Karte zeichnen
    player.draw(ctx, canvas.width, canvas.height); // Spieler zeichnen
}

// Fenstergrößenänderung abfangen
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});

// Spielerbewegung abfangen
window.addEventListener('keydown', (e) => {
    const speed = 8; // Bewegungsgeschwindigkeit
    let moved = false;

    switch (e.key) {
        case 'ArrowUp':
            player.y -= speed;
            gameMap.updateOffset('up', speed);
            moved = true;
            break;
        case 'ArrowDown':
            player.y += speed;
            gameMap.updateOffset('down', speed);
            moved = true;
            break;
        case 'ArrowLeft':
            player.x -= speed;
            gameMap.updateOffset('left', speed);
            moved = true;
            break;
        case 'ArrowRight':
            player.x += speed;
            gameMap.updateOffset('right', speed);
            moved = true;
            break;
    }

    if (moved) {
        draw(); // Neuzeichnen, nachdem der Spieler bewegt wurde
    }
});

// Karte und Spieler zeichnen, sobald alle Bilder geladen sind
player.image.onload = gameMap.image.onload = function() {
    draw();
};
