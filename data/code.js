// Default character object with HP, potions, and initial stats
let character = {
    name: "Lima",           // Character's default name
    level: 0,              // Starting level
    class: "Cat",       // Default class
    experience: 0,         // Starting experience
    maxHp: 20,                // Health points (based on class)
    potions: 2,  
    kickdirt: 2,           // Potions available per level (based on class)
};

// Array of creatures with attributes including name, health, attack stats, and encounter rates
const creatures = [
    {
        name: "Spider",
        nameAtk: "Bite",   // Attack type
        hp: 10,            // Creature's health points
        lvl: 0,            // Creature's level
        minAtk: 1,         // Minimum attack damage
        maxAtk: 2,         // Maximum attack damage
        missChance: 1,    // 10% chance to miss
        baseExp: 10,       // Base experience rewarded
        expRange: [2, 4],  // Random additional experience range
        encounterRate: 5,  // 4 in 10 chance to encounter
        rewardDrop: 10     // 10% chance to drop an extra potion
    },
    {
        name: "Pigeon",
        nameAtk: "Peck",   // Attack type
        hp: 15,            // Creature's health points
        lvl: 1,            // Creature's level
        minAtk: 1,         // Minimum attack damage
        maxAtk: 4,         // Maximum attack damage
        missChance: 20,    // 20% chance to miss
        baseExp: 15,       // Base experience rewarded
        expRange: [2, 5],  // Random additional experience range
        encounterRate: 4,  // 3 in 10 chance to encounter
        rewardDrop: 20     // 20% chance to drop an extra potion
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
        encounterRate: 3,  // 1 in 10 chance to encounter
        rewardDrop: 40     // 40% chance to drop an extra potion
    },
    {
        name: "Raccoon",
        nameAtk: "Scratch",   // Attack type
        hp: 25,            // Creature's health points
        lvl: 3,            // Creature's level
        minAtk: 3,         // Minimum attack damage
        maxAtk: 6,         // Maximum attack damage
        missChance: 10,    // 10% chance to miss
        baseExp: 25,       // Base experience rewarded
        expRange: [2, 5],  // Random additional experience range
        encounterRate: 3,  // 1 in 10 chance to encounter
        rewardDrop: 40     // 40% chance to drop an extra potion
    },
    {
        name: "Snake",
        nameAtk: "Bite",   // Attack type
        hp: 30,            // Creature's health points
        lvl: 4,            // Creature's level
        minAtk: 3,         // Minimum attack damage
        maxAtk: 6,         // Maximum attack damage
        missChance: 10,    // 10% chance to miss
        baseExp: 30,       // Base experience rewarded
        expRange: [2, 5],  // Random additional experience range
        encounterRate: 3,  // 1 in 10 chance to encounter
        rewardDrop: 40     // 40% chance to drop an extra potion
    },
    {
        name: "Cat",
        nameAtk: "Bite",   // Attack type
        hp: 30,            // Creature's health points
        lvl: 6,            // Creature's level
        minAtk: 1,         // Minimum attack damage
        maxAtk: 7,         // Maximum attack damage
        missChance: 10,    // 10% chance to miss
        baseExp: 40,       // Base experience rewarded
        expRange: [2, 5],  // Random additional experience range
        encounterRate: 1,  // 1 in 10 chance to encounter
        rewardDrop: 50     // 40% chance to drop an extra potion
    },
    {
        name: "Fat Cat",
        nameAtk: "Bite",   // Attack type
        hp: 40,            // Creature's health points
        lvl: 6,            // Creature's level
        minAtk: 1,         // Minimum attack damage
        maxAtk: 6,         // Maximum attack damage
        missChance: 10,    // 10% chance to miss
        baseExp: 40,       // Base experience rewarded
        expRange: [2, 5],  // Random additional experience range
        encounterRate: 1,  // 1 in 10 chance to encounter
        rewardDrop: 50     // 40% chance to drop an extra potion
    },
    {
        name: "Sneaky Cat",
        nameAtk: "Scratches",   // Attack type
        hp: 22,            // Creature's health points
        lvl: 6,            // Creature's level
        minAtk: 1,         // Minimum attack damage
        maxAtk: 8,         // Maximum attack damage
        missChance: 10,    // 10% chance to miss
        baseExp: 40,       // Base experience rewarded
        expRange: [2, 5],  // Random additional experience range
        encounterRate: 1,  // 1 in 10 chance to encounter
        rewardDrop: 50     // 40% chance to drop an extra potion
    }
];

