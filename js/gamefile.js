/*************

NOTES:
    - I'm planning to store cards as a list of strings. For example:
      ['4H', '14S', '11C']
      is a hand of 4 of hearts, ace of spades, and jack of clubs.
      Notice that Ace is assigned 14 rather than 1, because aces
      are high in war.


TODO: I forgot to build in a foundation for win conditions... that was stupid.
      Gotta add some stuff for that.

 *************/

var record = {win: 0, loss: 0};

var playerCard = document.getElementsByClassName('player-card')[0]
var opponentCard = document.getElementsByClassName('opponent-card')[0]
var playerWarCard = document.getElementsByClassName('player-war-card')[0]
var opponentWarCard = document.getElementsByClassName('opponent-war-card')[0]
var vs = document.getElementsByClassName('vs')[0]
var players = init_game();
var player = players[0];
var opponent = players[1];

/*
 * DOM
 */
function displayPlayerCard(card){
  playerCard.style.backgroundImage = `url(${card})`
}

function displayOpponentCard(card){
  opponentCard.style.backgroundImage = `url(${card})`
}

function displayPlayerWarCard(card){
  playerWarCard.style.visibility = "visible"
  playerWarCard.style.backgroundImage = `url(${card})`
}

function displayOpponentWarCard(card){
  opponentWarCard.style.visibility = "visible"
  opponentWarCard.style.backgroundImage = `url(${card})`
}

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
    }else if (ret[0] == 1){
	if (ret[1] == 1){
	    //Player wins whole game
	}else if (ret[1] == 2){
	    //opponent wins whole game
	}
    }
}

/*
 * Random helper functions
 */

function imagepath(cardname)
{
    return 'lib/images/' + cardname + '.png';
}

function int_val(cardname)
{
    return parseInt(cardname.slice(0, cardname.length - 1));
}

// This is a (modern) Fisher-Yates shuffle:
// More: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
function shuffle(cards)
{
    let divis, holder
    for (var i = cards.length - 1; i > 0; i--){
	divis = Math.floor(Math.random() * (i + 1));
	holder = cards[i];
	cards[i] = cards[divis];
	cards[divis] = holder;
    }
}

function maketheDecks()
{
    let suits = ['C', 'S', 'H', 'D']
    let full_deck = [];
    for (var suitcount = 0; suitcount < 4; suitcount++){
	for (var count = 2; count < 15; count++){
	    full_deck.push(count.toString()+suits[suitcount]);
	}
	shuffle(full_deck);
    }
    shuffle(full_deck);
    return [full_deck.slice(0, 26), full_deck.slice(26, 52)];
}




/*
 * New classes
 */

function Deck(cards)
{
    this.cards = cards;

    this.pop = function(){
	return this.cards.shift();
    }
    this.push = function(card){
	this.cards.push(card);
    }
}

function Player(name)
{
    this.name = name;
    this.deck = new Deck([]);
}

/*
 * Game mechanics
 */

function compare(card1, card2, player1, player2)
{
    if (int_val(card1) < int_val(card2)){
	return [2]
    }else if (int_val(card1) > int_val(card2)){
	return [1]
    }else if (int_val(card1) === int_val(card2)){
	return [3]
    }else{
	throw "Compare error!";
    }
}

function turncards(player1, player2, list, count)
{
    if (player1.deck.length < count){
	return [1, 2];
    }else if (player2.deck.length < count){
	return [1, 1];
    }

    for (var i = 0; i < count; i++){
	list.p1.unshift(player1.deck.pop());
	list.p2.unshift(player2.deck.pop());
    }

    return [0];
}

function givecards(player, list)
{
    let all_cards = [list.p1, list.p2];
    for (var i = 0; i < 2; i++){
	shuffle(all_cards[i]);
	for (var l = 0; l < all_cards[i].length; l++){
	    player.deck.push(all_cards[i][l])
	}
    }
}

function tie(player1, player2, card_list)
{
    let ret = [];
    if ((ret = turncards(player1, player2, card_list, 2))[0] == 1){
	return ret;
    }

    console.log("Tie");

    let winner = compare(turned_cards.p1[0], turned_cards.p2[0]);

    if (winner === [3]){
	return tie(player1, player2, card_list);
    }else{
	return [winner];
    }
}

function turn(player1, player2)
{
    var player_dict = {1:player1, 2:player2};
    var turned_cards = {'p1':[], 'p2':[]};
    let ret = [];
    ret = turncards(player1, player2, turned_cards, 1);
    if (ret[0] == 1){
	return ret;
    }

    console.log(turned_cards.p1, turned_cards.p2);

    let winner = compare(turned_cards.p1[0], turned_cards.p2[0]);

    if (winner === [3]){
	if ((ret = tie(player1, player2, turned_cards))[0] == 1){
	    return ret;
	}else{
	    givecards(player_dict[ret[0]], turned_cards);
	    winner[0] = ret[0];
	}
    }else{
	givecards(player_dict[winner[0]], turned_cards);
    }
    return [0, winner[0]];
}

function init_game()
{
    let pl = new Player("Player");
    let opp = new Player("Opponent");

    let stacks = maketheDecks();

    pl.deck.cards = stacks[0];
    opp.deck.cards = stacks[1];

    console.log("Game initiated.");

    return [pl, opp];
}
