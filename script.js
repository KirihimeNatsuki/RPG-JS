// La fonction qui lance le jeu
function initGame() {
  window.onload = function() {
    confirm("Bienvenue sur Pandora, vous n'avez qu'un seul but : découvrir qui vous êtes, qu'est ce qui vous est arrivé et sauver la personne la plus importante pour vous dans ce monde où la violence et les démons règnent en maître");
    state = {}
    affichagePlayer();
    showStoryLine(0);
  }
}

//Liste des variables primordiales du jeu
let jeu = document.querySelector('#jeu');
let audio_death = new Audio('death.mp3');
let ennemy;
let player;
// PV Max du joueur
let maxHealthHomme = 120;
let maxHealthFemme = 100;

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
    else if (storyStepIndex == -9) {
      zoneCombat(8);
    }
    else if (storyStepIndex == -10) {
      zoneCombat(9);
    }
    else if (storyStepIndex == -100) {
      gameOver(1);
    }
    else if (storyStepIndex == -101) {
      gameOver(2);
    }
    else if (storyStepIndex == -102) {
      gameOver(3);
    }
    else if (storyStepIndex == -103) {
      gameOver(4);
    }
    else if (storyStepIndex == -104) {
      gameOver(5);
    }
  }
  else {
    if (storyStepIndex == 10 || storyStepIndex == 13) {
      decor(1);
      restoration();
    }
    else if (storyStepIndex == 12) {
      decor(2);
    }
    else if (storyStepIndex ==  14) {
      decor(3);
      restoration();
    }
    else if (storyStepIndex == 27 || storyStepIndex == 28) {
      decor(4);
      restoration();
    }
    else if (storyStepIndex == 30 || storyStepIndex == 32 || storyStepIndex == 33 || storyStepIndex == 34 || storyStepIndex == 35  ) {
      decor(5);
      restoration();
    }
    else if (storyStepIndex == 25) {
      boost(1);
    }
    else if (storyStepIndex == 26) {
      boost(2);
    }
    else if (storyStepIndex == 45) {
      decor(2);
    }
    else if (storyStepIndex == 47) {
      decor(2);
    }
    else if (storyStepIndex == 48) {
      decor(1);
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
        nextScene: 3
      },
      {
        text: 'Repousser les gobelins avec le bouclier',
        requiredState: (currentState) => currentState.shield,
        nextScene: 4
      }
    ]
  },
  {
    id: 2,
    text: 'Vous avez combattu avec bravoure et vaincu les monstres mais leur chef se précipite vers vous.',
    options: [
      {
        text: 'Combattre le chef du groupe de gobelin (BOSS)',
        nextScene: -2
      },
      {
        text: 'Ecouter la voix et courir en direction de la ville',
        nextScene: 6
      },
    ]
  },
  {
  	id: 3,
  	text: 'Vous commencez à courir dans la direction opposée de celle des gobelins qui vous pourchasse mais la voix dans votre tête vous indique la direction de la ville.',
  	options: [
  		{
  			text: 'Ecouter la voix et courir vers la ville',
  			nextScene: 6
  		},
  	]
  },
  {
  	id: 4,
  	text: 'Vous réussissez à repousser les gobelins grâce à votre habileté au bouclier qui vous surprend également, mais il ne faut pas se reposer ! Les gobelins sont déjà prêt à vous attaquer de nouveau cependant vous voyez une épée au sol juste à votre droite et vous entendez la voix dans votre tête indiquant la direction de la ville.',
  	options: [
  		{
  			text: 'Ecouter la voix et courir vers la ville',
  			nextScene: 6
  		},
  		{
  			text: 'Ramasser l"épée tombée au sol',
  			nextScene: 7
  		},
  	]
  },
  {
  	id: 5,
  	text: 'Vous écrasez la tête du chef gobelin contre un arbre avec votre arme, victoire ! Mais il ne faut pas se reposer sur ses lauriers, il faut sortir de cette foret ! C"est alors que vous entendez une voix qui ne vous est pas familière.',
  	options: [
  		{
  			text: 'Sortir de la foret',
  			nextScene: 8
  		},
  		{
  			text: 'Se diriger vers la voix inconnue',
  			nextScene: -101
  		},
  	]
  },
  {
  	id: 6,
  	text: 'Vous commencez à courir sans vous arrêtez mais vous entendez une voix étrange qui ne vous est pas familière.',
  	options: [
  		{
  			text: 'Sortir de la foret',
  			nextScene: 8
  		},
  		{
  			text: 'Se diriger vers la voix inconnue',
  			nextScene: -101
  		},
  	]
  },
  {
  	id: 7,
  	text: 'Vous ramassez l"épée qui semble bien équilibrée, les gobelins deviennent plus prudent et commencent à vous encercler.',
  	options: [
  		{
  			text: 'Boter le cul des gobelins',
  			nextScene: 9
  		},
  		{
  			text: 'Exterminer les gobelins jusqu"au dernier',
  			nextScene: 9
  		},
  	]
  },
  {
  	id: 8,
  	text: 'Vous sortez enfin de la forêt et vous apercevez une ville : La voix dans ma tête avait raison !',
  	options: [
  		{
  			text: 'Entrer dans la ville',
  			nextScene: 10
  		},
  		{
  			text: 'Entrer dans la ville',
  			nextScene: 10
  		},
  	]
  },
  {
  	id: 9,
  	text: 'C"est un massacre ! Du sang de gobelins dégouline sur tout votre corps mais vous hésitez à continuer ou aller en ville.',
  	options: [
  		{
  			text: 'Entrer dans la ville',
  			nextScene: 10
  		},
  		{
  			text: 'Faire un genocide dans leur repaire',
  			nextScene: -8
  		},
  	]
  },
  {
  	id: 10,
  	text: 'Vous arrivez en ville et vous ressentez de la nostalgie accompagné d"un grand soulagement après en avoir finie avec ces gobelins. Mais que pouvez vous faire ?',
  	options: [
  		{
  			text: 'Aller au chateau en quete d"information',
  			nextScene: 12
  		},
  		{
  			text: 'Je n"ai pas le temps direction les plaines',
  			nextScene: 14
  		},
  	]
  },
  {
  	id: 11,
  	text: 'Après avoir été sans pitié et fais de la charpie de gobelins (enfants compris) et éradiquer ce repaire, vous réfléchissez à votre prochaine destination.',
  	options: [
  		{
  			text: 'Entrer en ville',
  			nextScene: 13
  		},
  		{
  			text: 'Se diriger vers les plaines',
  			nextScene: 14
  		},
  	]
  },
  {
  	id: 12,
  	text: 'Vous arrivez au chateau, celui-ci est remplis de vie et vous vous sentez à l"aise. Mais c"est à ce moment précis que la voix vous indique l"endroit où est détenue votre seconde moitié.',
  	options: [
  		{
  			text: 'Demander des informations aux rois',
  			nextScene: 15
  		},
  		{
  			text: 'Partir vers le lieu indiqué',
  			nextScene: 16
  		},
  	]
  },
  {
  	id: 13,
  	text: 'Vous êtes enfin entré en ville, cependant les citoyens s"écartent de vous à la vue du sang répandue sur tout votre corps. C"est là que le vous indique l"endroit où est détenue votre seconde moitié. ',
  	options: [
  		{
  			text: 'Partir vers le lieu indiqué',
  			nextScene: 16
  		},
  	]
  },
  {
  	id: 14,
  	text: 'Vous arrivez dans les plaines, des étendues de plat et d"herbes à perte de vue. Vous avancez jusqu"à apercevoir une horde de monstre se dirigeant vers vous.',
  	options: [
  		{
  			text: 'S"opposer à la horde de monstres',
  			nextScene: -3
  		},
  		{
  			text: 'Fuir',
  			nextScene: 17
  		},
      {
  			text: 'Se cacher dans les hautes herbes',
  			nextScene: 18
  		},
  	]
  },
  {
  	id: 15,
  	text: 'Le roi comprend la situation dans laquelle vous êtes et vous indique que l"endroit indiqué n"est d"autre que le chateau démoniaque où règne le fléau, pensant que cela est nécessaire il vous montre la direction de l"armurerie du palais et vous autorise à prendre un équipement.',
  	options: [
  		{
  			text: 'Partir',
  			nextScene: 19
  		},
  		{
  			text: 'Aller à l"armurerie',
  			nextScene: 20
  		},
      {
  			text: 'Demander des conseils au roi concernant votre periple',
  			nextScene: 21
  		},
  	]
  },
  {
  	id: 16,
  	text: 'Vous arrivez à la frontière entre le monde des humains et les terres ténébreuses où deux gardes sont postés en sentinelle.',
  	options: [
  		{
  			text: 'Terrasser les gardes de frontiere',
  			nextScene: -4
  		},
  		{
  			text: 'Chercher des indices et de l"equipement',
  			nextScene: 23
  		},
  	]
  },
  {
  	id: 17,
  	text: 'Vous fuyez de toute vos forces pour vous retrouvez par hasard devant la porte des terres ténébreuses. Vous apprenez que le chateau démoniaque se trouvant sur ces terres renferme votre seconde moitié.',
  	options: [
  		{
  			text: 'Pas le choix, terrasser les gardes de frontiere',
  			nextScene: -4
  		},
  	]
  },
  {
    id: 18,
    text: 'Vous vous cachez dans les hautes herbes et la horde commence à passer devant vous sans être alertée de votre présence.',
    options: [
      {
        text: 'Sortir des hautes herbes',
        nextScene: -102
      },
      {
        text: 'Attendre encore un peu',
        nextScene: 24
      },
    ]
  },
  {
    id: 19,
    text: 'Vous sortez du chateau en faisant vos adieux au roi puis vous prenez le chemin des terres ténébreuses.',
    options: [
      {
        text: 'Aller dans les terres ténébreuses.',
        nextScene: 27
      },
    ]
  },
  {
    id: 20,
    text: 'Vous entrez dans l"armurerie ravissante du palais royal tandis qu"une épée et une armure intégrale vous interpèle.',
    options: [
      {
        text: 'Prendre l"épée',
        nextScene: 25
      },
      {
        text: 'Prendre l"armure',
        nextScene: 26
      },
    ]
  },
  {
    id: 21,
    text: 'Le roi vous conseil de prendre une armure légère et de ne pas tenter d"entrer de front dans le palais démoniaque, il faut également faire très attention aux apparences.',
    options: [
      {
        text: 'Prendre l"armure et s"equiper',
        nextScene: 26
      },
      {
        text: 'Aller dans les terres tenebreuses',
        nextScene: 27
      },
    ]
  },
  {
    id: 22,
    text: 'Vous gagnez votre dur combat contre les gardes démoniaques et vous arrivez à la limite de la frontière.',
    options: [
      {
        text: 'Aller dans les terres tenebreuses',
        nextScene: 27
      },
    ]
  },
  {
    id: 23,
    text: 'Vous trouvez un casque détruit vous donnant une certaine nostalgie et un grimoire très étrange.',
    options: [
      {
        text: 'Aller dans les terres tenebreuses.',
        nextScene: 27
      },
      {
        text: 'Prendre le grimoire et l"ouvrir.',
        nextScene: 28
      },
    ]
  },
  {
    id: 24,
    text: 'La horde est passée, vous êtes encore stressé mais vous reprenez votre route.',
    options: [
      {
        text: 'Aller dans les terres tenebreuses.',
        nextScene: 27
      },
    ]
  },
  {
    id: 25,
    text: 'Vous choisissez l"épée en dépis de l"armure, elle brille d"un pur éclat et vous êtes satisfait de votre choix. Quand soudain la ville se fait attaquée par une horde de monstres.',
    options: [
      {
        text: 'Défendre la ville de l"attaque.',
        nextScene: -7
      },
      {
        text: 'Une attaque ? Osef partons sauver notre seconde moitié au palais demoniaque',
        nextScene: 30
      },
    ]
  },
  {
    id: 26,
    text: 'Vous choisissez l"armure en dépis de l"épée, elle vous va à ravir et vous êtes satisfait de votre choix. Quand soudain la ville se fait attaquée par une horde de monstres.',
    options: [
      {
        text: 'Defendre la ville de l"attaque.',
        nextScene: -7
      },
      {
        text: 'Une attaque ? Osef partons sauver notre seconde moitié au palais demoniaque',
        nextScene: 30
      },
    ]
  },
  {
    id: 27,
    text: 'Vous êtes entré dans les terres ténébreuses. ("Roulement de tambours") Mais attendez n"est pas une succube que je vois derrière cette arbuste ?',
    options: [
      {
        text: 'S"introduire dans le palais demoniaque',
        nextScene: 30
      },
      {
        text: 'Suivre la succube',
        nextScene: 31
      },
    ]
  },
  {
    id: 28,
    text: 'Vous ouvrez le grimoire et... Vous retrouvez une partie de vos souvenirs... Vous vous souvenez que vous êtes un ancien aventurier de rang argent et que... Arf vous vous souvenez que de ça. Vous apercevez une succube au loin après être entré dans les terres ténébreuses.',
    options: [
      {
        text: 'S"introduire dans le palais demoniaque',
        nextScene: 30
      },
      {
        text: 'Suivre la succube',
        nextScene: 31
      },
    ]
  },
  {
    id: 29,
    text: 'La défense de la ville se déroule bien et vous commencez à repousser avec l"aide des autres aventuriers de la ville les monstres.',
    options: [
      {
        text: 'Repousser l"assaut jusqu"au palais demoniaque',
        nextScene: 32
      },
    ]
  },
  {
    id: 30,
    text: 'Vous réussissez à vous introduire dans le palais, maintenant il faut accéder à la chambre où est retenue prisonnière votre seconde moitié. Vous trouvez la chambre qui est gardée par un champion gobelin.',
    options: [
      {
        text: 'Combattre le champion gobelin.',
        nextScene: -9
      },
      {
        text: 'Tenter une infiltration',
        nextScene: -103
      },
    ]
  },
  {
    id: 31,
    text: 'Vous commencez à suivre la succube qui entre dans le palais, vous entrez également puis elle s"arrête, c"est le moment de :',
    options: [
      {
        text: 'Succomber à son charme.',
        nextScene: -104
      },
      {
        text: 'Passe à l"attaque',
        nextScene: -5
      },
      {
        text: 'L"observer en cachette',
        nextScene: 35
      },
    ]
  },
  {
    id: 32,
    text: 'Vous repoussez les monstres avec succès et vous engagez avec les autres aventuriers un raid du palais, pendant la pagaille la voie vous fait voir une fille criant à l"aide... C"est votre seconde moitié ! Mais le roi gobelin maître des lieux se prépare à riposter.',
    options: [
      {
        text: 'Tanpis pour mes camarades, sauvons la d"abord !',
        nextScene: 36
      },
      {
        text: 'Ma priorite c"est la securite de tous, en garde Roi gobelin !',
        nextScene: -6
      },
    ]
  },
  {
    id: 33,
    text: 'Vous battez le champion gobelin, un franc succès. Vous apprenez que le roi gobelin et le maître des lieux et vit ici, quelle décision prendre...',
    options: [
      {
        text: 'Sauver votre seconde moitie',
        nextScene: 36
      },
      {
        text: 'EN FINIR !',
        nextScene: -6
      },
    ]
  },
  {
    id: 34,
    text: 'Vous battez la succube sans le moindre regret (C"est faux :3), quand soudain d"un cri de colère le Roi gobelin débarque en découvrant un de ses servants gisant au sol sans vie.',
    options: [
      {
        text: 'Ahah j"ai tué ta donselle en garde CHIEN !',
        nextScene: -6
      },
      {
        text: 'A ton tour Roi gobelin je te reduirai en poussiere !',
        nextScene: -6
      },
      {
        text: 'EN FINIR (sans mots) !',
        nextScene: -6
      },
    ]
  },
  {
    id: 35,
    text: 'Vous observez la scene, le général gobelin compagnon et fidèle servant du Roi gobelin arrive et discute avec la succube, après une longue discution stratégique, la succube part laissant la possibilité d"assassiner le général dans le dos.',
    options: [
      {
        text: 'Assassiner le general gobelin',
        nextScene: 38
      },
    ]
  },
  {
    id: 36,
    text: 'Vous rejoignez votre seconde moitié, vous la prenez sur votre dos mais le Roi gobelin semble ne pas vouloir vous laissez faire.',
    options: [
      {
        text: 'Fuyons !',
        nextScene: 39
      },
      {
        text: 'Je dois le faire, a mort Roi gobelin !',
        nextScene: -10
      },
    ]
  },
  {
    id: 37,
    text: 'Il... Il est mort ? VICTOIRE vous avez vaincu le Roi gobelin que faîtes vous ?.',
    options: [
      {
        text: 'Sauvons notre seconde moitie !',
        nextScene: 41
      },
      {
        text: 'Executer le Roi gobelin car il semble encore respirer !',
        nextScene: 42
      },
      {
        text: 'Retourner au chateau !',
        nextScene: 43
      },
    ]
  },
  {
    id: 38,
    text: 'Sans s"en rendre compte, le general avait son torse persé par une épée, dans son dernier répit il soupire : "Goblin Slayer !!!" A ce moment précis vous commencez à avoir très mal à la tête.',
    options: [
      {
        text: 'Comprendre qui vous êtes !',
        nextScene: 44
      },
    ]
  },
  {
    id: 39,
    text: 'Vous prenez la fuite abandonnant tout derrière vous.',
    options: [
      {
        text: 'Fin ?',
        nextScene: 49
      },
    ]
  },
  {
    id: 40,
    text: 'Se fut un combat rude et intense en émotions mais il est mort enfin ! Dans son dernier soupire il dit : "Mahesvara ! Goblin Slayer !".',
    options: [
      {
        text: 'Qui etes vous ?',
        nextScene: 46
      },
      {
        text: 'Retourner au chateau tout en reflechissant a ces paroles',
        nextScene: 47
      },
    ]
  },
  {
    id: 41,
    text: 'Vous prenez votre seconde moitié et vous retournez ensemble au chateau.',
    options: [
      {
        text: 'Retour au chateau',
        nextScene: 47
      },
    ]
  },
  {
    id: 42,
    text: 'Au moment de l"éxécution le Roi gobelin vous surnomme "Mahesvara", la voix vous indique que cela signifie "Destructeur de gobelin". Souriant vous trancher la tête du Roi, puis vous regardez en direction de votre seconde moitié',
    options: [
      {
        text: 'Sauver votre seconde moitié et retourner en ville',
        nextScene: 48
      },
    ]
  },
  {
    id: 43,
    text: 'Beh alors ? On oublie l"essentiel ? Souligne la voix dans votre tête, en rentrant vous vous rendez compte que vous n"avez pas sauver votre seconde moitié et quelle est morte dans la bataille.',
    options: [
      {
        text: 'BAD END (restart)',
        nextScene: 0
      },
      {
        text: 'BAD END (restart)',
        nextScene: 0
      },
    ]
  },
  {
    id: 44,
    text: 'Vous comprenez qui vous êtes avec les éléments trouvés lors de votre périple, vous êtes Goblin Slayer un aventurier de rang argent que tout gobelin redoute dans ce monde ! Pendant ce temps de réfléxion vous vous rendez compte que votre seconde moitié est devant vous les larmes aux yeux...',
    options: [
      {
        text: 'Partir avec elle et retourner en ville',
        nextScene: 48
      },
    ]
  },
  {
    id: 45,
    text: 'Vous retournez au chateau ensemble et vous apprenez que votre seconde moitié n"etait autre que votre adorable soeur Misha qui vous rememore tous vos souvenirs perdus.',
    options: [
      {
        text: 'HAPPY ENDING (Avec les applaudissements du narrateur)'
      },
      {
        text: 'relancez votre page pour recommencer une nouvelle aventure'
      },
    ]
  },
  {
    id: 46,
    text: 'Vous apprenez de la voix dans votre tête que vous êtes Goblin Slayer un aventurier de rang argent que tout gobelin redoute dans ce monde ! La voix finie par disparaître. ',
    options: [
      {
        text: 'Retourner en ville ensemble.',
        nextScene: 48
      },
    ]
  },
  {
    id: 47,
    text: 'Lors du retour vous apprenez que votre seconde moitié n"est d"autre que votre adorable soeur. De retour au chateau pour parler au Roi de vos accomplissements celui-ci se rappelle que de vous et de qui vous êtes : Goblin Slayer un aventurier de rang argent que tout gobelin redoute dans ce monde ! Heureux de l"apprendre, vous remercier le Roi et repartez pour de nouvelle aventures accompagné de votre soeur.  ',
    options: [
      {
        text: 'HAPPY ENDING (Avec les applaudissements du narrateur)'
      },
      {
        text: 'relancez votre page pour recommencer une nouvelle aventure'
      },
    ]
  },
  {
    id: 48,
    text: 'Vous rentrez en ville sain et sauf avec votre seconde moitié qui n"est d"autre que votre soeur. Vous vivez des moments heureux et vous repartez ensemble à l"aventure ',
    options: [
      {
        text: 'HAPPY ENDING (Avec les applaudissements du narrateur)'
      },
      {
        text: 'relancez votre page pour recommencer une nouvelle aventure'
      },
    ]
  },
  {
    id: 49,
    text: 'Vous abandonnez tout derrière vous et vous recommencer votre vie dans une ferme en campagne avec votre seconde moitié qui est en fait votre soeur ! ',
    options: [
      {
        text: 'HAPPY ENDING (Avec les petits applaudissements du narrateur : comme quoi fuir est parfois utile !)'
      },
      {
        text: 'relancez votre page pour recommencer une nouvelle aventure'
      },
    ]
  },

  // Les scenes -100 à -104 sont les mêmes mais n'activent pas la même alert dans gameOver()
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
  {
    id: -101,
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
  {
    id: -102,
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
  {
    id: -103,
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
  {
    id: -104,
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

function combat(optionCombat) {
    let typeAttack = optionCombat;
    // Qui va attaquer le premier ?
    let getPlayerSpeed = player.speed;
    let getEnnemySpeed = ennemy.speed;
    // Récupération de plusieurs statistiques pour l'actualisation de celles-ci pendant le combat
    let getEnnemyName = ennemy.name;
    let getPlayerStamina = document.querySelector('.stamina_player');
    let getPlayerMana = document.querySelector('.mana_player');
    let getPlayerLevel = document.querySelector('.level_player');
    let getPlayerHealth = document.querySelector('.health_player');
    let getPlayerGold = document.querySelector('.gold_player');
    let getEnnemyHealth = document.querySelector('.health_ennemy');


    // Attaque des monstres
    let ennemyDamage = ennemy.strenght + Math.floor(Math.random() * (4 - 1 +1)) + 1;
    // Attaque du joueur
    let baseDamage = player.strenght;
    // Dégâts supplémentaires pour effet random
    let suppDamage = Math.floor(Math.random() * (7 - 1 +1)) + 1;
    if (player.stamina > 0 && typeAttack == 1) { // Attaque de base : n'utilise pas de stamina
      baseDamage = player.strenght;
    }
    else if (player.stamina >= 40 && optionCombat == 2) { // Attaque spéciale : plus de puissance mais utilise beaucoup de stamina !
      baseDamage = player.strenght * 2;
      player.stamina -= 40;
    }
    else if (player.mana > 0 && optionCombat == 3) { // Soin : utilisable qu'une seule fois par combat pour le héros masculin et deux fois pour la femme!
      player.health += 60;
      player.mana -= 100;
      baseDamage = 0;
      suppDamage = 0;
      if (player.health > maxHealthHomme && player.name == "Unknown_M") {
        player.health = maxHealthHomme;
      }
      else if (player.health > maxHealthFemme && player.name == "Unknown_F") {
        player.health = maxHealthFemme;
      }
    }
    else {
      if (optionCombat == 3 && player.mana <= 0) {
        alert("Vous êtes à court de mana, vous lancez une attaque normale !");
        baseDamage = player.strenght;
      }
      if (optionCombat == 2 && player.stamina < 40) {
        alert("Vous êtes épuisé, vous lancez une attaque normale !");
        baseDamage = player.strenght;
      }
    }
    let trueDamage = baseDamage + suppDamage;
    let hitCount = Math.floor(Math.random() * Math.floor(player.speed / 10)) + 1;
    let attackEtapes = [trueDamage, hitCount];


    // Au tour du joueur d'attaquer
    if (getPlayerSpeed >= getEnnemySpeed) {
      let playerDamage = attackEtapes[0] * attackEtapes[1];
      ennemy.health = ennemy.health - playerDamage;
      alert("Vous avez touché  " + ennemy.name + " " + attackEtapes[1] + " fois avec " + attackEtapes[0] + " de degats");
      if (ennemy.health <= 0) {
        alert("Vous avez gagné , vous gagnez un niveau ! Votre mana est se régénère.");
        player.level += 1;
        player.mana += 100;
        getPlayerMana.innerHTML = 'Mana: ' + player.mana;
        getPlayerStamina.innerHTML = 'Stamina: ' + player.stamina;
        getPlayerLevel.innerHTML = 'Niveau: ' + player.level;
        getPlayerHealth.innerHTML = 'Hp: ' + player.health;
        getEnnemyHealth.innerHTML = 'Hp: 0';
        player.money = player.money + ennemy.money;
        getPlayerGold.innerHTML = 'Gold: ' + player.money;
        afterCombat(getEnnemyName);
      }
      else {
        getPlayerMana.innerHTML = 'Mana: ' + player.mana;
        getPlayerStamina.innerHTML = 'Stamina: ' + player.stamina;
        getEnnemyHealth.innerHTML = 'Health ' + ennemy.health;
        // Au tour du monstre d'attaquer
        let ennemyStrike = ennemyDamage;
        player.health = player.health - ennemyStrike;
        alert("Vous avez subit " + ennemyStrike + " de dégâts de " + ennemy.name);
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
      alert("Vous avez subit " + ennemyStrike + " de dégâts de " + ennemy.name);
      if (player.health <= 0) {
        alert("Vous avez perdu , vous êtes mort !");
        getPlayerHealth.innerHTML = 'Hp: 0';
        getEnnemyHealth.innerHTML = 'Hp: ' + ennemy.health;
        gameOver();
      }
      else {
        getPlayerHealth.innerHTML = 'Hp: ' + player.health;
        let playerDamage = attackEtapes[0] * attackEtapes[1];
        ennemy.health = ennemy.health - playerDamage;
        alert("Vous avez touché  " + ennemy.name + " " + attackEtapes[1] + " fois avec " + attackEtapes[0] + " de degats");
        if (ennemy.health <= 0) {
          alert("Vous avez gagné , vous gagnez un niveau ! Votre mana est se régénère.");
          player.level += 1;
          player.mana += 100;
          getPlayerLevel.innerHTML = 'Niveau: ' + player.level;
          getPlayerMana.innerHTML = 'Mana: ' + player.mana;
          getPlayerStamina.innerHTML = 'Stamina: ' + player.stamina;
          getPlayerHealth.innerHTML = 'Hp: ' + player.health;
          getEnnemyHealth.innerHTML = 'Hp: 0';
          player.money = player.money + ennemy.money;
          getPlayerGold.innerHTML = 'Gold: ' + player.money;
          afterCombat(getEnnemyName);
        }
        else {
          getPlayerMana.innerHTML = 'Mana: ' + player.mana;
          getPlayerStamina.innerHTML = 'Stamina: ' + player.stamina;
          getEnnemyHealth.innerHTML = 'Hp: ' + ennemy.health;
        }
      }
    }
}

//Création de la fonction joueur qui peut être également une classe
function Player(health, strenght, name, money, stamina, mana, speed, level){
  this.health = health;
  this.strenght = strenght;
  this.name = name;
  this.money = money;
  this.stamina = stamina;
  this.mana = mana;
  this.speed = speed;
  this.level = level;
}

/*La fonction qui permet la création du personnage au début du jeu
avec l'affichage de ses statistiques*/
function  affichagePlayer() {
    let getDivPlayer = document.querySelector('.playerStats');
    let sexe = prompt("Etes vous un homme ou une femme ?");
    if (sexe == "homme" || sexe == "Homme"){
      player = new Player(120, 28, "Unknown_M", 10, 100, 100, 20, 1);
      getDivPlayer.innerHTML = '<img src="img/homme.png" class="player_avatar"><div><p class="health_player">Hp: '
      + player.health + '</p><p class="stamina_player">Stamina: ' + player.stamina + '</p><p class="mana_player">Stamina: ' + player.mana + '</p><p class="strenght_player">Force: ' + player.strenght + '</p><p>Nom: '
      + player.name + '</p><p class="gold_player">Gold: ' + player.money + '</p><p class="level_player">Niveau: ' + player.level + '</p></div>';
    }
    else if (sexe == "femme" || sexe == "femme") {
      player = new Player(100, 20, "Unknown_F", 10, 120, 200, 40, 1);
      getDivPlayer.innerHTML = '<img src="img/femme.png" class="player_avatar"><div><p class="health_player">Hp: '
      + player.health + '</p><p class="stamina_player">Stamina: ' + player.stamina + '</p><p class="mana_player">Stamina: ' + player.mana + '</p><p class="strenght_player">Force: ' + player.strenght + '</p><p>Nom: '
      + player.name + '</p><p class="gold_player">Gold: ' + player.money + '</p><p class="level_player">Niveau: ' + player.level + '</p></div>';
    }
    else {
      affichagePlayer();
    }
  }

/* Fonction pour restaurer ses points de vies à chaque grande étape du jeu
(Remplace les potions de vies et rend le jeu "finissable")*/
function restoration() {
  let getPlayerHealth = document.querySelector('.health_player');
  let getPlayerStamina = document.querySelector('.stamina_player');
  let restaurer = confirm("Vous avez changer de lieu, voulez-vous vous reposez un peu ? (Restaure vos Hp et votre stamina)");
  if (restaurer && player.name == "Unknown_M") {
    if (maxHealthHomme > 120) {
      player.health = 160;
      getPlayerHealth.innerHTML = 'Hp: ' + player.health;
      player.stamina = 100;
      getPlayerStamina.innerHTML = 'Stamina: ' + player.stamina;
    }
    else {
      player.health = 120;
      getPlayerHealth.innerHTML = 'Hp: ' + player.health;
      player.stamina = 100;
      getPlayerStamina.innerHTML = 'Stamina: ' + player.stamina;
    }
  }
  else if (restaurer && player.name == "Unknown_F") {
    if (maxHealthFemme > 100) {
      player.health = 140;
      getPlayerHealth.innerHTML = 'Hp: ' + player.health;
      player.stamina = 120;
      getPlayerStamina.innerHTML = 'Stamina: ' + player.stamina;
    }
    else {
      player.health = 100;
      getPlayerHealth.innerHTML = 'Hp: ' + player.health;
      player.stamina = 120;
      getPlayerStamina.innerHTML = 'Stamina: ' + player.stamina;
    }
  }
}

/* Fonction correspondant à la partie du jeu où le joueur va à l'armurerie royale afin
de choisir un nouvel équipement*/
function boost(index) {
  let getPlayerStrenght = document.querySelector('.strenght_player');
  let getPlayerHealth = document.querySelector('.health_player');
  if (index == 1) {
    player.strenght += 15;
    getPlayerStrenght.innerHTML = 'Force: ' + player.strenght;
    alert("Vous avez choisi l'épée : vous gagnez 15 de force.");
  }
  else if (index == 2) {
    if (player.name == "Unknown_M") {
      maxHealthHomme += 40;
    }
    else if (player.name == "Unknown_F") {
      maxHealthFemme += 40;
    }
    player.health += 40;
    getPlayerHealth.innerHTML = 'Hp: ' + player.health;
    alert("Vous avez choisi l'armure : vous gagnez 60 Hp maximum.");
  }
}
//Changement du décor
function decor(indexDecor) {
  if (indexDecor == 1) {
    document.getElementById('deco').style.background = "url(img/ville.jpg) no-repeat center #333";
  }
  if (indexDecor == 2) {
    document.getElementById('deco').style.background = "url(img/chateau.jpg) no-repeat center #333";
  }
  if (indexDecor == 3) {
    document.getElementById('deco').style.background = "url(img/plaines.jpg) no-repeat center #333";
  }
  if (indexDecor == 4) {
    document.getElementById('deco').style.background = "url(img/demonland.jpg) no-repeat center #333";
  }
  if (indexDecor == 5) {
    document.getElementById('deco').style.background = "url(img/chateauD.jpg) no-repeat center #333";
  }
}
//Création des monstres et lancement des combats et affichage de leur stats #1
function interfaceCombat() {
  let getZoneCombat = document.querySelector('.combat');
  let getEnnemy = document.querySelector('.ennemy');
  getZoneCombat.innerHTML  += '<a href="#" class="prefight" onclick="combat(1)"> Attaquer !</a><a href="#" class="prefight" onclick="combat(2)"> Spécial !</a><a href="#" class="prefight" onclick="combat(3)"> Soin !</a>';
  getEnnemy.innerHTML += '<div><h3>' + ennemy.name + '</h3><p class="health_ennemy">Health: '
  + ennemy.health + '</p><p>Strenght: ' + ennemy.strenght + '</p></div>';
}

//Création des monstres et lancement des combats et affichage de leur stats #2
function zoneCombat(numCombat) {
  let ennemyGoblin = new Ennemy ("Goblin", 30, 5, 5, 17);
  let ennemyGoblins = new Ennemy ("Goblins", 55, 9, 10, 17);
  let ennemyChefTribalGoblin = new Ennemy ("Chef Goblin", 50, 9, 20, 19);
  let ennemyHorde = new Ennemy ("Horde de monstres", 500, 50, 700, 10);
  let ennemyGardeTenebreux = new Ennemy ("Gardes Ténébreux", 75, 20, 50, 15);
  let ennemySuccube = new Ennemy ("Succube", 80, 12, 100, 40);
  let ennemyRoiGoblin = new Ennemy ("Roi Goblin", 180, 30, 300, 19);
  let ennemyRoiGoblinVener = new Ennemy ("Roi Goblin Vener", 190, 32, 350, 19);
  let ennemyDemon = new Ennemy ("Demon", 70, 12, 45, 22);
  let ennemyChampion = new Ennemy ("Champion Goblin", 100, 20, 100, 10);
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
      ennemy = ennemyGoblins;
      interfaceCombat();
      combat();
      break;
    case 8:
      ennemy = ennemyChampion;
      interfaceCombat();
      combat();
      break;
    case 9:
      ennemy = ennemyRoiGoblinVener;
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
    showStoryLine(2);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Goblins") {
    showStoryLine(11);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Chef Goblin") {
    showStoryLine(5);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Horde de monstres") {
    showStoryLine(22);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Gardes Ténébreux") {
    showStoryLine(22);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Succube") {
    showStoryLine(34);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Roi Goblin") {
    showStoryLine(37);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Roi Goblin Vener") {
    showStoryLine(40);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Demon") {
    showStoryLine(29);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else if (name == "Champion Goblin") {
    showStoryLine(33);
    getEnnemy.innerHTML = '';
    getZoneCombat.innerHTML = '';
  }
  else {
    alert("Erreur redémarrez la page !");
  }
}

function gameOver(id) {
  let elementsChoix = document.getElementById('choices');
  if (id == 1 && player.name == "Unknown_M") {
    alert("Les gobelins ne sont pas effrayés et vous mutilent...");
  }
  else if (id == 1 && player.name == "Unknown_F") {
    alert("Les gobelins ne sont pas effrayés et vous violent en vous ramene dans leur antre...");
  }
  else if (id == 2) {
    alert("La voix inconnu n'etait autre qu'une mandragore qui vous fusile du regard et fait de vous son 4 heure");
  }
  else if (id == 3) {
    alert("Dommage il restait quelques monstres retardataires qui n'ont fait qu'une bouchée de vous.");
  }
  else if (id == 4) {
    alert("Vous passez discrètement jusqu'à se que votre tête se retrouve pressée contre le sol par la massue immense du champion gobelin qui vous avez repéré.");
  }
  else if (id == 5) {
    alert("BAD END : Charmé, vous devenez l'esclave sexuel personnel de la succube qui suce votre énergie vitale chaque jour et ce jusqu'à la fin de vos jours.");
  }
  let over = document.getElementById('gameover');
  over.classList.remove("disabled");
  audio_death.play();
  elementsChoix.innerHTML = '';

}

initGame();
