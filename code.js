// Default character object with HP
let character = {
    name: "Lima",
    level: 1,
    class: "Warrior",
    experience: 0,
    hp: 20, // Health points
    potions: 3 // Number of potions per level
};

// Define multiple creatures with names and reward drop rates
const creatures = [
    {
        name: "Crow",
        nameAtk: "Peck",
        hp: 20,
        minAtk: 1,
        maxAtk: 4,
        missChance: 10,
        baseExp: 15,
        expRange: [2, 5],
        encounterRate: 3,
        rewardDrop: 20 // 20% chance to get an extra potion
    },
    {
        name: "Spider",
        nameAtk: "Bite",
        hp: 10,
        minAtk: 1,
        maxAtk: 2,
        missChance: 4,
        baseExp: 10,
        expRange: [2, 4],
        encounterRate: 4,
        rewardDrop: 10 // 10% chance to get an extra potion
    },
    {
        name: "Possum",
        nameAtk: "Bite",
        hp: 20,
        minAtk: 2,
        maxAtk: 4,
        missChance: 10,
        baseExp: 20,
        expRange: [2, 5],
        encounterRate: 1,
        rewardDrop: 40 // 40% chance to get an extra potion
    }
];

// Battle status
let inBattle = false;
let currentCreature = null;

// Display character info and HP
function displayCharacter() {
    document.getElementById("character-info").innerHTML = `
        <em>~BATTLE://</em>
        <p>Name: <em class="heroMark">${character.name}</em></p>
        <p>Level: ${character.level}</p>
        <p>Class: ${character.class}</p>
        <p>Experience: ${character.experience}</p>
        <p>HP: <em class="hpMark">${character.hp}HP</em></p>
        <p>Potions: ${character.potions}</p>
    `;
}

// Store character in localStorage using a fixed key
function saveCharacter() {
    localStorage.setItem('rpg-character', JSON.stringify(character));
}

// Load character from localStorage
function loadCharacter() {
    const savedCharacter = localStorage.getItem('rpg-character');
    if (savedCharacter) {
        character = JSON.parse(savedCharacter);
    }
    displayCharacter();
}

// Check and level up the character based on experience
function levelUp() {
    const xpToLevel = [35, 80, 135, 200, 275, 360, 455, 560, 675, 800]; // XP needed for levels 2 to 10
    let level = character.level - 1;
    while (level < xpToLevel.length && character.experience >= xpToLevel[level]) {
        level++;
    }
    character.level = level + 1;
}

// Random number generator within a range
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Randomly select a creature
function selectCreature() {
    const availableCreatures = creatures.filter(creature => getRandom(1, 10) <= creature.encounterRate);
    if (availableCreatures.length > 0) {
        const creatureIndex = getRandom(0, availableCreatures.length - 1);
        return availableCreatures[creatureIndex];
    }
    return null; // No creature encountered
}

// Start a battle
function startBattle() {
    if (character.hp <= 0) {
        alert("You can't battle, your character is dead. Create a new character.");
        return;
    }

    currentCreature = selectCreature();
    if (currentCreature === null) {
        document.getElementById("battle-log").innerHTML = "No creature encountered. Battle canceled.<br>";
        return;
    }

    currentCreature.hp = 20; // Reset creature's HP for each battle
    inBattle = true; // Set battle status to true
    document.getElementById("start-battle-btn").style.display = "none";
    document.getElementById("Bite-btn").style.display = "inline";
    document.getElementById("Scratch-btn").style.display = "inline";
    document.getElementById("potion-btn").style.display = "inline";
    document.getElementById("battle-log").innerHTML = `Battle begins against <span class="tags are-medium has-addons"><span class="tag is-danger">${currentCreature.name}</span><span class="tag is-danger is-light">${currentCreature.hp}HP</span></span>`;
}

