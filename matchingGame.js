/**
 * Created by George Davies on 11/5/2015.
 */
var cards = [];
var selected = [];
var players = [
    //{id: "A", matches: []},
    //{id: "B", matches: []},
    //{id: "C", matches: []}
];
var numPlayers = parseInt(prompt("How many players"), 10);
for(var i = 0; i < numPlayers; i += 1) {
    players.push({id: prompt("Enter player " + i + " name"), matches:[]});
}

var player = players[0];
console.log(cards);

function createEl(cls, parent) {
    var el = document.createElement('div');
    el.classList.add(cls);
    parent.appendChild(el);
    return el;
}

function removeCard(card) {
    var index = cards.indexOf(card);
    if (index !== -1) {
        cards.splice(index, 1);
    }
}

function selectCard(crd) {
    if (selected.length > 1 || selected[0] === crd) {
        return;
    }
    // add the card to selected.
    crd.flip();
    selected.push(crd);

    // if the selected has 2 items in it.
    if (selected.length > 1) {
        checkForMatch();
    }
}

function checkForMatch() {
    var c;
    // then check to see if they both match. selected[0] === selected[1]
    if (selected[0].type === selected[1].type) {
        // then if they match take them both out of the cards. And Add them to the matches of the player.
        while (selected.length) {
            c = selected.shift();
            c.owner(player);
            removeCard(c);
            player.matches.push(c);
            var audio = new Audio('success.mp3');
            audio.play();
        }
        draw();
        // after 2 are selected. Then call next player.
    } else {
        setTimeout(function () {
            selected[0].flip();
            selected[1].flip();
            nextPlayer();
            var audio = new Audio('fail.mp3');
            audio.play();
        }, 2000)
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
    //el.innerHTML = '<div class="cheat">' + this.suit + ":" + this.type + '</div>';
    el.onclick = function () {
        if (!el.classList.contains("owner")) {
            selectCard(self);
            draw();
        }
    };
    this.owner = function (owner) {
        el.classList.add('owner');
        el.innerHTML = "<div class=\"owner-name\">" + owner.id + "</div>";
    };
    this.attach = function () {
        container.appendChild(el);
    };
    this.flip = function () {
        if (el.classList.contains("over")) {
            el.classList.remove("over")
        } else {
            el.classList.add("over")
        }
    };
}

function nextPlayer() {
    selected.length = 0;
    var index = players.indexOf(player);
    if (index < players.length - 1) {
        index += 1;
    } else {
        index = 0;
    }
    player = players[index];
    console.log(player);
    draw();
}

function draw() {
    document.querySelector(".player").innerHTML = player.id;

    var str = '';
    for(var i = 0; i < players.length; i += 1){
        str += players[i].id + ":" + (players[i].matches.length * 0.5) + " ";
    }
    document.querySelector(".scores").innerHTML = str;
}

function randomIndex(len) {
    return Math.floor(Math.random() * len);
}

function shuffle(list, container) {
    // loop through the list
    var shuffleTimes = list.length;
    // -- for loop the number of shuffleTimes
    for (var i = 0; i < shuffleTimes; i += 1) {
        var a = randomIndex(cards.length);
        var b = randomIndex(cards.length);
        var tmp = cards[a];//list at index a
        cards[a] = cards[b];// list at index a = list at index b
        cards[b] = tmp;// list at index b = tmp;
    }
    container.innerHTML = '';
    for (i = 0; i < list.length; i += 1) {
        list[i].attach();
    }
}

function matchingGame() {
    var container = createEl('container', document.body);
    var suits = ['club', 'spade', 'heart', 'diamond'];
    var types = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
    for (var i = 0; i < suits.length; i += 1) {
        for (var j = 0; j < types.length; j += 1) {
            cards.push(new card(suits[i], types[j], container));
        }
    }
    shuffle(cards, container);
    draw();
}
matchingGame();

innerHTML = (player);
setVolume(50);



