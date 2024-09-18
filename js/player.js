class Player {
    constructor(x, y, imageSrc) {
        this.x = x; // Spielerposition auf der Karte
        this.y = y;
        this.image = new Image();
        this.image.src = imageSrc; // Quelle des Spritesheets
        this.frameWidth = 0; // Breite eines Frames (wird später festgelegt)
        this.frameHeight = 0; // Höhe eines Frames (wird später festgelegt)
        this.width = 48; // Breite des Spielers
        this.height = 48; // Höhe des Spielers
    }

    draw(ctx, canvasWidth, canvasHeight) {
        // Festlegen der Frame-Größe, wenn das Bild geladen ist
        if (this.image.width > 0 && this.image.height > 0) {
            this.frameWidth = this.image.width / 4;  // Breite eines Sprites (1/4 der Gesamtbreite)
            this.frameHeight = this.image.height;    // Höhe eines Sprites
        }

        // Zeichne den ersten Sprite (Ausschnitt) des Spritesheets
        ctx.drawImage(
            this.image,
            0, 0, // Startpunkt des Ausschnitts (erste Figur)
            this.frameWidth, this.frameHeight, // Breite und Höhe des Ausschnitts
            canvasWidth / 2 - (this.frameWidth / 4) / 2, // X-Position auf dem Canvas
            canvasHeight / 2 - this.frameHeight / 2, // Y-Position auf dem Canvas
            this.frameWidth, // Zeichengröße: Breite
            this.frameHeight // Zeichengröße: Höhe
        );
    }
}

// Exportiere die Player-Klasse
export default Player;