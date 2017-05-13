const projectileProperties = {
  missle: {
    attack: 15,
    quantity: 5,
    bulletSpeed: 1000,
    fireRate: 500,
    frames: {
      launch: [0],
    }
  },
  fireball: {
    attack: 12,
    quantity: 8,
    bulletSpeed: 350,
    fireRate: 250,
    frames: {
      launch: [0, 1, 2, 3],
    }
  }
}

export default projectileProperties