// Array of events with encounter rates and possible outcomes
const encounters = [
   
   {
        name: 'A Wounded Cat',
        desc: 'A poor wounded cat needs help',
        type: 'choice',   
        item: character.potions,
        effect: character.potions - 1, // Using a potion to help the cat
        yes: 'Help out ( -1<img style="max-height: 18px; max-width: 18px;" src="assets/potion.svg">)',
        yes01: 'The cat is thankful for the potion.',
        yes02: 'The cat slowly sips the potion and feels better.',
        yes03: 'The cat takes the potion and leaves.',
        yes04: 'The cat chugs the potion, burps, then passes out...',
        yesEnd: 'You continue through the woods.',
        baseExp: 35,  // Experience reward for helping
        no: 'Leave',  // If the player chooses not to help
        no01: 'The cat waits hopefully for help.',
        noEnd: 'You leave the cat behind and continue through the woods.',
        encounterRate: 3  // 3 in 10 chance to encounter
    }, 
    {
        name: 'You found a Stash!',
        desc: 'You discover a potion left behind.',
        type: 'stash',   
        item: character.potions,
        effect: character.potions + 1, // Gain a potion
        yes: 'Take!( +1<img style="max-height: 18px; max-width: 18px;" src="assets/potion.svg">)',
        yes01: 'This potion will come in handy! ( +1<img style="max-height: 18px; max-width: 18px;" src="assets/potion.svg">)',
        yesEnd: 'You continue through the woods with an extra potion.',
        encounterRate: 2  // 0.5 in 10 chance to encounter
    } ,
    {
        name: 'What\'s that strange noise?',
        desc: 'You hear rustling near a tree!',
        type: 'investigate',   
        yes: 'Investigate?',
        ratioABC: [3, 3, 4], // Likelihood of finding potion (7 in 10) vs getting hurt (3 in 10)
        itemA: character.potions,
        effectA: character.potions + 1, // Find a potion
        yesA: 'You found (+1<img style="max-height: 16px; max-width: 16px;" src="assets/potion.svg">)!',
        yesB: 'A small lizard bites you! (-2HP)',
        yesC: 'Nothing... Must have been the wind',
        yesAEnd: 'You take the potion and continue through the woods.',
        yesBEnd: 'You leave, unhappy about the bite.',
        yesCEnd: 'You shrug it off and continue through the woods.',
        no: 'Ignore',
        no01: 'You choose to ignore the noise.',
        noEnd: 'You leave and continue your journey.',
        encounterRate: 3  // 0.5 in 10 chance to encounter
    }/*,
    {
        name: '"Pssst... Hey, wanna smoke...bomb..."',
        desc: 'A sketchy cat approaches you offering to trade a Potion for two Smoke Bombs',
        type: 'investigate',   
        yes: 'Sure! (-1<img style="max-height: 16px; max-width: 16px;" src="assets/potion.svg">) for (+2<img style="max-height: 16px; max-width: 16px;" src="assets/potion.svg">)',
        ratioABC: [8, 2], // Likelihood of finding potion (7 in 10) vs getting hurt (3 in 10)
        itemA: character.kickdirt ,
        effectA: [character.kickdirt + 2, character.potions - 1 ], // Find a potion
        itemB: character.kickdirt ,
        effectB: [character.potions - 1 ], // Find a potion
        yesA: 'You traded and now have (+2<img style="max-height: 16px; max-width: 16px;" src="assets/potion.svg">)',
        yesB: 'You traded with the cat and he proceeds to run deep into the woods... wait a minute this bag is full of rock! (-1<img style="max-height: 16px; max-width: 16px;" src="assets/potion.svg">)',
        yesAEnd: 'I love bartering goods!',
        yesBEnd: 'You\'ve been bamboozeled by that dang cat!',
        no: 'No Thank you',
        no01: 'You continue along your path.',
        noEnd: 'You leave and continue your journey.',
        encounterRate: 3  // 0.5 in 10 chance to encounter
    }  */
];





