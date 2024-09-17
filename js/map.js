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

    updateOffset(direction, speed) {
        // Aktualisiere den Karten-Offset basierend auf der Spielerbewegung
        switch (direction) {
            case 'up':
                this.offsetY += speed;
                break;
            case 'down':
                this.offsetY -= speed;
                break;
            case 'left':
                this.offsetX += speed;
                break;
            case 'right':
                this.offsetX -= speed;
                break;
        }
    }
}

export default GameMap;
