var playerCard = document.getElementsByClassName('player-card')[0]
var opponentCard = document.getElementsByClassName('opponent-card')[0]
var vs = document.getElementsByClassName('vs')[0]
var players = init_game();
var player = players[0];
var opponent = players[1];

function reset(){
  setTimeout(function () {
      playerCard.classList.remove('loseTranslate');
      opponentCard.classList.remove('winTranslate');
      opponentCard.classList.remove('loseTranslate');
      playerCard.classList.remove('winTranslate');
      vs.innerHTML = "war";
      vs.style.visibility = "visible";
  }, 3000)
}

vs.onclick = function() {
    let ret = turn(player, opponent);
    if (ret[0] == 0){
	if (ret[1] == 1){
	    vs.innerHTML === 'player won';
	    playerCard.classList.add('winTranslate');
	    opponentCard.classList.add('loseTranslate');
	    vs.innerHTML = "";
	    vs.style.visibility = "hidden";
	    reset()
	}else if (ret[1] == 2){
	    vs.innerHTML === 'opponent won'
	    playerCard.classList.add('loseTranslate');
	    opponentCard.classList.add('winTranslate');
	    vs.innerHTML = "";
	    vs.style.visibility = "hidden";
	    reset()
	}
    }
}
