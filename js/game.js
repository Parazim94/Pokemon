import Player from "./player.js";
import GameMap from "./map.js";
import { collisionMap, Boundary } from "../data/collisions.js";
import { battleZonesData } from "../data/battleZones.js"; // Importiere die battleZonesData

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
  sprites: {
    up: "./images/character-pictures/playerUp.png",
    down: "./images/character-pictures/playerDown.png",
    left: "./images/character-pictures/playerLeft.png",
    right: "./images/character-pictures/playerRight.png",
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

// Battle Zones erstellen
const battleZones = [];
const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, 70 + i));
}
battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025) {
      battleZones.push(
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

  gameMap.draw(ctx);
  boundaries.forEach((boundary) => boundary.draw(ctx));
  battleZones.forEach((battleZone) => battleZone.draw(ctx)); // Zeichne die Battle Zones
  player.draw(ctx);
  gameMap.drawForeground(ctx);

  // Battle Zone Kollisionsabfrage
  if (keys.w || keys.a || keys.s || keys.d) {
    for (let i = 0; i < battleZones.length; i++) {
      const battleZone = battleZones[i];
      const overlappingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));

      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        }) &&
        overlappingArea > (player.width * player.height) / 2 &&
        Math.random() < 0.01 // Wahrscheinlichkeit für den Kampf
      ) {
        console.log("Battle Zone Collision Detected");
        
        break;
      }
    }
  }

  let moving = true;
  player.moving = false;

  if (keys.w) {
    player.moving = true;
    player.image.src = player.sprites.up;
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
      battleZones.forEach((movable) => {
        movable.position.y += 3;
      });
      gameMap.offsetY += 3;
    }
  } else if (keys.a) {
    player.moving = true;
    player.image.src = player.sprites.left;
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
      battleZones.forEach((movable) => {
        movable.position.x += 3;
      });
      gameMap.offsetX += 3;
    }
  } else if (keys.s) {
    player.moving = true;
    player.image.src = player.sprites.down;
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
      battleZones.forEach((movable) => {
        movable.position.y -= 3;
      });
      gameMap.offsetY -= 3;
    }
  } else if (keys.d) {
    player.moving = true;
    player.image.src = player.sprites.right;
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
      battleZones.forEach((movable) => {
        movable.position.x -= 3;
      });
      gameMap.offsetX -= 3;
    }
  }

  requestAnimationFrame(animate);
}

animate();
