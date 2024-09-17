class Player {
    constructor(x, y, imageSrc) {
        this.x = x; // Spielerposition auf der Karte (nicht auf dem Canvas)
        this.y = y;
        this.image = new Image();
        this.image.src = imageSrc; // Quelle des Charakterbilds
    }

    draw(ctx, canvasWidth, canvasHeight) {
        // Zeichne den Spieler in der Mitte des Canvas
        ctx.drawImage(
            this.image,
            canvasWidth / 2 - this.image.width / 2,
            canvasHeight / 2 - this.image.height / 2
        );
    }
}

// Exportiere die Player-Klasse
export default Player;
