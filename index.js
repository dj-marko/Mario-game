const canvas = document.getElementById('c');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.5;
// wasd keys
const moveKeys = {
  left: 65,
  down: 83,
  right: 68,
  up: 87
}

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }

    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30
  }

  draw () {
    c.fillStyle = 'red';
    const { width, height, position} = this;
    const { x, y } = position
    c.fillRect(x, y , width, height);
  }

  update() {
    const { position, velocity} = this;
    this.draw();
    position.y += velocity.y;
    position.x += velocity.x;

    if (position.y + this.height + velocity.y < canvas.height ) {
      velocity.y += gravity;
    } else {
      velocity.y = 0;
    }
  }
}

class Platform {
  constructor() {
    this.position = {
      x: 200,
      y: 100
    }

    this.width = 200;
    this.height = 20;
  }

  draw () {
    c.fillStyle = 'gold';
    const { width, height, position} = this;
    const { x, y } = position
    c.fillRect(x, y , width, height);
  }
}

const player = new Player();
const platform = new Platform();

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0 , canvas.width, canvas.height);
  player.update();
  platform.draw();

  const { width, height, position } = player;
  if(keys.right.pressed) {
    player.velocity.x = 5;
  } else if(keys.left.pressed) {
    player.velocity.x = -5;
  } else{
    player.velocity.x = 0;
  }


  // collision detection y
  if(position.y + height <= platform.position.y &&
    position.y + height + player.velocity.y >= platform.position.y &&
    position.x + width >= platform.position.x &&
    position.x <= platform.position.x + platform.width
  ) {
    player.velocity.y = 0;
  }
}

animate();

addEventListener('keydown', ({ keyCode}) => {
  switch (keyCode) {
    case moveKeys.left: {
      keys.left.pressed = true;
      break
    }

    case moveKeys.right: {
      keys.right.pressed = true;
      break
    }

    case moveKeys.down: {
      console.log('down')
      player.velocity.y += 20;
      break
    }

    case moveKeys.up: {
      console.log('up')
      player.velocity.y -= 20;
      break
    }
  }
});

addEventListener('keyup', ({ keyCode}) => {
  switch (keyCode) {
    case moveKeys.left: {
      keys.left.pressed = false;
      break
    }

    case moveKeys.right: {
      keys.right.pressed = false;
      break
    }

    case moveKeys.down: {
      break
    }

    case moveKeys.up: {
      break
    }
  }
});