// Battle state variables
let inBattle = false;
let currentCreature = null;  // Currently encountered creature
let currentEvent = null;     // Currently active event

// Function to display character information and health in the HTML
function displayCharacter() {
    document.getElementById("character-info").innerHTML = `
        <div class="field is-grouped is-grouped-multiline is-flex is-flex-wrap-wrap is-justify-content-center">
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
                    <span class="tag is-dark">Health</span>
                    <span class="tag is-danger is-light">${character.hp}/${character.maxHp + character.level}</span>
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
                    <span class="tag is-dark">EXP</span>
                    <span class="tag is-success is-light">${character.experience} XP</span>
                </div>
            </div>
            <div class="control">
                <div class="tags has-addons are-medium">
                    <span class="tag is-dark">Potions</span>
                    <span class="tag is-info">${character.potions}</span>
                </div>
            </div>
            <div class="control">
                <div class="tags has-addons are-medium">
                    <span class="tag is-dark">Potions</span>
                    <span class="tag is-info">${character.kickdirt}</span>
                </div>
            </div>
        </div><br>  
    `;
}

// Save character data to localStorage
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

// Set class-specific attributes like HP and potions
function setClassAttributes(characterClass) {
    if (characterClass === "Cat") {
        character.hp = 20;
        character.potions = 2;
    } else if (characterClass === "Fat Cat") {
        document.getElementById("Scratch-btn").style.display = "none"; // Fat Cat can't Scratch
        character.hp = 30;
        character.potions = 3;
    } else if (characterClass === "Sneaky Cat") {
        character.hp = 15;
        character.potions = 1;
    }
}

function updateAll() {
    updatePotionButtonVisibility()
    displayCharacter();  // Update character info
    updateBattleStatus();

}

