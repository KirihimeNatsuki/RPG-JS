//Liste des variables primordiales du jeu
let jeu = document.querySelector('#jeu');
const histoire = document.getElementById('story');
const elementsChoix = document.getElementById('choices');
let audio_death = new Audio('death.mp3');

// La fonction qui lance le jeu
function initGame() {
  //jeu.innerHTML = '';
  confirm("Bienvenue sur Pandora, vous n'avez qu'un seul but : découvrir qui vous êtes, qu'est ce qui vous est arrivé et sauver la personne la plus importante pour vous dans ce monde où la violence et les démons règnent en maître");
  state = {}
  affichagePlayer();
  showStoryLine(0);
}

// Création des fonctions permettant l'affichage de l'histoire
function showStoryLine(index) {
  const storyStep = storyline.find(storyStep => storyStep.id === index)
  histoire.innerText = storyStep.text
  while (elementsChoix.firstChild) {
    elementsChoix.removeChild(elementsChoix.firstChild)
  }

  storyStep.options.forEach(option => {
    if (showOption(option)) {
      const bouton = document.createElement('button')
      bouton.innerText = option.text
      bouton.classList.add('btn')
      bouton.addEventListener('click', () => selectOption(option))
      elementsChoix.appendChild(bouton)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextStoryStepId = option.nextScene
  if (nextStoryStepId <= 0) {
    return initGame()
  }
  state = Object.assign(state, option.setState)
  showStoryLine(nextStoryStepId)
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
        //fonction: /*gameOver()*/,
        nextScene: 100
      },
      {
        text: 'Combattre les gobelins',
        requiredState: (currentState) => currentState.baton || currentState.torche,
        //fonction: zoneCombat(0)
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
    id: 100,
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
        fonction: initGame(),
      }
    ]
  },
]

let ennemy;
//Création de la fonction ennemy qui peut être également une classe
function Ennemy(name, health, strenght, money, speed){
  this.name = name;
  this.health = health;
  this.strenght = strenght;
  this.money = money;
  this.speed = speed;
}

function combat() {
  let combat = {
  whoAttack: function() {
    // Qui va attaquer le premier ?
    let getPlayerSpeed = player.speed;
    let getEnnemySpeed = ennemy.speed;
    // Attaque des monstres
    let ennemyStrike = function() {
      let baseDamage = ennemy.strenght;
      let suppDamage = Math.floor(Math.random(1, 3));
      let ennemytrueDamage = baseDamage + suppDamage;
      return ennemytrueDamage;
    }
    // Attaque du joueur
    let playerStrike = function() {
      let baseDamage;
      if (player.stamina > 0 /*&& optionCombat == true*/) {
        baseDamage = player.strenght;
      }
      else if (player.stamina > 0 /*&& optionCombat2 == true*/) {
        baseDamage = player.strenght * 3;
      }
      else {
        baseDamage = player.strenght;
      }
      let suppDamage = Math.floor(Math.random(1, 3));
      let trueDamage = baseDamage + suppDamage;
      let hitCount = Math.floor(Math.random() * Math.floor(player.speed / 10) / 2) + 1;
      let attackEtapes = [trueDamage, hitCount];
      return attackEtapes;
    }
    // Récupérer les HP du joueur et du monstre
    let getPlayerHealth = document.querySelector('.health_player');
    let getEnnemyHealth = document.querySelector('.health_ennemy');

    // Au tour du joueur d'attaquer
    if (getPlayerSpeed >= getEnnemySpeed) {
      let playerAttackRound = playerStrike();
      let totalDmg = playerAttackRound[0] * playerAttackRound[1];
      ennemy.health = ennemy.health - totalDmg;
      alert("Vous avez touché" + ennemy.name + playerAttackRound[1] + "fois avec" + playerAttackRound[0] + "de degats");
      if (ennemy.health <= 0) {
        alert("Vous avez gagné , vous gagnez un niveau !");
        player.level += 1;
        getPlayerHealth.innerHTML = 'Health: ' + player.health;
        getEnnemyHealth.innerHTML = 'Health: 0';
        afterCombat();
      }
      else {
        getEnnemyHealth.innerHTML = 'Health ' + ennemy.health;
        // Au tour du monstre d'attaquer
        let ennemyAttackRound = ennemyStrike();
        let totalDmg = ennemytrueDamage;
        player.health = player.health - totalDmg;
        alert("Vous avez subit" + totalDmg + "de degats");
        if (player.health <= 0) {
          alert("Vous avez perdu , vous êtes mort !");
          getPlayerHealth.innerHTML = 'Health: 0';
          getEnnemyHealth.innerHTML = 'Health: ' + ennemy.health;
          gameOver();
        }
        else {
          getPlayerHealth.innerHTML = 'Health: ' + player.health;
        }
      }
    } else if (getEnnemySpeed >= getPlayerSpeed) {
      let ennemyAttackRound = ennemyStrike();
      let totalDmg = ennemytrueDamage;
      player.health = player.health - totalDmg;
      alert("Vous avez subit" + totalDmg + "de degats");
      if (player.health <= 0) {
        alert("Vous avez perdu , vous êtes mort !");
        getPlayerHealth.innerHTML = 'Health: 0';
        getEnnemyHealth.innerHTML = 'Health: ' + ennemy.health;
        gameOver();
      }
      else {
        let playerAttackRound = playerStrike();
        let totalDmg = playerAttackRound[0] * playerAttackRound[1];
        ennemy.health = ennemy.health - totalDmg;
        alert("Vous avez touché" + ennemy.name + playerAttackRound[1] + "fois avec" + playerAttackRound[0] + "de degats");
        if (ennemy.health <= 0) {
          alert("Vous avez gagné , vous gagnez un niveau !");
          player.level += 1;
          getPlayerHealth.innerHTML = 'Health: ' + player.health;
          getEnnemyHealth.innerHTML = 'Health: 0';
          afterCombat();
        }
        else {
          getEnnemyHealth.innerHTML = 'Health: ' + ennemy.health;
        }
      }
    }
  }
}
}

