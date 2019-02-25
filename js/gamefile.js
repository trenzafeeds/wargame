/*
 * In-browser game of War
 * Javascript implementation/DOM file 
 * Project for Internet Seminar
 * Feb 26, 2019 | Marlboro College
 * Nate Weeks and Kat Cannon-MacMartin
 */

// DOM objects for player cards and central button
var playerCard = document.getElementsByClassName('player-card')[0];
var opponentCard = document.getElementsByClassName('opponent-card')[0];
var playerWarCard = document.getElementsByClassName('player-war-card')[0];
var opponentWarCard = document.getElementsByClassName('opponent-war-card')[0];
var vs = document.getElementsByClassName('vs')[0];

// Global variables for players
var players = init_game();
var player = players[0];        // Human
var opponent = players[1];      // Computer

/*
 * Functions for manipulating the DOM
 */

function displayPlayerCard(card){
  playerCard.style.backgroundImage = `url(${card})`
}

function displayOpponentCard(card){
  opponentCard.style.backgroundImage = `url(${card})`
}

function displayPlayerWarCard(card){
    playerWarCard.style.backgroundImage = `url(${card})`
    playerWarCard.style.visibility = "visible"
}

function displayOpponentWarCard(card){
    opponentWarCard.style.backgroundImage = `url(${card})`
    opponentWarCard.style.visibility = "visible"
}

function showCards(card_list, w = false)
/* Combines the four functions above. Automatically displays the top card
 * of each player's list of played cards (the most recently played one).
 * Second argument determines if the cards are displayed in normal or "war"
 * positions.
 */ 
{
    if (w){
	displayPlayerWarCard(imagepath(card_list.p1[0]));
	displayOpponentWarCard(imagepath(card_list.p2[0]));
    }else{
	displayPlayerCard(imagepath(card_list.p1[0]));
	displayOpponentCard(imagepath(card_list.p2[0]));
    }
}

function reset()
/* Resets the board after one player wins and recieves cards. */
{
    setTimeout(function () {
	playerCard.style.backgroundImage = ''
	opponentCard.style.backgroundImage = ''
	playerWarCard.style.visibility = 'hidden'
	opponentWarCard.style.visibility = 'hidden'
	playerCard.classList.remove('loseTranslate');
	opponentCard.classList.remove('winTranslate');
	opponentCard.classList.remove('loseTranslate');
	playerCard.classList.remove('winTranslate');
	vs.innerHTML = "war";
	vs.style.visibility = "visible";
    }, 3000)
}

vs.onclick = function()
/* Handles each time the "war" button in the middle of the screen is
 * pressed. This includes the game logic behind each turn, in addition
 * to displaying cards and resetting the board.
 */
{
    let ret = turn(player, opponent);
    sleep(1000).then(() => {
	
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
    })
}

/*
 * Random helper functions
 */

// Sleep from
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/39914235#39914
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
    
function imagepath(cardname)
{
    return 'images/' + cardname + '.png';
}

// Turns card-name string into integer for comparisons
function int_val(cardname)
{
    return parseInt(cardname.slice(0, cardname.length - 1));
}

function setup_tie(player, opponent)
{
    opponent.deck.cards[0] = player.deck.cards[0];
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
/* Generates entire deck of cards, shuffles it a couple times,
 * then splits it into two stacks and returns them.
 */
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
 * New classes (Python-like objects)
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
/* Return 1 or 2 to correspond to the winner, or 3 for a tie. */
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
/* Removes `count` many cards from each player's deck, and places them on top
 * of that player's list in the played cards variable `list`.
 */
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
/* Removes all cards from the played-cards list and sticks them on the bottom
 * of the passed player's deck.
 */
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
/* Function that sets aside one card as a "bounty" for the war, then compares another
 * set of cards from each player's deck in order to settle a previous tie. Runs
 * recursively in the event of multiple ties in a row.
 */
{
    let ret = [];
    if ((ret = turncards(player1, player2, card_list, 2))[0] == 1){
	return ret;
    }

    console.log("Tie");
    showCards(card_list, w = true);
    let winner = compare(card_list.p1[0], card_list.p2[0]);

    if (winner === [3]){
	return tie(player1, player2, card_list);
    }else{
	return [0, winner];
    }
}

function turn(player1, player2)
{
    var player_dict = {1:player1, 2:player2};                      // Just for easily turning ints into player objects
    var turned_cards = {'p1':[], 'p2':[]};                         // Holds all cards that have been "played" or set as bounties in a turn
    let ret = [];
    ret = turncards(player1, player2, turned_cards, 1);
    if (ret[0] == 1){
	return ret;
    }

    console.log(turned_cards.p1, turned_cards.p2);
    showCards(turned_cards);
    
    let winner = compare(turned_cards.p1[0], turned_cards.p2[0]);

    if (winner[0] == 3){
	ret = tie(player1, player2, turned_cards)
	if (ret[0] == 1){
	    return ret;
	}else{
	    givecards(player_dict[ret[1]], turned_cards);
	    winner[0] = ret[1];
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
