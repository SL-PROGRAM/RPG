

/**
 * Créer un monstre
 * @returns {number[]}
 */
function createMonstre() {

    var pvMonstre = Math.floor((Math.random() *251) + 50);
    var degatMonstre = Math.floor((Math.random() *16) + 5);


    var monstre = [pvMonstre, degatMonstre];
    console.log(monster);
    return monstre;

}

/**
 * choix de la classe du joueur
 * @param choix
 * @returns {number[]}
 */
function createPerso(choix) {
    console.log(choix);
    if (choix === "mage" || choix === "1"){
        var mage = [100, 20, "mage"];
        return mage;
    }
    if (choix === "guerrier" || choix === "2"){
        var guerrier = [200, 10, "guerrier"];
        return guerrier;
    }
    if (choix === "soigneur" || choix === "3"){
        var soigneur = [50, 5, "soigneur"];
        return soigneur;
    }

}

/**
 *creer un tableau avec les infos de l'ensemble des joueurs
 */
function numberPlayeur() {

    var nbPlayeur = prompt("combien de brave souhaite aller au combat ?")
    for (i = 0; i< nbPlayeur; i++){
        var name = prompt("Quel est votre nom, mon brave ? ")
        var classPlayer = prompt(   "Pour un mage taper 1," +"\n"+
                                    "pour un guerrier taper 2," +"\n"+
                                    "pour un soigneur taper 3");
        var player = createPerso(classPlayer);
        ensemblePlayer.push([name, player[0], player[1], player[2] ]);
        }
        return ensemblePlayer;
}

/**
 * applique les dégats au monstre
 * @param player
 */
function playerAttack(player) {
    degatPlayer = ensemblePlayer[player];
    console.log(monster)
    monster[0] -= degatPlayer[2];
    if (monster[0] <= 0){
        deadMonster();
    }
    console.log(monster);

}

/**
 * cible un joueur aleatoirement et inflige les dégats
 * @param monster
 */
function monsterAttack() {

    var playerRandom = Math.floor(Math.random() * ensemblePlayer.length);
    console.log(playerRandom);
    var playerSlain = ensemblePlayer[playerRandom];
    console.log(playerSlain);
    playerSlain[1] -= monster[1];
    if (playerSlain[1] <= 0){
        dead(playerRandom);
    }
    console.log(playerSlain);
}

/**
 * permet de soigner un joueur
 */
function healAll() {
    var listNamePlayer = "";

    ensemblePlayer.forEach(function (elem, index) {
        listNamePlayer += "pour soigner : " + elem[0]+ " taper . "+ (index + 1) +"\n";
    });

    var whoPlayerHeal = prompt(listNamePlayer);
    whoPlayerHeal --;
    console.log(whoPlayerHeal);
    var playerHeal = ensemblePlayer[whoPlayerHeal];
    console.log(playerHeal[1]);
    var heal =(playerHeal[1] += 30);
    console.log(playerHeal[1]);

    if (playerHeal[3] === "mage"){
        if (heal > 100) { playerHeal[1] = 100};
    }
    if (playerHeal[3] === "guerrier"){
        if (heal > 200) { playerHeal[1] = 200};
    }
    if (playerHeal[3] === "soigneur"){
        if (heal > 50) { playerHeal[1] = 50};
    }
}


/**
 * permet au mage de se soigner
 * @param player
 */
function autoHeal(player) {
    var playerHeal = ensemblePlayer[player];
    console.log(ensemblePlayer[player]);

    var heal = (playerHeal[1] += 5);
    console.log(ensemblePlayer[player]);
    console.log(playerHeal[1]);
    if (heal > 100) { playerHeal[1] = 100} ;
}


/**
 * gerer la mort d'un joueur
 * @param player
 */
function dead(player) {
    var playerDead = ensemblePlayer[player];

    alert(playerDead[0] + " est mort dans des circonstances horrible")
    ensemblePlayer.splice(player, 1);
    console.log(ensemblePlayer);
    }


/**
 *
 */
function startGame() {
    while (ensemblePlayer != []){
        fight();
    }
    if (ensemblePlayer == []){
        alert("Le roi a fait construit en votre honneur un grand monument");
        window.location.reload() ;
    }


}


function deadMonster() {
    var game = prompt("Vous avez tué cet horrible monstre !!!!!"+"\n" +
                        "pour continuer dans le donjon taper 1" + "\n" +
                        "pour fuir lachement taper 2")

    if (game === "1"){
        monster = createMonstre();
        startGame();

    }
    if (game === "2"){
        alert("Le roi a vent de votre lacheté et vous banni du royaume");
        window.location.reload() ;
    }
}

function fight() {
    ensemblePlayer.forEach(function (elem, index) {
        if (elem[3] === "mage"){
            var action = prompt("Joueur "+ elem[0]+ "\n"+
                "Pour attaquer taper 1," + "\n" +
                "Pour se soigner taper 2"+ "\n"+
                "Pour ne rien faire taper 3");
            if (action === "1"){
                playerAttack(index);
            }
            if (action === "2"){
                autoHeal(index);
            }
        }
        if (elem[3] === "guerrier"){
            var action = prompt("Joueur "+ elem[0]+ "\n"+
                "Pour attaquer taper 1," + "\n" +
                "Pour ne rien faire taper 2");
            if (action === "1"){
                playerAttack(index);
            }

        }
        if (elem[3] === "soigneur"){
            var action = prompt("Joueur "+ elem[0]+ "\n"+
                "Pour attaquer taper 1," + "\n" +
                "Pour soigner taper 2"+ "\n"+
                "Pour ne rien faire taper 3");
            if (action === "1"){
                playerAttack(index);
            }
            if (action === "2"){
                healAll();
            }
        }
        monsterAttack()
    })
}