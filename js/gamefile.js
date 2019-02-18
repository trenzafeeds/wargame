/*************

NOTES:
    - I'm planning to store cards as a list of strings. For example:
      ['4H', '14S', '11C']
      is a hand of 4 of hearts, ace of spades, and jack of clubs.
      Notice that Ace is assigned 14 rather than 1, because aces
      are high in war.


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
    for (i = 0; i < count; i++){
	list.p1.unshift(player1.deck.pop());
	list.p2.unshift(player2.deck.pop());
    }

    // TODO: Probably build actual card displaying into here somewhere 
}

function givecards(player, list)
{
}
    

function turn(player1, player2)
{
    var turned_cards = {p1: [], p2: []};
    turncards(player1, player2, turned_cards, 1);
    var winner = compare(turned_cards.p1[0], turned_cards.p2[0]);

    if (winner === "TIE"){
	// TODO: insert tie handler
    }else{
	givecards(winner, turned_cards);
    }
}

function Game()
{
}
	
    
    
