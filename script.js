// La fonction qui lance le jeu
function initGame() {
  window.onload = function() {
    confirm("Bienvenue sur Pandora, vous n'avez qu'un seul but : découvrir qui vous êtes, qu'est ce qui vous est arrivé et sauver la personne la plus importante pour vous dans ce monde où la violence et les démons règnent en maître");
    state = {}
    affichagePlayer();
    showStoryLine(0);
  }
  //jeu.innerHTML = '';
}

//Liste des variables primordiales du jeu
let jeu = document.querySelector('#jeu');
let audio_death = new Audio('death.mp3');
let ennemy;
let player;

// Création des fonctions permettant l'affichage de l'histoire
function showStoryLine(storyStepIndex) {
  if (storyStepIndex < 0) {
    if (storyStepIndex == -1) {
      zoneCombat(0);
    }
    else if (storyStepIndex == -2) {
      zoneCombat(1);
    }
    else if (storyStepIndex == -3) {
      zoneCombat(2);
    }
    else if (storyStepIndex == -4) {
      zoneCombat(3);
    }
    else if (storyStepIndex == -5) {
      zoneCombat(4);
    }
    else if (storyStepIndex == -6) {
      zoneCombat(5);
    }
    else if (storyStepIndex == -7) {
      zoneCombat(6);
    }
    else if (storyStepIndex == -8) {
      zoneCombat(7);
    }
    else if (storyStepIndex == -100) {
      gameOver();
    }
  }
  else {
    if (storyStepIndex > 10) {
      decor(0);
    }
    else if (storyStepIndex > 20) {
      decor(1);
    }
    else if (storyStepIndex > 30) {
      decor(2);
    }
    else if (storyStepIndex > 40) {
      decor(3);
    }
    else if (storyStepIndex > 50) {
      decor(4);
    }
    else if (storyStepIndex > 60) {
      decor(5);
    }
    let histoire = document.getElementById('story');
    let elementsChoix = document.getElementById('choices');
    let storyStep = storyline.find(storyStep => storyStep.id === storyStepIndex);
    histoire.innerText = storyStep.text;
    while (elementsChoix.firstChild) {
      elementsChoix.removeChild(elementsChoix.firstChild)
    }

    storyStep.options.forEach(option => {
      if (showOption(option)) {
        const bouton = document.createElement('button')
        bouton.innerText = option.text;
        bouton.classList.add('btn');
        bouton.addEventListener('click', () => selectOption(option));
        elementsChoix.appendChild(bouton);
      }
    })
  }
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextStoryStepId = option.nextScene;
  if (nextStoryStepId == 0) {
    return initGame();
  }
  state = Object.assign(state, option.setState);
  showStoryLine(nextStoryStepId);
}



const storyline = [
  {
    id: 0,
    text: 'Il fait nuit, vous vous réveillez dans une forêt sombre. Ne vous souvenant seulement de votre nom, vous entendez une voix dans votre tête vous indiquant d"aller en ville. Vous trouvez à vos pieds plusieurs items mais vous entendez des monstres venir vers vous...',
    options: [
      {
        text: 'Prendre la torche au sol',
        setState: { torche: true },
        nextScene: 1
      },
      {
        text: 'Prendre un grand bâton',
        setState: { baton: true },
        nextScene: 1
      },
      {
        text: 'Prendre le bouclier se trouvant au sol',
        setState: { shield: true },
        nextScene: 1
      }
    ]
  },
  {
    id: 1,
    text: 'Vous apercevez ce qui semble être des gobelins, affamés ils se rapprochent de plus en plus pour en découdre.',
    options: [
      {
        text: 'Tenter d"effrayer les gobelins avec la torche.',
        requiredState: (currentState) => currentState.torche,
        nextScene: -100
      },
      {
        text: 'Combattre les gobelins',
        requiredState: (currentState) => currentState.baton || currentState.torche,
        nextScene: -1
      },
      {
        text: 'Fuir',
        nextScene: 5
      },
      {
        text: 'Repousser les gobelins avec le bouclier',
        requiredState: (currentState) => currentState.shield,
        nextScene: 4
      }
    ]
  },

  {
    id: -100,
    text: 'Vous êtes mort !',
    options: [
      {
        text: 'Ahah tu es nul.',
      },
      {
        text: 'Tu feras mieux la prochaine fois',
      },
      {
        text: 'Ou pas mais en tout cas ==>',
      },
      {
        text: 'Nouvelle partie ici !',
        nextScene: 0
      }
    ]
  },
]

