class Player {
    constructor({ position, imageSrc, frames = { max: 1 }, sprites }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.sprites = sprites;
        this.moving = false;
        
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        };
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.frames.val * this.width, // Nutze den aktuellen Frame
            0,
            this.width, // Einzelner Frame des Spritesheets
            this.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        if (!this.moving) return;

        // Animation abspielen
        if (this.frames.max > 1) {
            this.frames.elapsed++;
        }
        if (this.frames.elapsed % 10 === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}


export default Player;
