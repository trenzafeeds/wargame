var playerCard = document.getElementsByClassName('player-card')[0]
var opponentCard = document.getElementsByClassName('opponent-card')[0]
var vs = document.getElementsByClassName('vs')[0]

function reset(){
  setTimeout(function () {
      playerCard.classList.remove('loseTranslate');
      opponentCard.classList.remove('winTranslate');
      vs.innerHTML = "opponent won";
      vs.style.visibility = "visible"
  }, 3000)
}

vs.onclick = function() {

  if(this.innerHTML === 'player won')
  {
    playerCard.classList.add('winTranslate');
    opponentCard.classList.add('loseTranslate');
    vs.innerHTML = "";
    vs.style.visibility = "hidden";
    reset()
  } else if (this.innerHTML === 'opponent won') {
    playerCard.classList.add('loseTranslate');
    opponentCard.classList.add('winTranslate');
    vs.innerHTML = "";
    vs.style.visibility = "hidden";
    reset()
  }
}