let player;
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
    let sexe = prompt("Etes vous un homme ou une femme ?");
    if (sexe == "homme" || sexe == "Homme"){
      player = new Player(100, 10, "Unknown_M", 10, 100, 20, 1);
    }
    else if (sexe == "femme" || sexe == "femme") {
      player = new Player(100, 8, "Unknown_F", 10, 100, 30, 1);
    }
    else {
      affichagePlayer();
    }
    let getDivPlayer = document.querySelector("#playerStats");
    getDivPlayer.innerHTML = ' <img src="img/"' + sexe.toLowerCase() + '.png" class="player_avatar"><div><p class="health_player">Hp: '
    + player.health + '</p><p>Stamina: ' + player.stamina + '</p><p>Force: ' + player.strenght + '</p><p>Nom: '
    + player.name + '</p><p>Gold: ' + player.money + '</p><p>Niveau: ' + player.level + '</p></div>';
  }

/* Fonction pour restaurer ses points de vies à chaque grande étape du jeu
(Remplace les potions de vies et rend le jeu "finissable")*/
function restoration() {
  let restaurer = confirm("Vous avez changer de lieu, voulez-vous restaurer vos Hp ?");
  if (restaurer) {
    player.health = 100;
  }
}

//Création des monstres et lancement des combats et affichage de leur stats
function zoneCombat(numCombat) {
  let getZoneCombat = document.querySelector("#combat"); //name, health, strenght, money, speed
  let getEnnemy = document.querySelector(".ennemy");
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
      combat();
      break;
    case 1:
      ennemy = ennemyChefTribalGoblin;
      combat();
      break;
    case 2:
      ennemy = ennemyHorde;
      combat();
      break;
    case 3:
      ennemy = ennemyGardeTenebreux;
      combat();
      break;
    case 4:
      ennemy = ennemySuccube;
      combat();
      break;
    case 5:
      ennemy = ennemyRoiGoblin;
      combat();
      break;
    case 6:
      ennemy = ennemyDemon;
      combat();
      break;
    case 7:
      ennemy = ennemyWolf;
      combat();
      break;
  }
  getZoneCombat.innerHTML  = '<a href="#" class="prefight" onclick="combatPlayer.whoAttack()"> Attaquer !</a>';
  getEnnemy.innerHTML = '<div><h3>' + ennemy.name + '</h3><p class="health_ennemy">Health: '
  + ennemy.health + '</p><p>Strenght: ' + ennemy.strenght + '</p></div>';
}

/*Fonction permettant de retourner à l'histoire par rapport au combat dans lequel
le joueur se trouvait */
function afterCombat() {
  if (combatN == 0) {
    showStoryLine(4);
  }
  else if (combatN == 1) {

  }
  else if (combatN == 2) {

  }
  else if (combatN == 3) {

  }
  else if (combatN == 4) {

  }
  else if (combatN == 5) {

  }
  else if (combatN == 6) {

  }
  else if (combatN == 7) {

  }
  else {
    alert("Erreur redémarrez la page !");
  }
}

function gameOver() {
  /*let over = document.getElementById('death');
  over.classList.remove("disabled");
  audio_death.play();*/
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
