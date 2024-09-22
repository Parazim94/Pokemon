import Player from "./player.js";
import GameMap from "./map.js";
import { collisionMap, Boundary } from "../data/collisions.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// Spieler und Karte initialisieren
const player = new Player({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  imageSrc: "./images/character-pictures/playerDown.png",
  frames: {
    max: 4,
  },
});
const gameMap = new GameMap(
  "./images/map-pictures/Pellet Town.png",
  "./images/map-pictures/foregroundObjects.png",
  -735,
  -650
);

const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

window.addEventListener("keydown", (e) => {
  if (keys.hasOwnProperty(e.key.toLowerCase())) {
    keys[e.key.toLowerCase()] = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (keys.hasOwnProperty(e.key.toLowerCase())) {
    keys[e.key.toLowerCase()] = false;
  }
});

// Kollisionsgrenzen erstellen
const boundaries = [];
collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + gameMap.offsetX,
            y: i * Boundary.height + gameMap.offsetY,
          },
        })
      );
    }
  });
});

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gameMap.draw(ctx); // Hintergrund zeichnen
  boundaries.forEach((boundary) => boundary.draw(ctx));
  player.draw(ctx);
  gameMap.drawForeground(ctx); // Vordergrund zeichnen

  let moving = true;
  if (keys.w) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y + 3 },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      boundaries.forEach((movable) => {
        movable.position.y += 3;
      });
      gameMap.offsetY += 3;
    }
  } else if (keys.a) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x + 3, y: boundary.position.y },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      boundaries.forEach((movable) => {
        movable.position.x += 3;
      });
      gameMap.offsetX += 3;
    }
  } else if (keys.s) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x, y: boundary.position.y - 3 },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      boundaries.forEach((movable) => {
        movable.position.y -= 3;
      });
      gameMap.offsetY -= 3;
    }
  } else if (keys.d) {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: { x: boundary.position.x - 3, y: boundary.position.y },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      boundaries.forEach((movable) => {
        movable.position.x -= 3;
      });
      gameMap.offsetX -= 3;
    }
  }

  requestAnimationFrame(animate);
}

animate();
