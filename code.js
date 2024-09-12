// Default character object with HP, potions, and initial stats
let character = {
    name: "Cat",           // Character's default name
    level: 1,              // Starting level
    class: "Cat",       // Default class
    experience: 0,         // Starting experience
    hp: 20,                // Health points (based on class)
    potions: 2             // Potions available per level (based on class)
};

// Array of creatures with attributes including name, health, attack stats, and encounter rates
const creatures = [
    {
        name: "Crow",
        nameAtk: "Peck",   // Attack type
        hp: 20,            // Creature's health points
        lvl: 1,            // Creature's level
        minAtk: 1,         // Minimum attack damage
        maxAtk: 4,         // Maximum attack damage
        missChance: 20,    // 20% chance to miss
        baseExp: 15,       // Base experience rewarded
        expRange: [2, 5],  // Random additional experience range
        encounterRate: 3,  // 3 in 10 chance to encounter
        rewardDrop: 20     // 20% chance to drop an extra potion
    },
    {
        name: "Spider",
        nameAtk: "Bite",   // Attack type
        hp: 10,            // Creature's health points
        lvl: 1,            // Creature's level
        minAtk: 1,         // Minimum attack damage
        maxAtk: 2,         // Maximum attack damage
        missChance: 40,    // 10% chance to miss
        baseExp: 10,       // Base experience rewarded
        expRange: [2, 4],  // Random additional experience range
        encounterRate: 4,  // 4 in 10 chance to encounter
        rewardDrop: 10     // 10% chance to drop an extra potion
    },
    {
        name: "Possum",

        nameAtk: "Bite",   // Attack type
        hp: 20,            // Creature's health points
        lvl: 2,            // Creature's level
        minAtk: 2,         // Minimum attack damage
        maxAtk: 4,         // Maximum attack damage
        missChance: 10,    // 10% chance to miss
        baseExp: 20,       // Base experience rewarded
        expRange: [2, 5],  // Random additional experience range
        encounterRate: 1,  // 1 in 10 chance to encounter
        rewardDrop: 40     // 40% chance to drop an extra potion
    }
];

// Variables for managing battle state
let inBattle = false;
let currentCreature = null;  // Creature currently in battle

// Display character info and HP in HTML
function displayCharacter() {
    document.getElementById("character-info").innerHTML = `

    <div class="field is-grouped is-grouped-multiline">
        <div class="control">
            <div class="tags has-addons are-medium">
                <span class="tag is-dark">Name</span>
                <span class="tag is-primary">${character.name}</span>
            </div>
        </div>
        
        <div class="control">
            <div class="tags has-addons are-medium">
                <span class="tag is-dark">Class</span>
                <span class="tag is-link">${character.class}</span>
            </div>
        </div>
        
        <div class="control">
            <div class="tags has-addons are-medium">
                <span class="tag is-dark">Lvl</span>
                <span class="tag is-warning">${character.level}</span>
            </div>
        </div>
        
        <div class="control">
            <div class="tags has-addons are-medium">
                <span class="tag is-dark">Health</span>
                <span class="tag is-danger is-light">${character.hp}HP</span>
            </div>
        </div>
        
        <div class="control">
            <div class="tags has-addons are-medium">
                <span class="tag is-dark">EXP</span>
                <span class="tag is-success is-light">${character.experience}XP</span>
            </div>
        </div>
        
        <div class="control">
            <div class="tags has-addons are-medium">
                <span class="tag is-dark">Potions</span>
                <span class="tag is-info">${character.potions}</span>
            </div>
        </div>
        
    </div><br>  

    `;
}

// Save character data in localStorage
function saveCharacter() {
    localStorage.setItem('rpg-character', JSON.stringify(character));
}

// Load character data from localStorage
function loadCharacter() {
    const savedCharacter = localStorage.getItem('rpg-character');
    if (savedCharacter) {
        character = JSON.parse(savedCharacter);
    }
    displayCharacter();
}

// Adjust character properties based on class
function setClassAttributes(characterClass) {
    if (characterClass === "Cat") {
        character.hp = 20;
        character.potions = 2;
    } else if (characterClass === "FatCat") {
        character.hp = 30;
        character.potions = 3;
        document.getElementById("Scratch-btn").style.display = "none"; // Disable Scratch for Class2
    } else if (characterClass === "SneakyCat") {
        character.hp = 20;
        character.potions = 1;
    }
}


// Check and handle leveling up based on experience
function levelUp() {
    const xpToLevel = [35, 80, 135, 200, 275, 360, 455, 560, 675, 800]; // XP thresholds for levels
    let level = character.level - 1;
    while (level < xpToLevel.length && character.experience >= xpToLevel[level]) {
        level++;
    }
    character.level = level + 1;
}

// Random number generator within a specified range
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Randomly select a creature based on encounter rates
function selectCreature() {
    const availableCreatures = creatures.filter(creature => getRandom(1, 10) <= creature.encounterRate);
    if (availableCreatures.length > 0) {
        const creatureIndex = getRandom(0, availableCreatures.length - 1);
        return availableCreatures[creatureIndex];
    }
    return null; // No creature encountered
}