// Use Bite
function useBite() {
    if (!inBattle) return;

    let characterAtk = getRandom(3, 6); // Bite attack damage
    currentCreature.hp -= characterAtk;
    document.getElementById("battle-log").innerHTML += `<em class="heroMark">${character.name}</em> dealt 1D6 (<em class="atkMark">${characterAtk}</em>) damage to <em class="enemyMark">${currentCreature.name}</em> with your Bite: <em class="hpMark">${currentCreature.hp}HP</em><br>`;

    if (currentCreature.hp <= 0) {
        let experienceGain = currentCreature.baseExp + getRandom(...currentCreature.expRange);
        document.getElementById("battle-log").innerHTML += `You defeated <em class="enemyMark">${currentCreature.name}</em> and gained ${experienceGain} XP!<br>`;
        character.experience += experienceGain; // Award XP for winning
        levelUp(); // Check for level up
        saveCharacter();
        displayCharacter();
        endBattle();
        return;
    }
    creatureAttack();
}
// Use Scratch
function useScratch() {
    if (!inBattle) return;

    let damage1 = getRandom(1, 4);
    let damage2 = getRandom(1, 4);
    currentCreature.hp -= (damage1 + damage2);
    document.getElementById("battle-log").innerHTML += `<em class="heroMark">${character.name}</em> dealt 2D4 (<em class="atkMark">${damage1} + ${damage2}</em>) Scratch damage to <em class="enemyMark"> ${currentCreature.name}</em>: <em class="hpMark">${currentCreature.hp}HP</em><br>`;

    if (currentCreature.hp <= 0) {
        let experienceGain = currentCreature.baseExp + getRandom(...currentCreature.expRange);
        document.getElementById("battle-log").innerHTML += `You defeated <em class="enemyMark">${currentCreature.name}</em>and gained ${experienceGain} XP!<br>`;
        character.experience += experienceGain; // Award XP for winning
        levelUp(); // Check for level up
        saveCharacter();
        displayCharacter();
        endBattle();
        return;
    }

    creatureAttack();
}

// Use Potion
function usePotion() {
    if (!inBattle || character.potions <= 0) return;

    character.hp += 10;
    if (character.hp > 20) character.hp = 20; // Cap HP at 20
    character.potions -= 1;
    document.getElementById("battle-log").innerHTML += `You used a potion and regained 10 HP. <em class="heroMark">${character.name}'s</em><em class="hpMark">${character.hp}HP</em>: ${character.hp}. Potions left: ${character.potions}<br>`;

    creatureAttack();
}

// Creature attacks the player
function creatureAttack() {
    let creatureMiss = getRandom(1, 10); // Creature has a 1-in-10 chance to miss
    if (creatureMiss <= (currentCreature.missChance / 10)) {
        document.getElementById("battle-log").innerHTML += `<em class="enemyMark">${currentCreature.name}</em> missed!<br>`;
    } else {
        let creatureAtk = getRandom(currentCreature.minAtk, currentCreature.maxAtk); // Creature's random attack
        character.hp -= creatureAtk;
        document.getElementById("battle-log").innerHTML += `<em class="enemyMark">${currentCreature.name}</em>'s ${currentCreature.nameAtk} dealt ${creatureAtk} damage to you. <em class="heroMark">${character.name}'s</em><em class="hpMark">${character.hp}HP</em><hr />`;

        if (character.hp <= 0) {
            document.getElementById("battle-log").innerHTML += "You were defeated! Game over.<br>";
            character.hp = 0; // Ensure HP doesn't go below 0
            saveCharacter();
            displayCharacter();
            endBattle();
        }
    }
}

// End the battle
function endBattle() {
    // Chance to drop an additional potion based on rewardDrop rate
    if (getRandom(1, 100) <= currentCreature.rewardDrop) {
        character.potions += 1;
        document.getElementById("battle-log").innerHTML += `You found an extra potion! Total potions: ${character.potions}<br>`;
    }

    inBattle = false; // Set battle status to false
    document.getElementById("start-battle-btn").style.display = "inline";
    document.getElementById("Bite-btn").style.display = "none";
    document.getElementById("Scratch-btn").style.display = "none";
    document.getElementById("potion-btn").style.display = "none";
}

// Handle new character creation
document.getElementById('create-character-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page
    const name = document.getElementById('name').value;
    const characterClass = document.getElementById('class').value;
    character = {
        name: name,
        level: 1,
        class: characterClass,
        experience: 0,
        hp: 20,
        potions: 3
    };
    saveCharacter();
    displayCharacter();
    showTab('info'); // Go back to character info tab
});

// Handle name change
document.getElementById('change-name-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page
    const newName = document.getElementById('new-name').value;
    character.name = newName;
    saveCharacter();
    displayCharacter();
});

// Show the appropriate tab
function showTab(tabId) {
    document.getElementById('info-tab').style.display = 'none';
    document.getElementById('edit-tab').style.display = 'none';
    document.getElementById(tabId + '-tab').style.display = 'block';
}

// Initial setup
window.onload = function() {
    loadCharacter();
    showTab('info'); // Show the character info tab by default
};




document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {

          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');

        });
      });
    }

  });
