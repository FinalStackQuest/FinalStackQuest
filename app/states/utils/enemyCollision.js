/* global StackQuest */

import { GameEnemies, socket } from 'APP/app/sockets'

const enemyCollision = (playerObject, projectile, graveyard) => {
  Object.keys(GameEnemies).forEach(enemyKey => {
    const enemy = GameEnemies[enemyKey]
    StackQuest.game.physics.arcade.overlap(projectile.bullets, enemy, (target, bullet) => {
      const didDie = enemy.takeDamage(projectile.damage)
      bullet.kill()

      if (didDie) {
        graveyard.push(enemy)
        delete GameEnemies[enemyKey]
      }
    })
    StackQuest.game.physics.arcade.overlap(enemy, playerObject, () => {
      playerObject.internalStats.hp -= enemy.attack()

      if (playerObject.internalStats.hp <= 0) {
        playerObject.position.x = 500
        playerObject.position.y = 500
        //  reset internal health: TEMP
        playerObject.internalStats.hp = 100
        socket.emit('updatePlayer', playerObject.position)
      }
    })
  })
}

export default enemyCollision