//Création de la fonction ennemy qui peut être également une classe
function Ennemy(name, health, strenght, money, speed){
  this.name = name;
  this.health = health;
  this.strenght = strenght;
  this.money = money;
  this.speed = speed;
}

function combat() {
    // Qui va attaquer le premier ?
    let getPlayerSpeed = player.speed;
    let getEnnemySpeed = ennemy.speed;
    // Récupérer les HP du joueur et du monstre + nom pour la fin du combat
    let getEnnemyName = ennemy.name;
    let getPlayerHealth = document.querySelector('.health_player');
    let getEnnemyHealth = document.querySelector('.health_ennemy');

    // Attaque des monstres
    let ennemyDamage = ennemy.strenght + Math.floor(Math.random(1, 3));
    // Attaque du joueur
    let baseDamage;
    if (player.stamina > 0 /*&& optionCombat == true*/) {
      baseDamage = player.strenght;
    }
    else if (player.stamina > 0 /*&& optionCombat2 == true*/) {
      baseDamage = player.strenght * 3;
      player.stamina -= 20;
    }
    else {
      baseDamage = player.strenght;
    }
    let suppDamage = Math.floor(Math.random(1, 3));
    let trueDamage = baseDamage + suppDamage;
    let hitCount = Math.floor(Math.random() * Math.floor(player.speed / 10) / 2) + 1;
    let attackEtapes = [trueDamage, hitCount];


    // Au tour du joueur d'attaquer
    if (getPlayerSpeed >= getEnnemySpeed) {
      let playerDamage = attackEtapes[0] * attackEtapes[1];
      ennemy.health = ennemy.health - playerDamage;
      alert("Vous avez touché  " + ennemy.name + attackEtapes[1] + " fois avec " + attackEtapes[0] + " de degats");
      if (ennemy.health <= 0) {
        alert("Vous avez gagné , vous gagnez un niveau !");
        player.level += 1;
        getPlayerHealth.innerHTML = 'Hp: ' + player.health;
        getEnnemyHealth.innerHTML = 'Hp: 0';
        afterCombat(getEnnemyName);
      }
      else {
        getEnnemyHealth.innerHTML = 'Health ' + ennemy.health;
        // Au tour du monstre d'attaquer
        let ennemyStrike = ennemyDamage;
        player.health = player.health - ennemyStrike;
        alert("Vous avez subit " + ennemyStrike + " de degats");
        if (player.health <= 0) {
          alert("Vous avez perdu , vous êtes mort !");
          getPlayerHealth.innerHTML = 'Hp: 0';
          getEnnemyHealth.innerHTML = 'Hp: ' + ennemy.health;
          gameOver();
        }
        else {
          getPlayerHealth.innerHTML = 'Hp: ' + player.health;
        }
      }
    } else if (getEnnemySpeed >= getPlayerSpeed) {
      let ennemyStrike = ennemyDamage;
      player.health = player.health - ennemyStrike;
      alert("Vous avez subit " + ennemyStrike + " de degats");
      if (player.health <= 0) {
        alert("Vous avez perdu , vous êtes mort !");
        getPlayerHealth.innerHTML = 'Hp: 0';
        getEnnemyHealth.innerHTML = 'Hp: ' + ennemy.health;
        gameOver();
      }
      else {
        let attackEtapes = playerStrike();
        let playerDamage = attackEtapes[0] * attackEtapes[1];
        ennemy.health = ennemy.health - playerDamage;
        alert("Vous avez touché  " + ennemy.name + attackEtapes[1] + " fois avec " + attackEtapes[0] + " de degats");
        if (ennemy.health <= 0) {
          alert("Vous avez gagné , vous gagnez un niveau !");
          player.level += 1;
          getPlayerHealth.innerHTML = 'Hp: ' + player.health;
          getEnnemyHealth.innerHTML = 'Hp: 0';
          afterCombat(getEnnemyName);
        }
        else {
          getEnnemyHealth.innerHTML = 'Hp: ' + ennemy.health;
        }
      }
    }
}

