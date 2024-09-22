class GameMap {
    constructor(imageSrc, foregroundSrc, offsetX, offsetY) {
        this.offsetX = offsetX; // Startversatz der Karte
        this.offsetY = offsetY;
        this.image = new Image();
        this.image.src = imageSrc; // Quelle des Kartenbilds

        this.foregroundImage = new Image();
        this.foregroundImage.src = foregroundSrc; // Quelle des Vordergrundbilds
    }

    draw(ctx) {
        // Zeichne die Karte basierend auf dem aktuellen Offset
        ctx.drawImage(this.image, this.offsetX, this.offsetY);
    }

    drawForeground(ctx) {
        // Zeichne das Vordergrundbild basierend auf dem aktuellen Offset
        ctx.drawImage(this.foregroundImage, this.offsetX, this.offsetY);
    }
}

// Exportiere die GameMap-Klasse
export default GameMap;
