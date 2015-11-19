/**
 * Created by George Davies on 11/5/2015.
 */
var cards = [];
var selected = [];
var amountOfCards = 4;
var players = [
    {id:"A", matches:[]},
    {id:"B", matches:[]}
];
var player = players[0];
amountOfCards = amountOfCards/2;
console.log(cards);
function createEl(cls, parent) {
    var el = document.createElement('div');
    el.classList.add(cls);
    parent.appendChild(el);
    return el;
}
function card(id, container) {
    this.id = id;
    var el = createEl("card", container);
    el.onclick = function () {
        // add the card to selected.
        selected.push(card[id]);

        // if the selected has 2 items in it.
        if(selected === [1]) {
            // then check to see if they both match. selected[0] === selected[1]
            if (selected[0] === selected[1]) {
                // then if they match take them both out of the cards. And Add them to the matches of the player.
                player.matches.push(selected);
                var cardBeingDestroyed = [];
                for(var i = 0; i < amountOfCards; i += 1) {
                    if(selected[0] === card(i)) {
                        cardBeingDestroyed.push(card(i));
                    }
                    if(selected[1] === card(i)) {
                        cardBeingDestroyed.push(card(i));
                    }
                }
                cards.splice(cardBeingDestroyed);
                selected = null;
            }
        }
        // after 2 are selected. Then call next player.


        player.matches.push(card[id]);
        nextPlayer();
    }
}

function nextPlayer() {
    var index = players.indexOf(player);
    if(index < players.length - 1) {
        index += 1;
    } else {
        index = 0;
    }
    player = players[index];
    console.log(player)
}

function matchingGame() {
    var container = createEl('container', document.body);
    for (var i = 0; i < amountOfCards; i += 1) {
        cards.push(new card(i, container));
        cards.push(new card(i, container));
    }


}
matchingGame();

console.log(player);