// Level-up logic based on experience points
function levelUp() {
    const xpToLevel = [35, 80, 135, 200, 275, 360, 455, 560, 675, 800]; // XP thresholds for leveling up
    let level = character.level;

    while (level < xpToLevel.length && character.experience >= xpToLevel[level]) {
        level++;
    }

    if (level > character.level) {
        character.level = level;
        character.minAtk += 1; // Increase attack power on level-up
        character.maxAtk += 1;

        // Adjust max HP with each level-up based on class
        if (character.class === "Cat") {
            character.maxHp = 20 + character.level * 2;  // Increase by 2 HP per level
            character.potions = 2; // Restock potions
        } else if (character.class === "Fat Cat") {
            character.maxHp = 30 + character.level * 2;  // Increase by 3 HP per level
            character.potions = 2; // Restock potions
        } else if (character.class === "Sneaky Cat") {
            character.maxHp = 15 + character.level * 2;  // Increase by 1 HP per level
            character.potions = 2; // Restock potions
        }

        // Restore health by 50% of the newly increased max HP
        character.hp = Math.min(character.maxHp, character.hp + Math.floor(character.maxHp / 2));

        // Display level-up notification
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-light is-warning"><li>
            Leveled up! Now level ${character.level}. HP restored to ${character.hp}/${character.maxHp}, +1 ATK, +2HP, and potions restocked.<br>
        </li></div>` + document.getElementById("battle-log").innerHTML;

        saveCharacter();
        displayCharacter();
    }
}

// Random number generator within a given range
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to randomly select a creature based on encounter rates
function selectCreature() {
    const availableCreatures = creatures.filter(creature => {
        return getRandom(1, 10) <= creature.encounterRate && creature.lvl <= character.level + 1;
    });
    
    if (availableCreatures.length > 0) {
        const creatureIndex = getRandom(0, availableCreatures.length - 1);
        return availableCreatures[creatureIndex];
    }

    updateBattleStatus();
    return null; // No creature encountered
}

// Exploration logic that handles events and creature encounters
function exploreWoods() {
    if (character.hp <= 0) {
        alert("RIP, your cat has perished. Please create a new character.");
        return;
    }
    const eventChance = getRandom(1, 10) <= 1; // 10% chance for event
    if (eventChance) {
        handleEvent(); // Handle event
    } else {
        currentCreature = selectCreature();
        if (currentCreature === null) {
            document.getElementById("battle-log").innerHTML = "No creature encountered, you continue along.<br>";
            return;
        }

        updateAll();

        const creatureHPs = {
            "Spider": 10,
            "Pigeon": 15,
            "Possum": 20,
            "Raccoon": 25,
            "Snake": 30,
            "Cat": 30,
            "Fat Cat": 40,
            "Sneaky Cat": 22
        };

        currentCreature.hp = creatureHPs[currentCreature.name] || 10; // Set default HP of 10 if not specified

        inBattle = true;
        document.getElementById("start-battle-btn").style.display = "none";
        document.getElementById("Bite-btn").style.display = "inline";
        document.getElementById("KickDirt-btn").style.display = "inline";

        if (character.class !== "Fat Cat") {
            document.getElementById("Scratch-btn").style.display = "inline";
        } else {
            document.getElementById("Scratch-btn").style.display = "none";
        }

        document.getElementById("potion-btn").style.display = "inline";
        document.getElementById("battle-status").style.display = "inline";
        document.getElementById("battle-log").innerHTML = `<p class="is-family-code has-text-centered">You've encountered a creature! Battle begins against:
            <span class="tags is-centered has-text-centered p-1 are-medium has-addons" style="margin-right:30px;">
                <span class="tag is-danger">${currentCreature.name}</span>
                <span class="tag is-danger is-light">${currentCreature.hp}HP</span>
                <span class="tag is-warning">${currentCreature.lvl}</span>
            </span></p>`;
    }
}

// Function to update the battle status in the HTML
function updateBattleStatus() {
    
    updatePotionButtonVisibility()

    document.getElementById("battle-status").innerHTML = `
        <p class="is-centered has-text-centered is-family-code">Battle:
            <span class="tags has-addons is-centered">
                <span style="width: 100px" class="tag is-dark is-primary">${character.name}</span>
                <span style="width: 45px" class="tag is-danger is-light">${character.hp}HP</span>
                <span style="width: 0px" class="tag is-warning">${character.level}</span>
                <span style="width: 0px" class="tag is-dark">Vs</span>
                <span style="width: 0px" class="tag is-warning">${currentCreature.lvl}</span>
                <span style="width: 45px" class="tag is-danger is-light">${currentCreature.hp}HP</span>
                <span style="min-width: 100px" class="tag is-dark is-danger">${currentCreature.name}</span>
            </span>
            ${character.level > 0 ? `<p class="has-text-warning p-1">Level ${character.level} Bonus +${character.level} DMG</p>` : ''}
        </p>
    `;
}

// Attack using Bite ability
function useBite() {
    if (!inBattle) return;  // Ensure you're in battle

    let characterAtk = getRandom(3, 6) + character.level; // Bite attack damage
    let characterBase = characterAtk - character.level; // Bite attack damage
    currentCreature.hp -= characterAtk;
    
    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
    <em class="heroMark">${character.name}'s</em> <em class="atkMark">Bite</em> dealt (<span class="heroAtkMark">${characterBase}</span>${character.level > 0 ? `<span class="bnsMark">+${character.level}</span>` : ''}) DMG to 
        <em class="enemyMark">${currentCreature.name}</em>: <em class="hpMark">${currentCreature.hp} HP</em>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    updateBattleStatus();
    displayCharacter();

    // Check if the creature is defeated
    if (currentCreature.hp <= 0) {
        let experienceGain = currentCreature.baseExp + getRandom(...currentCreature.expRange);
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-success is-light"><li> 
            You defeated <em class="enemyMark">${currentCreature.name}</em> and gained ${experienceGain} XP!<br>
        </li></div>` + document.getElementById("battle-log").innerHTML;

        character.experience += experienceGain;  // Award XP for winning
        levelUp();  // Check for level up
        saveCharacter();
        displayCharacter();
        endBattle();  // End the battle
        return;
    }
    updateAll();
    creatureAttack();  // Let the creature attack
}

