/* global StackQuest */

import { GameEnemies, socket } from 'APP/app/sockets'

const enemyCollision = (playerObject, projectile, graveyard) => {
  Object.keys(GameEnemies).forEach(enemyKey => {
    const enemy = GameEnemies[enemyKey]
    StackQuest.game.physics.arcade.overlap(projectile.bullets, enemy, (target, bullet) => {
      const didDie = enemy.takeDamage(projectile.damage)
      bullet.kill()
      const damage = StackQuest.game.add.text(enemy.x + Math.random() * 20, enemy.y + Math.random() * 20, projectile.damage, { font: '32px Times New Roman', fill: '#ffa500' })
      setTimeout(() => damage.destroy(), 500)

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
        const damage = StackQuest.game.add.text(playerObject.x, playerObject.y, 'YOU DIED', { font: '32px Times New Roman', fill: '#ffa500' })
        setTimeout(() => damage.destroy(), 1000)
        socket.emit('updatePlayer', playerObject.position)
      }
    })
  })
}

export default enemyCollision