//Création de la fonction joueur qui peut être également une classe
function Player(health, strenght, name, money, stamina, speed, level){
  this.health = health;
  this.strenght = strenght;
  this.name = name;
  this.money = money;
  this.stamina = stamina
  this.speed = speed;
  this.level = level;
}

/*La fonction qui permet la création du personnage au début du jeu
avec l'affichage de ses statistiques*/
function  affichagePlayer() {
    let getDivPlayer = document.querySelector('.playerStats');
    let sexe = prompt("Etes vous un homme ou une femme ?");
    if (sexe == "homme" || sexe == "Homme"){
      player = new Player(100, 10, "Unknown_M", 10, 100, 20, 1);
      getDivPlayer.innerHTML = '<img src="img/homme.png" class="player_avatar"><div><p class="health_player">Hp: '
      + player.health + '</p><p>Stamina: ' + player.stamina + '</p><p>Force: ' + player.strenght + '</p><p>Nom: '
      + player.name + '</p><p>Gold: ' + player.money + '</p><p>Niveau: ' + player.level + '</p></div>';
    }
    else if (sexe == "femme" || sexe == "femme") {
      player = new Player(100, 8, "Unknown_F", 10, 100, 30, 1);
      getDivPlayer.innerHTML = '<img src="img/femme.png" class="player_avatar"><div><p class="health_player">Hp: '
      + player.health + '</p><p>Stamina: ' + player.stamina + '</p><p>Force: ' + player.strenght + '</p><p>Nom: '
      + player.name + '</p><p>Gold: ' + player.money + '</p><p>Niveau: ' + player.level + '</p></div>';
    }
    else {
      affichagePlayer();
    }
    /*getDivPlayer.innerHTML = '<img src="img/"' + sexe.toLowerCase() + '.png" class="player_avatar"><div><p class="health_player">Hp: '
    + player.health + '</p><p>Stamina: ' + player.stamina + '</p><p>Force: ' + player.strenght + '</p><p>Nom: '
    + player.name + '</p><p>Gold: ' + player.money + '</p><p>Niveau: ' + player.level + '</p></div>';*/
  }

/* Fonction pour restaurer ses points de vies à chaque grande étape du jeu
(Remplace les potions de vies et rend le jeu "finissable")*/
function restoration() {
  let restaurer = confirm("Vous avez changer de lieu, voulez-vous restaurer vos Hp et votre stamina ?");
  if (restaurer) {
    player.health = 100;
    player.stamina = 100;
  }
}

//Création des monstres et lancement des combats et affichage de leur stats #1
function interfaceCombat() {
  let getZoneCombat = document.querySelector('.combat');
  let getEnnemy = document.querySelector('.ennemy');
  getZoneCombat.innerHTML  += '<a href="#" class="prefight" onclick="combat()"> Attaquer !</a>';
  getEnnemy.innerHTML += '<div><h3>' + ennemy.name + '</h3><p class="health_ennemy">Health: '
  + ennemy.health + '</p><p>Strenght: ' + ennemy.strenght + '</p></div>';
}

