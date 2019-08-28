new Vue({
  el: '#app',
  data: {
    gameStarted: false,
    personToPlay: 'player',
    scores: {
      player: 100,
      monster: 100
    },
    actionLog: []
  },
  watch: {
    personToPlay: function(newPerson, oldPerson) {
      if (this.scores[newPerson] <= 0) {
        if (window.confirm(`${oldPerson} wins! New game?`)) {
          this.gameStarted = false;
          this.start();
        }
      }

      if (newPerson === 'monster') {
        setTimeout(this.attack, 100);
      }
    },
    actionLog: function() {
      if (this.actionLog.length > 0) {
        this.personToPlay =
          this.personToPlay === 'player' ? 'monster' : 'player';
      }
    }
  },
  methods: {
    start: function() {
      // Reset scores
      this.scores.player = 100;
      this.scores.monster = 100;

      // Empty actionLog
      this.actionLog = [];

      // Set gameStarted flag
      this.gameStarted = true;
    },

    attack: function(specialAttack = false) {
      // Determine victim
      const victim = this.personToPlay === 'player' ? 'monster' : 'player';

      // Determine attack factor
      let attackFactor = 5;

      if (specialAttack) {
        attackFactor = 10;
      }

      // Calculate damage points
      const points = Math.round(Math.random() * attackFactor) + 5;

      // Add action to log
      this.actionLog.unshift({
        method: 'attack',
        actor: this.personToPlay,
        victim,
        points
      });

      // Subtract damage from victim
      this.scores[victim] -= points;
    },
    heal: function() {
      // Calculate healing points
      const points = Math.round(Math.random() * 5) + 5;

      // Add action to log
      this.actionLog.unshift({
        method: 'heal',
        actor: this.personToPlay,
        points
      });

      // Add healing to actor
      this.scores[this.personToPlay] += points;
    },
    giveUp: function() {
      this.gameStarted = false;
    }
  }
});