// Attack using Scratch ability (two hits)
function useScratch() {
    if (!inBattle || character.class === "Fat Cat") return;  // Skip Scratch if class is Fat Cat

    let damage1 = getRandom(1, 4);  // First hit
    let damage2 = getRandom(1, 4);  // Second hit
    let damage3 = character.class === "Sneaky Cat" ? getRandom(1, 4) : 0;  // Sneaky Cat gets an extra hit

    currentCreature.hp -= (damage1 + damage2 + damage3 + character.level);
    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
        <em class="heroMark">${character.name}'s</em> <em class="atkMark">Scratches</em> dealt (<span class="heroAtkMark">${damage1}+${damage2}${damage3 ? `+${damage3}` : ''}</span>${character.level > 0 ? `<span class="bnsMark">+${character.level}</span>` : ''}) DMG to 
        <em class="enemyMark">${currentCreature.name}</em>: <em class="hpMark">${currentCreature.hp} HP</em><br>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    updateBattleStatus();
    displayCharacter();

    // Check if the creature is defeated
    if (currentCreature.hp <= 0) {
        let experienceGain = currentCreature.baseExp + getRandom(...currentCreature.expRange);
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-success is-light"><li>
            You defeated <em class="enemyMark">${currentCreature.name}</em> and gained ${experienceGain} XP!<br>
        </article></li></div>` + document.getElementById("battle-log").innerHTML;

        character.experience += experienceGain;  // Award XP for winning
        levelUp();  // Check for level up
        saveCharacter();
        displayCharacter();
        endBattle();  // End the battle
        return;
    }
    updateAll();

    creatureAttack();  // Let the creature attack
}

// Use a potion to regain health
function usePotion() {
    if (character.potions <= 0) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>No potions left to use.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    if (character.hp >= character.maxHp + character.level) {  // Assuming 20 is the max HP
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>HP is already full, potion not needed.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    character.hp += 10;  // Restore 10 HP
    if (character.hp > character.maxHp + character.level) character.hp = character.maxHp + character.level;  // Cap HP at 20
    character.potions -= 1;  // Deduct a potion

    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
        <em class="heroMark">${character.name}</em> regained 10 HP from potion. ${character.potions} Potions left<br>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    displayCharacter();  // Update character info
    updateBattleStatus();
}

// Update visibility of the potion button based on potion availability
function updatePotionButtonVisibility() {
    const potionButton = document.getElementById("potion-btn");
    if (character.potions > 0 && character.hp < character.maxHp) {
        potionButton.disabled = false;
    } else {
        potionButton.disabled = true;
    }
    displayCharacter();  // Update character info

}

function useKickDirt() {
    if (character.kickdirt <= 0) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>No Kick Dirt abilities left to use.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    if (currentCreature.missChance >= 75) {  // If the missChance rate is 75% or higher, don't increase it further
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>The creature can't miss any more than it already does.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    // Increase the creature's missChance to 74
    currentCreature.missChance = 75;


    character.kickdirt -= 1;

    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li>
        <em class="heroMark">${character.name}</em> kicked dirt into ${currentCreature.name}'s eyes, increasing its miss chance!<br>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    updateAll();
    creatureAttack();  // Let the creature attack
}

// Update visibility of the potion button based on potion availability
function updateKickDirtButtonVisibility() {
    const kickdirtButton = document.getElementById("KickDirt-btn");
    if (character.kickdirt > 0) {
        kickdirtButton.disabled = false;
    } else {
        kickdirtButton.disabled = true;
    }
    displayCharacter();  // Update character info
}


// Handle creature attack phase
function creatureAttack() {
    let creatureMiss = getRandom(1, 10);  // Random chance for the creature to miss
    if (creatureMiss <= (currentCreature.missChance / 10)) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
            <em class="enemyMark">${currentCreature.name}'s</em> attack missed!<br>
        </li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    let creatureAtk = getRandom(currentCreature.minAtk, currentCreature.maxAtk);  // Creature's attack damage
    character.hp -= creatureAtk;
    
    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
        <em class="enemyMark">${currentCreature.name}'s</em> <em class="atkMark">${currentCreature.nameAtk}</em> dealt (${creatureAtk}) DMG to <em class="heroMark">${character.name}</em>: <em class="hpMark">${character.hp} HP</em><br>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    if (character.hp <= 0) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle battle is-danger"><li> You have been defeated. RIP <em class="heroMark">${character.name}</em>.</li></div>` + document.getElementById("battle-log").innerHTML;
        endBattle();  // End the battle if the player dies
    }

    updateAll();
}

