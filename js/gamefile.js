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
	return player2; 
    }else if (int_val(card1) > int_val(card2)){
	return player1;
    }else if (int_val(card1) === int_val(card2)){
	return "TIE"
    }else{
	throw "Compare error!";
    }
}

function turncards(player1, player2, list, count)
{
    for (var i = 0; i < count; i++){
	list.p1.unshift(player1.deck.pop());
	list.p2.unshift(player2.deck.pop());
    }

    // TODO: Probably build actual card displaying into here somewhere 
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
    // TODO: Put one card face down
    turncards(player1, player2, card_list, 1);
    let winner = compare(turned_cards.p1[0], turned_cards.p2[0]);

    if (winner === "TIE"){
	return tie(player1, player2, card_list);
    }else{
	return winner;
    }
}   

function turn(player1, player2)
{
    let turned_cards = {p1: [], p2: []};
    turncards(player1, player2, turned_cards, 1);
    let winner = compare(turned_cards.p1[0], turned_cards.p2[0]);

    if (winner === "TIE"){
	givecards(tie(player1, player2, turned_cards), turned_cards);
    }else{
	givecards(winner, turned_cards);
    }
}

function Game()
{
}
	
    
    
