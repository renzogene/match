/**
 * Created by George Davies on 11/5/2015.
 */
var cards = [];
var selected = [];
var players = [
    {id:"A", matches:[]},
    {id:"B", matches:[]}
];

var player = players[0];
console.log(cards);

function createEl(cls, parent) {
    var el = document.createElement('div');
    el.classList.add(cls);
    parent.appendChild(el);
    el.addEventListener('click', function() {
        if(el.classList.contains('over')) {
            el.classList.remove('over');
        }else {
            el.classList.add('over');
        }
    })
    return el;
}

function removeCard(card) {
    var index = cards.indexOf(card);
    if(index !== -1){
        cards.splice(index,1);
    }
}

function card(suit, type, container) {
    var self = this;
    this.suit = suit;
    this.type = type;
    var el = createEl("card", container);
    el.classList.add(suit);
    el.classList.add(type);
    el.classList.add("over");
    el.onclick = function () {
        var card;
        // add the card to selected.
        selected.push(self);

        // if the selected has 2 items in it.
        if(selected.length > 1) {
            // then check to see if they both match. selected[0] === selected[1]
            if (selected[0].type === selected[1].type) {
                // then if they match take them both out of the cards. And Add them to the matches of the player.
                while(selected.length) {
                    card = selected.shift();
                    removeCard(card);
                    player.matches.push(card);
                }
                alert("you got a match player " + player.id);
                // after 2 are selected. Then call next player.
                document.querySelector(".player").innerHTML = player.id;
                nextPlayer();
            }
        }
    };
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
    var suits = ['club', 'spade', 'heart', 'diamond'];
    var types = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
    for (var i = 0; i < suits.length; i += 1) {
        for(var j = 0; j < types.length; j += 1) {
            cards.push(new card(suits[i], types[j], container));
        }
    }
}
matchingGame();

console.log(player);

