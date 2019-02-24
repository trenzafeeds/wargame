var playerCard = document.getElementsByClassName('player-card')[0]
var opponentCard = document.getElementsByClassName('opponent-card')[0]
var vs = document.getElementsByClassName('vs')[0]

vs.onclick = function() {
  if(this.innerHTML === 'player won')
  {
    playerCard.classList.add('winTranslate');
    opponentCard.classList.add('loseTranslate');
    vs.outerHTML = ""
  } else if (this.innerHTML === 'opponent won') {
    playerCard.classList.add('loseTranslate');
    opponentCard.classList.add('winTranslate');
    vs.outerHTML = ""
  }
 }