// Start a battle with a randomly selected creature
function startBattle() {
    if (character.hp <= 0) {
        alert("RIP, Gone but not forgotten. Create a new character.");
        return;
    }

    currentCreature = selectCreature();
    if (currentCreature === null) {
        document.getElementById("battle-log").innerHTML = "No creature encountered, you are moving along.<br>";
        return;
    }

    currentCreature.hp = 20; // Reset creature's HP for each battle
    inBattle = true;
    document.getElementById("start-battle-btn").style.display = "none";
    document.getElementById("Bite-btn").style.display = "inline";
    document.getElementById("Scratch-btn").style.display = "inline";
    document.getElementById("potion-btn").style.display = "inline";
    document.getElementById("battle-log").innerHTML = `<li class="is-tight">You've encountered a creature! Battle begins against: 
        <span class="tags are-large has-addons">
            <span class="tag is-danger">${currentCreature.name}</span>
            <span class="tag is-danger is-light">${currentCreature.hp}HP</span>
            <span class="tag is-warning">${currentCreature.lvl}</span>
        </span>
    `;
}

// Attack using Bite ability
function useBite() {
    if (!inBattle) return;

    let characterAtk = getRandom(3, 6); // Bite attack damage
    currentCreature.hp -= characterAtk;
    document.getElementById("battle-log").innerHTML = `<li class="is-tight">
    <em class="heroMark">${character.name}'s</em> <em class="atkMark">Bite</em> dealt (<span class="heroMark">${characterAtk}</span>) DMG to 
    <em class="enemyMark">${currentCreature.name}</em> : <em class="hpMark">${currentCreature.hp}HP</em><br>
    </li>` + document.getElementById("battle-log").innerHTML;

    if (currentCreature.hp <= 0) {
        let experienceGain = currentCreature.baseExp + getRandom(...currentCreature.expRange);
        document.getElementById("battle-log").innerHTML = `<li class="is-tight">You defeated <em class="enemyMark">${currentCreature.name}</em> and gained ${experienceGain} XP!<br></li>` + document.getElementById("battle-log").innerHTML;
        character.experience += experienceGain; // Award XP for winning
        levelUp(); // Check for level up
        saveCharacter();
        displayCharacter();
        endBattle();
        return;
    }
    creatureAttack();
}

// Attack using Scratch ability (two hits)
function useScratch() {
    if (!inBattle || character.class === "Class2") return; // Skip Scratch if class is Class2

    let damage1 = getRandom(1, 4);
    let damage2 = getRandom(1, 4);
    let damage3 = character.class === "Class3" ? getRandom(1, 4) : 0; // Class3 extra hit

    currentCreature.hp -= (damage1 + damage2 + damage3);
    document.getElementById("battle-log").innerHTML = `<li class="is-tight">
    <em class="heroMark">${character.name}'s</em> <em class="atkMark">Scratches</em> dealt (<span class="heroMark">${damage1} + ${damage2} ${damage3 ? `+ ${damage3}` : ''}</span>) DMG to 
    <em class="enemyMark">${currentCreature.name}</em> : <em class="hpMark">${currentCreature.hp}HP</em><br>
    </li>` + document.getElementById("battle-log").innerHTML;

    if (currentCreature.hp <= 0) {
        let experienceGain = currentCreature.baseExp + getRandom(...currentCreature.expRange);
        document.getElementById("battle-log").innerHTML = `<li class="is-tight">You defeated <em class="enemyMark">${currentCreature.name}</em> and gained ${experienceGain} XP!<br></li>` + document.getElementById("battle-log").innerHTML;
        character.experience += experienceGain; // Award XP for winning
        levelUp();
        saveCharacter();
        displayCharacter();
        endBattle();
        return;
    }
    creatureAttack();
}

// Use a potion to regain health
function usePotion() {
    if (!inBattle || character.potions <= 0) return;

    character.hp += 10;
    if (character.hp > 20) character.hp = 20; // Cap HP at 20
    character.potions -= 1;
    document.getElementById("battle-log").innerHTML = `<li class="is-tight">
        <em class="heroMark">${character.name}</em><em class="hpMark">${character.hp}HP</em> regained 10HP from potion. ${character.potions} Potions left<br>
    </li>` + document.getElementById("battle-log").innerHTML;

    creatureAttack();
}

// Handle the creature's attack phase
function creatureAttack() {
    let creatureMiss = getRandom(1, 10); // 1-in-10 chance to miss
    if (creatureMiss <= (currentCreature.missChance / 10)) {
        document.getElementById("battle-log").innerHTML = `<li class="is-tight">
            <em class="enemyMark">${currentCreature.name}'s</em> attack missed!<br>
        </li>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    let creatureAtk = getRandom(currentCreature.minAtk, currentCreature.maxAtk);
    character.hp -= creatureAtk;
    document.getElementById("battle-log").innerHTML = `<li class="is-tight">
        <em class="enemyMark">${currentCreature.name}'s</em> <em class="atkMark">${currentCreature.nameAtk}</em> dealt (${creatureAtk}) DMG to <em class="heroMark">${character.name}</em> : <em class="hpMark">${character.hp}HP</em><br>
    </li>` + document.getElementById("battle-log").innerHTML;

    if (character.hp <= 0) {
        document.getElementById("battle-log").innerHTML = `<li class="is-tight">You have been defeated. RIP <em class="heroMark">${character.name}</em>.<br></li>` + document.getElementById("battle-log").innerHTML;
        endBattle();
    }
}

// End the battle and reset the UI
function endBattle() {
    inBattle = false;
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
        hp: 20, // Default, will be set based on class
        potions: 2 // Default, will be set based on class
    };
    setClassAttributes(characterClass); // Set HP and potions based on class
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