//Création des monstres et lancement des combats et affichage de leur stats #2
function zoneCombat(numCombat) {
  let ennemyGoblin = new Ennemy ("Goblin", 30, 5, 5, 17);
  let ennemyChefTribalGoblin = new Ennemy ("Chef Goblin", 50, 9, 15, 19);
  let ennemyHorde = new Ennemy ("Horde de monstres", 500, 50, 700, 10);
  let ennemyGardeTenebreux = new Ennemy ("Gardes Ténébreux", 75, 20, 50, 15);
  let ennemySuccube = new Ennemy ("Succube", 90, 12, 100, 40);
  let ennemyRoiGoblin = new Ennemy ("Roi Goblin", 180, 30, 300, 19);
  let ennemyDemon = new Ennemy ("Demon", 70, 12, 45, 22);
  let ennemyWolf = new Ennemy ("Loup", 40, 10, 10, 35);
  switch (numCombat){
    case 0:
      ennemy = ennemyGoblin;
      interfaceCombat();
      combat();
      break;
    case 1:
      ennemy = ennemyChefTribalGoblin;
      interfaceCombat();
      combat();
      break;
    case 2:
      ennemy = ennemyHorde;
      interfaceCombat();
      combat();
      break;
    case 3:
      ennemy = ennemyGardeTenebreux;
      interfaceCombat();
      combat();
      break;
    case 4:
      ennemy = ennemySuccube;
      interfaceCombat();
      combat();
      break;
    case 5:
      ennemy = ennemyRoiGoblin;
      interfaceCombat();
      combat();
      break;
    case 6:
      ennemy = ennemyDemon;
      interfaceCombat();
      combat();
      break;
    case 7:
      ennemy = ennemyWolf;
      interfaceCombat();
      combat();
      break;
  }
}

/*Fonction permettant de retourner à l'histoire par rapport au combat dans lequel
le joueur se trouvait */
function afterCombat(name) {
  let getZoneCombat = document.querySelector('.combat');
  let getEnnemy = document.querySelector('.ennemy');
  if (name == "Goblin") {
    showStoryLine(0);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Chef Goblin") {
    showStoryLine();
  }
  else if (name == "Horde de monstres") {
    showStoryLine();
  }
  else if (name == "Gardes Ténébreux") {
    showStoryLine();
  }
  else if (name == "Succube") {
    showStoryLine();
  }
  else if (name == "Roi Goblin") {
    showStoryLine();
  }
  else if (name == "Demon") {
    showStoryLine();
  }
  else if (name == "Loup") {
    showStoryLine();
  }
  else {
    alert("Erreur redémarrez la page !");
  }
}

function gameOver() {
  let over = document.getElementById('gameover');
  over.classList.remove("disabled");
  audio_death.play();
}
/*function displayStats() {

  //let hold = [];
  //for (let i = 0; i < player.abilities.length; i++) {
    //hold.push(" " + player.abilities[i].name)
  //};
  let playerStats = document.querySelector('#playerStats');
  let nameStat = document.getElementById('name')
  nameStat.innerHTML = "<strong>Nom: </strong>" + player.name + "<br/>";
  playerStats.appendChild(nameStat);
  let healthStat = document.getElementById('health')
  healthStat.innerHTML = "Hp: " + player.health + "<br/>";
  let strenghtStat = document.getElementById('strenght')
  strenghtStat.innerHTML = "Force: " + player.strenght + "<br/>";
  let moneyStat = document.getElementById('money')
  moneyStat.innerHTML = "Gold: " + player.money + "<br/>";
  let skillsStat = document.getElementById('name')
  skillsStat.innerHTML = "Skills: " + player.skills + "<br/>";
  //output(
    //"Name: " + player.name + "<br/>" +
    //"Strength: " + player.strength + "<br>" +
    //"Money: " + player.money + "<br>" +
    //"Health: " + player.health + "<br />"+
    //"Abilities: " + hold
  //);
};*/

/*function play(ratio){
  if (ratio < 0){
    //lancement combat (mechanic);
    return;
  }
  else if (ratio < -10) {
    //séquence death (gameplay/visual/mechanic);
    return;
  }
  let z = ratio;
  clear();
  let affichageTexte = document.createElement('div');
  affichageTexte.setAttribute('id', 'affichageTexte');
  let affichageBouton = document.createElement('div');
  affichageBouton.setAttribute('id', 'affichageBouton');
  jeu.appendChild(affichageTexte);
  jeu.appendChild(affichageBouton);
  affichageTexte.innerHTML = sequence[z].texte;
  if (sequence == 0){
    //mise en place de boutons
  }
}*/

/*function start(){
  clear();

  let divDepart = document.createElement('div');
  jeu.appendChild(divDepart);

  let newgame = document.createElement('button');
  newgame.innerHTML = 'Nouvelle Partie';
  divDepart.appendChild(newgame);
}*/

initGame();