// End the battle and reset UI elements
function endBattle() {
    inBattle = false;
    document.getElementById("start-battle-btn").style.display = "inline";
    document.getElementById("Bite-btn").style.display = "none";
    document.getElementById("Scratch-btn").style.display = "none";
    document.getElementById("KickDirt-btn").style.display = "none";
    document.getElementById("potion-btn").style.display = "inline";
    document.getElementById("battle-status").style.display = "none";
    updateAll();
    
    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-success"><li> 
        You've made it back to Camp. Use potions or continue exploring.<br>
    </li></div>`  + document.getElementById("battle-log").innerHTML;
}


// Handle an event during exploration
function handleEvent() {
    const availableEvents = encounters.filter(event => {
        return getRandom(1, 10) <= (event.encounterRate * 10);  // Filter events by encounter rate
    });

    if (availableEvents.length === 0) {
        document.getElementById("battle-log").innerHTML = "No event occurred, you continue your journey.<br>";
        return;
    }

    // Select a random event
    currentEvent = availableEvents[getRandom(0, availableEvents.length - 1)];

    // Display the event in the battle log
    document.getElementById("battle-log").innerHTML = `
    <article id="event-log" class="message column is-8 is-offset-2 is-success is-dark">
        <div class="message-header"><p>${currentEvent.name}</p></div>
        <div class="message-body">${currentEvent.desc}</div>    
    </article>`;

    document.getElementById("start-battle-btn").style.display = "none";  // Hide battle button during event
    document.getElementById("eventYes-btn").style.display = "inline";  // Show Yes button
    document.getElementById("eventNo-btn").style.display = "inline";  // Show No button

    // Disable Yes button if player doesn't meet the event's requirements
    if (currentEvent.type === 'choice' && character.potions <= 0) {
        document.getElementById("eventYes-btn").disabled = true;
    } else {
        document.getElementById("eventYes-btn").disabled = false;
    }

    // Update event buttons with appropriate text
    document.getElementById("eventYes-btn").innerHTML = currentEvent.yes;
    document.getElementById("eventNo-btn").innerHTML = currentEvent.no || "Leave";
}

// Handle 'Yes' response to an event
function useEventYes() {
    if (!currentEvent) return;

    let messageContent = '';  // Initialize message  content

    if (currentEvent.type === 'choice') {
        character.potions -= 1;  // Deduct a potion for helping the cat

        const yesResponses = [currentEvent.yes01, currentEvent.yes02, currentEvent.yes03, currentEvent.yes04];
        const response = yesResponses[getRandom(0, yesResponses.length - 1)];

        messageContent = `<div class="column is-8 is-offset-2"><div class="message-header"><p>${currentEvent.name}</p></div><div class="message-body">${response}</div></div>`;
        messageContent += `<div class="column is-8 is-offset-2"><article class="message  is-info"><div class="message-body">${currentEvent.yesEnd}</div></article></div>`; 

        character.experience += currentEvent.baseExp;  // Gain experience
        levelUp();
    } else if (currentEvent.type === 'stash') {
        character.potions += 1;  // Gain a potion from the stash
        messageContent = `<div class="column is-8 is-offset-2"><div class="message-header"><p>${currentEvent.name}</p></div><div class="message-body">${currentEvent.yes01}</div></div>`;
        messageContent += `<div class="column is-8 is-offset-2"><article class="message  is-info"><div class="message-body">${currentEvent.yesEnd}</div></article></div>`;
    } else if (currentEvent.type === 'investigate') {
        const totalRatio = currentEvent.ratioABC[0] + currentEvent.ratioABC[1] + currentEvent.ratioABC[2];
        const randomNumber = getRandom(1, totalRatio);

        if (randomNumber <= currentEvent.ratioABC[0]) {
            // Option A: Find a potion
            character.potions += 1;
            messageContent = `<div class="column is-8 is-offset-2"><div class="message-header"><p>${currentEvent.name}</p></div><div class="message-body">${currentEvent.yesA}</div>`;
            messageContent += `<div class="text-has-success">${currentEvent.yesAEnd}</div></div>`;
        } else if (randomNumber <= currentEvent.ratioABC[0] + currentEvent.ratioABC[1]) {
            // Option B: Get hurt
            character.hp -= 2;
            messageContent = `<div class="column is-8 is-offset-2"><div class="message-header"><p>${currentEvent.name}</p></div><div class="message-body">${currentEvent.yesB}</div>`;
            messageContent += `<div class="text-has-success">${currentEvent.yesBEnd}</div></div>`;

            if (character.hp <= 0) {
                messageContent += `<div class="column is-8 is-offset-2"><div class="message-body">Curiosity killed the cat.</div></div>`;
            }
        } else {
            // Option C: Nothing happens
            messageContent = `<div class="column is-8 is-offset-2"><div class="message-header"><p>${currentEvent.name}</p></div><div class="message-body">${currentEvent.yesC}</div></div>`;
            messageContent += `<div class="column is-8 is-offset-2"><article class="message  is-info"><div class="message-body">${currentEvent.yesCEnd}</div></article></div>`;
        }
    }

    // Display the outcome of the event
    document.getElementById("battle-log").innerHTML = `
    <article id="event-log" class="message  is-success is-dark">
        ${messageContent}
    </article>`;

    endEvent();  // End the event
    saveCharacter();
    displayCharacter();
}

// Handle 'No' response to an event
function useEventNo() {
    if (!currentEvent) return;

    document.getElementById("battle-log").innerHTML = `
    <article id="event-log" class="message column is-8 is-offset-2 is-success"><div class="message-header"><p>${currentEvent.name}</p></div>
        <div class="message-body">${currentEvent.no01 || 'You decided to ignore the event.'}</div>
    </article>`;

    endEvent();  // End the event
}

// End the current event and reset UI elements
function endEvent() {
    currentEvent = null;
    document.getElementById("eventYes-btn").style.display = "none";
    document.getElementById("eventNo-btn").style.display = "none";
    document.getElementById("start-battle-btn").style.display = "inline";
    document.getElementById("potion-btn").style.display = "inline";
}

// Handle new character creation
document.getElementById('create-character-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission from reloading the page
    const name = document.getElementById('name').value;
    const characterClass = document.getElementById('class').value;
    
    // Initialize new character
    character = {
        name: name,
        level: 0,
        class: characterClass,
        experience: 0,
        hp: 0,  // Default, set based on class
        potions: 2,  // Default potions, updated based on class
        kickdirt: 2  // Default potions, updated based on class
    };

    setClassAttributes(characterClass);  // Set class-specific attributes
    saveCharacter();
    displayCharacter();
    showTab('woods');  // Switch to woods tab
});

// Handle name change
document.getElementById('change-name-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload
    const newName = document.getElementById('new-name').value;
    character.name = newName;  // Update character name
    saveCharacter();
    displayCharacter();
    showTab('woods');
});

// Show the appropriate tab in the UI
function showTab(tabId) {
    document.getElementById('woods-tab').style.display = 'none';
    document.getElementById('edit-tab').style.display = 'none';
    document.getElementById(tabId + '-tab').style.display = 'block';
}

// Initial setup when the window is loaded
window.onload = function() {
    loadCharacter();  // Load saved character data
    showTab('woods');  // Default to the 'woods' tab
};

// Handle navbar toggle for mobile
document.addEventListener('DOMContentLoaded', () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});