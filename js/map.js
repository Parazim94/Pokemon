class GameMap {
    constructor(imageSrc, offsetX, offsetY) {
        this.offsetX = offsetX; // Startversatz der Karte
        this.offsetY = offsetY;
        this.image = new Image();
        this.image.src = imageSrc; // Quelle des Kartenbilds
    }

    draw(ctx) {
        // Zeichne die Karte basierend auf dem aktuellen Offset
        ctx.drawImage(this.image, this.offsetX, this.offsetY);
    }
}

// Exportiere die GameMap-Klasse
export default GameMap;
