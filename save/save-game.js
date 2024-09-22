// Spiel-Canvas und Kontext initialisieren
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;  // Breite des Spiels
canvas.height = window.innerHeight; // Höhe des Spiels

const mapImage = new Image();
mapImage.src = './images/map-pictures/zoom-map.png'; // Karte laden

const characterImage = new Image();
characterImage.src = './images/character-pictures/playerDown.png'; // Charakterbild laden

// Spielerposition auf der Karte (nicht auf dem Canvas)
let playerPosition = { x: 400, y: 400 }; // Anfangsposition des Charakters auf der Karte
let mapOffset = { x: -700, y: -1200 }; // Startversatz der Karte

// Bild zeichnen, sobald alle Bilder geladen sind
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas löschen
    ctx.drawImage(mapImage, mapOffset.x, mapOffset.y); // Karte zeichnen
    // Spieler auf dem Canvas zentrieren, basierend auf seiner Position
    ctx.drawImage(characterImage,
        canvas.width / 2 - characterImage.width / 2,
        canvas.height / 2 - characterImage.height / 2);
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
            playerPosition.y -= speed;
            mapOffset.y += speed;
            moved = true;
            break;
        case 'ArrowDown':
            playerPosition.y += speed;
            mapOffset.y -= speed;
            moved = true;
            break;
        case 'ArrowLeft':
            playerPosition.x -= speed;
            mapOffset.x += speed;
            moved = true;
            break;
        case 'ArrowRight':
            playerPosition.x += speed;
            mapOffset.x -= speed;
            moved = true;
            break;
    }

    if (moved) {
        draw(); // Neuzeichnen, nachdem der Spieler bewegt wurde
    }
});

// Karte und Spieler zeichnen, sobald alle Bilder geladen sind
mapImage.onload = characterImage.onload = function() {
    draw();
};