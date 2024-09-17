// Character class to encapsulate character data
class Character {
    constructor(name, characterClass) {
        this.name = name;
        this.level = 0;
        this.class = characterClass;
        this.experience = 0;
        this.hp = 0;
        this.maxHp = 0;
        this.potions = 2;
        this.kickdirt = 2;
        this.minAtk = 0;
        this.maxAtk = 0;
        this.setClassAttributes(characterClass);
    }

    setClassAttributes(characterClass) {
        if (characterClass === "Cat") {
            this.hp = 20;
            this.maxHp = 20;
            this.potions = 2;
            this.kickdirt = 2;
            this.minAtk = 3;
            this.maxAtk = 6;
        } else if (characterClass === "Fat Cat") {
            this.hp = 30;
            this.maxHp = 30;
            this.potions = 3;
            this.kickdirt = 2;
            this.minAtk = 2;
            this.maxAtk = 5;
        } else if (characterClass === "Sneaky Cat") {
            this.hp = 15;
            this.maxHp = 15;
            this.potions = 1;
            this.kickdirt = 2;
            this.minAtk = 2;
            this.maxAtk = 7;
        }
    }

    save() {
        localStorage.setItem('rpg-character', JSON.stringify(this));
    }

    static load() {
        const savedCharacter = localStorage.getItem('rpg-character');
        if (savedCharacter) {
            const data = JSON.parse(savedCharacter);
            const character = new Character(data.name, data.class);
            Object.assign(character, data);
            return character;
        }
        return null;
    }

    levelUp() {
        const xpToLevel = [30, 80, 150, 240, 350, 480, 630, 800, 990, 1200, 1430]; // XP thresholds for leveling up
        let newLevel = this.level;

        while (newLevel < xpToLevel.length && this.experience >= xpToLevel[newLevel]) {
            newLevel++;
        }

        if (newLevel > this.level) {
            this.level = newLevel;
            this.minAtk += 1; // Increase attack power on level-up
            this.maxAtk += 1;

            // Adjust max HP with each level-up based on class
            if (this.class === "Cat") {
                this.maxHp = 20 + this.level * 2;  // Increase by 2 HP per level
                this.potions = 2; // Restock potions
            } else if (this.class === "Fat Cat") {
                this.maxHp = 30 + this.level * 2;  // Increase by 2 HP per level
                this.potions = 2; // Restock potions
            } else if (this.class === "Sneaky Cat") {
                this.maxHp = 15 + this.level * 2;  // Increase by 2 HP per level
                this.potions = 2; // Restock potions
            }

            // Restore health by 50% of the newly increased max HP
            this.hp = Math.min(this.maxHp, this.hp + Math.floor(this.maxHp / 2));

            // Display level-up notification
            document.getElementById("battle-log").innerHTML = `<div class="notification battle is-light is-warning"><li>
                Leveled up! Now level ${this.level}. HP restored to ${this.hp}/${this.maxHp}, +1 ATK, +2HP, and potions restocked.<br>
            </li></div>` + document.getElementById("battle-log").innerHTML;

            this.save();
            displayCharacter();
        }
    }
}

// Global game object to manage state
const Game = {
    character: null,
    inBattle: false,
    currentCreature: null,
    currentEvent: null,
    hasUsedPotionThisTurn: false
};

function updateAll() {
    updatePotionButtonVisibility();
    updateKickDirtButtonVisibility();
    displayCharacter();  // Update character info
    if (Game.inBattle) {
        updateBattleStatus();
    }
}


// Creatures array with updated missChance and encounterRate
const creatures = [
    {
        name: "Spider",
        nameAtk: "Bite",   // Attack type
        hp: 10,            // Creature's health points
        lvl: 0,            // Creature's level
        minAtk: 1,         // Minimum attack damage
        maxAtk: 2,         // Maximum attack damage
        missChance: 10,    // 10% chance to miss
        baseExp: 10,       // Base experience rewarded
        expRange: [2, 4],  // Random additional experience range
        encounterRate: 0.5,  // 50% chance to encounter
        rewardDrop: 2     // 10% chance to drop an extra potion
    },
    {
        name: "Pigeon",
        nameAtk: "Peck",   // Attack type
        hp: 15,
        lvl: 1,
        minAtk: 1,
        maxAtk: 4,
        missChance: 20,    // 20% chance to miss
        baseExp: 15,
        expRange: [2, 5],
        encounterRate: 0.3,  // 30% chance to encounter
        rewardDrop: 3
    },
    {
        name: "Possum",
        nameAtk: "Bite",
        hp: 20,
        lvl: 2,
        minAtk: 2,
        maxAtk: 4,
        missChance: 10,
        baseExp: 20,
        expRange: [2, 5],
        encounterRate: 0.2,  // 10% chance to encounter
        rewardDrop: 3
    },
    {
        name: "Raccoon",
        nameAtk: "Scratch",
        hp: 25,
        lvl: 3,
        minAtk: 3,
        maxAtk: 6,
        missChance: 10,
        baseExp: 25,
        expRange: [2, 5],
        encounterRate: 0.2,
        rewardDrop: 6
    },
    {
        name: "Snake",
        nameAtk: "Bite",
        hp: 30,
        lvl: 4,
        minAtk: 3,
        maxAtk: 6,
        missChance: 10,
        baseExp: 30,
        expRange: [2, 5],
        encounterRate: 0.2,
        rewardDrop: 9
    },
    {
        name: "Armadillo",
        nameAtk: "Roll",    // Attack type
        hp: 45,             // Creature's health points
        lvl: 4,             // Creature's level
        minAtk: 3,          // Minimum attack damage
        maxAtk: 5,          // Maximum attack damage
        missChance: 15,     // 15% chance to miss
        baseExp: 40,        // Base experience rewarded
        expRange: [2, 6],   // Random additional experience range
        encounterRate: 0.1, // 10% chance to encounter
        rewardDrop: 10      // 30% chance to drop an extra potion
    },
    {
        name: "Turkey",
        nameAtk: "Peck",    // Attack type
        hp: 30,             // Creature's health points
        lvl: 5,             // Creature's level
        minAtk: 1,          // Minimum attack damage
        maxAtk: 7,          // Maximum attack damage
        missChance: 20,     // 20% chance to miss
        baseExp: 35,        // Base experience rewarded
        expRange: [2, 4],   // Random additional experience range
        encounterRate: 0.2, // 20% chance to encounter
        rewardDrop: 13      // 20% chance to drop an extra potion
    },
    {
        name: "Cat",
        nameAtk: "Bite",
        hp: 30,
        lvl: 6,
        minAtk: 1,
        maxAtk: 7,
        missChance: 10,
        baseExp: 45,
        expRange: [2, 5],
        encounterRate: 0.2,
        rewardDrop: 20
    },
    {
        name: "Fat Cat",
        nameAtk: "Bite",
        hp: 40,
        lvl: 6,
        minAtk: 1,
        maxAtk: 6,
        missChance: 10,
        baseExp: 45,
        expRange: [2, 5],
        encounterRate: 0.2,
        rewardDrop: 20
    },
    {
        name: "Sneaky Cat",
        nameAtk: "Scratches",
        hp: 22,
        lvl: 6,
        minAtk: 1,
        maxAtk: 8,
        missChance: 10,
        baseExp: 45,
        expRange: [2, 5],
        encounterRate: 0.2,
        rewardDrop: 20
    },
    {
        name: "Fox",
        nameAtk: "Bite",   // Attack type
        hp: 45,            // Creature's health points
        lvl: 3,            // Creature's level
        minAtk: 4,         // Minimum attack damage
        maxAtk: 7,         // Maximum attack damage
        missChance: 10,    // 10% chance to miss
        baseExp: 45,       // Base experience rewarded
        expRange: [3, 5],  // Random additional experience range
        encounterRate: 0.15,  // 15% chance to encounter
        rewardDrop: 25     // 25% chance to drop an extra potion
    },    
    {
        name: "Bobcat",
        nameAtk: "Slash",   // Attack type
        hp: 50,             // Creature's health points
        lvl: 7,             // Creature's level
        minAtk: 4,          // Minimum attack damage
        maxAtk: 8,          // Maximum attack damage
        missChance: 10,     // 10% chance to miss
        baseExp: 55,        // Base experience rewarded
        expRange: [2, 6],  // Random additional experience range
        encounterRate: 0.15, // 10% chance to encounter
        rewardDrop: 35      // 50% chance to drop an extra potion
    },
    {
        name: "Coyote",
        nameAtk: "Bite",    // Attack type
        hp: 75,             // Creature's health points
        lvl: 9,             // Creature's level
        minAtk: 5,          // Minimum attack damage
        maxAtk: 9,          // Maximum attack damage
        missChance: 15,     // 15% chance to miss
        baseExp: 70,        // Base experience rewarded
        expRange: [3, 7],  // Random additional experience range
        encounterRate: 0.1,// 8% chance to encounter
        rewardDrop: 45      // 40% chance to drop an extra potion
    }

];

// Events array with updated encounterRate
const encounters = [
    {
        name: 'A Wounded Cat',
        desc: 'A poor wounded cat needs help',
        type: 'choice',   
        item: 'potions',
        effect: -1, // Using a potion to help the cat
        yes: 'Help out ( -1<img style="max-height: 18px; max-width: 18px;" src="assets/potion.svg">)',
        yesResponses: [
            'The cat is thankful for the potion.',
            'The cat slowly sips the potion and feels better.',
            'The cat takes the potion and leaves.',
            'The cat chugs the potion, burps, then passes out...'
        ],
        yesEnd: 'You continue through the woods.',
        baseExp: 35,  // Experience reward for helping
        no: 'Leave',  // If the player chooses not to help
        noResponse: 'You leave the cat behind and continue through the woods.',
        encounterRate: 0.3  // 30% chance to encounter
    },
    {
        name: 'You found a Stash!',
        desc: 'You discover a potion left behind.',
        type: 'stash',   
        item: 'potions',
        effect: 1, // Gain a potion
        yes: 'Take! ( +1<img style="max-height: 18px; max-width: 18px;" src="assets/potion.svg">)',
        yesResponse: 'This potion will come in handy!',
        yesEnd: 'You continue through the woods with an extra potion.',
        encounterRate: 0.05  // 5% chance to encounter
    },
    {
        name: 'What\'s that strange noise?',
        desc: 'You hear rustling near a tree!',
        type: 'investigate',   
        yes: 'Investigate?',
        ratioABC: [0.3, 0.3, 0.4], // Likelihood of finding potion (30%) vs getting hurt (30%) vs nothing (40%)
        itemA: 'potions',
        effectA: 1, // Find a potion
        yesA: 'You found (+1<img style="max-height: 16px; max-width: 16px;" src="assets/potion.svg">)!',
        effectB: -2, // Lose 2 HP
        yesB: 'A small lizard bites you! (-2HP)',
        yesC: 'Nothing... Must have been the wind',
        yesAEnd: 'You take the potion and continue through the woods.',
        yesBEnd: 'You leave, unhappy about the bite.',
        yesCEnd: 'You shrug it off and continue through the woods.',
        no: 'Ignore',
        noResponse: 'You choose to ignore the noise.',
        encounterRate: 0.3
    }
];

// Function to display character information and health in the HTML
function displayCharacter() {
    const character = Game.character;
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
                        <span class="tag is-danger is-light">${character.hp}/${character.maxHp}</span>
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
                    <span class="tag is-dark">Kick Dirt</span>
                    <span class="tag is-info">${character.kickdirt}</span>
                </div>
            </div>
        </div><br>  
    `;
}

// Function to update all UI elements
function updatePotionButtonVisibility() {
    const character = Game.character;
    const potionButton = document.getElementById("potion-btn");
    if (character.potions > 0 && character.hp < character.maxHp && !Game.hasUsedPotionThisTurn) {
        potionButton.disabled = false;
    } else {
        potionButton.disabled = true;
    }
}

// Function to update the battle status in the HTML
function updateBattleStatus() {
    const character = Game.character;
    const currentCreature = Game.currentCreature;
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

// Update visibility of the potion button based on potion availability
function updatePotionButtonVisibility() {
    const character = Game.character;
    const potionButton = document.getElementById("potion-btn");
    if (character.potions > 0 && character.hp < character.maxHp) {
        potionButton.disabled = false;
    } else {
        potionButton.disabled = true;
    }
}

// Update visibility of the KickDirt button
function updateKickDirtButtonVisibility() {
    const character = Game.character;
    const kickdirtButton = document.getElementById("KickDirt-btn");
    if (character.kickdirt > 0) {
        kickdirtButton.disabled = false;
    } else {
        kickdirtButton.disabled = true;
    }
}

// Random number generator within a given range
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load character data from localStorage
function loadCharacter() {
    const savedCharacter = Character.load();
    if (savedCharacter) {
        Game.character = savedCharacter;
        displayCharacter();
    } else {
        // No saved character, prompt to create one
        showTab('edit');
        return;
    }
}

// Handle new character creation
document.getElementById('create-character-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission from reloading the page
    const name = sanitizeInput(document.getElementById('name').value);
    const characterClass = sanitizeInput(document.getElementById('class').value);
    
    // Initialize new character
    Game.character = new Character(name, characterClass);

    Game.character.save();
    displayCharacter();
    showTab('woods');  // Switch to woods tab
});

// Sanitize user input to prevent XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(input));
    return div.innerHTML;
}

// Handle name change
document.getElementById('change-name-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent page reload
    const newName = sanitizeInput(document.getElementById('new-name').value);
    Game.character.name = newName;  // Update character name
    Game.character.save();
    displayCharacter();
    showTab('woods');
});

// Function to randomly select a creature based on encounter rates
function selectCreature() {
    const character = Game.character;
    const availableCreatures = creatures.filter(creature => {
        return Math.random() <= creature.encounterRate && creature.lvl <= character.level + 1;
    });
    
    if (availableCreatures.length > 0) {
        const creatureIndex = getRandom(0, availableCreatures.length - 1);
        return JSON.parse(JSON.stringify(availableCreatures[creatureIndex])); // Return a copy
    }

    return null; // No creature encountered
}

function clearBattleLog() {
    document.getElementById("battle-log").innerHTML = '';
}

// Exploration logic that handles events and creature encounters
function exploreWoods() {
    const character = Game.character;
    if (character.hp <= 0) {
        alert("RIP, your cat has perished. Please create a new character.");
        return;
    }

    // Clear the battle log at the start of exploration
    clearBattleLog();

    const eventChance = Math.random() <= 0.2; // 20% chance for event
    if (eventChance) {
        handleEvent(); // Handle event
    } else {
        Game.currentCreature = selectCreature();
        if (Game.currentCreature === null) {
            document.getElementById("battle-log").innerHTML = `<div class="notification battle is-light"><li>No creature encountered, you continue along.</li></div>` + document.getElementById("battle-log").innerHTML;
            return;
        }

        updateAll();

        // Set the creature's HP
        Game.currentCreature.hp = Game.currentCreature.hp;

        Game.inBattle = true;
        Game.hasUsedPotionThisTurn = false;  // **Reset potion usage flag at the start of a new battle**

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

        // Battle log is already cleared, so we start fresh
        document.getElementById("battle-log").innerHTML = `<p class="is-family-code has-text-centered">You've encountered a creature! Battle begins against:
            <span class="tags is-centered has-text-centered p-1 are-medium has-addons" style="margin-right:30px;">
                <span class="tag is-danger">${Game.currentCreature.name}</span>
                <span class="tag is-danger is-light">${Game.currentCreature.hp}HP</span>
                <span class="tag is-warning">${Game.currentCreature.lvl}</span>
            </span></p>`;
    }
}

function useBite() {
    if (!Game.inBattle) return;
    const character = Game.character;
    let characterAtk = getRandom(character.minAtk, character.maxAtk) + character.level;
    let characterBase = characterAtk - character.level;
    Game.currentCreature.hp -= characterAtk;

    if (Game.currentCreature.hp < 0) Game.currentCreature.hp = 0;

    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
    <em class="heroMark">${character.name}'s</em> <em class="atkMark">Bite</em> dealt (<span class="heroAtkMark">${characterBase}</span>${character.level > 0 ? `<span class="bnsMark">+${character.level}</span>` : ''}) DMG to 
        <em class="enemyMark">${Game.currentCreature.name}</em>: <em class="hpMark">${Game.currentCreature.hp} HP</em>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    updateBattleStatus();
    displayCharacter();

    if (Game.currentCreature.hp <= 0) {
        let experienceGain = Game.currentCreature.baseExp + getRandom(...Game.currentCreature.expRange);
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-success is-light"><li> 
            You defeated <em class="enemyMark">${Game.currentCreature.name}</em> and gained ${experienceGain} XP!<br>
        </li></div>` + document.getElementById("battle-log").innerHTML;

        character.experience += experienceGain;
        character.levelUp();

        // Check for potion drop
        handlePotionDrop(Game.currentCreature.rewardDrop);

        character.save();
        displayCharacter();
        endBattle();
        return;
    }
    updateAll();
    creatureAttack();
}

function useScratch() {
    if (!Game.inBattle || Game.character.class === "Fat Cat") return;
    const character = Game.character;
    let damage1 = getRandom(1, 4);
    let damage2 = getRandom(1, 4);
    let damage3 = character.class === "Sneaky Cat" ? getRandom(1, 4) : 0;

    let totalDamage = damage1 + damage2 + damage3 + character.level;
    Game.currentCreature.hp -= totalDamage;
    if (Game.currentCreature.hp < 0) Game.currentCreature.hp = 0;

    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
        <em class="heroMark">${character.name}'s</em> <em class="atkMark">Scratches</em> dealt (<span class="heroAtkMark">${damage1}+${damage2}${damage3 ? `+${damage3}` : ''}</span>${character.level > 0 ? `<span class="bnsMark">+${character.level}</span>` : ''}) DMG to 
        <em class="enemyMark">${Game.currentCreature.name}</em>: <em class="hpMark">${Game.currentCreature.hp} HP</em><br>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    updateBattleStatus();
    displayCharacter();

    if (Game.currentCreature.hp <= 0) {
        let experienceGain = Game.currentCreature.baseExp + getRandom(...Game.currentCreature.expRange);
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-success is-light"><li>
            You defeated <em class="enemyMark">${Game.currentCreature.name}</em> and gained ${experienceGain} XP!<br>
        </li></div>` + document.getElementById("battle-log").innerHTML;

        character.experience += experienceGain;
        character.levelUp();

        // Check for potion drop
        handlePotionDrop(Game.currentCreature.rewardDrop);

        character.save();
        displayCharacter();
        endBattle();
        return;
    }
    updateAll();
    creatureAttack();
}

// Use a potion to regain health
function usePotion() {
    const character = Game.character;

    // **Check if the player has already used a potion this turn**
    if (Game.hasUsedPotionThisTurn) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>You can only use one potion per turn.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    if (character.potions <= 0) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>No potions left to use.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    if (character.hp >= character.maxHp) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>HP is already full, potion not needed.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    character.hp += 10;  // Restore 10 HP
    if (character.hp > character.maxHp) character.hp = character.maxHp;  // Cap HP at maxHp
    character.potions -= 1;  // Deduct a potion

    Game.hasUsedPotionThisTurn = true;  // **Set the flag to true after using a potion**

    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
        <em class="heroMark">${character.name}</em> regained 10 HP from potion. ${character.potions} Potions left<br>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    character.save();
    displayCharacter();  // Update character info
    updatePotionButtonVisibility();  // **Update the potion button state**
    updateBattleStatus();
}

// Use Kick Dirt ability
function useKickDirt() {
    const character = Game.character;
    if (character.kickdirt <= 0) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>No Kick Dirt abilities left to use.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    if (Game.currentCreature.missChance >= 75) {  // If the missChance rate is 75% or higher, don't increase it further
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>The creature can't miss any more than it already does.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    // Increase the creature's missChance to 75%
    Game.currentCreature.missChance = 75;

    character.kickdirt -= 1;

    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li>
        <em class="heroMark">${character.name}</em> kicked dirt into ${Game.currentCreature.name}'s eyes, increasing its miss chance!<br>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    updateAll();
    creatureAttack();  // Let the creature attack
}

// Handle creature attack phase
function creatureAttack() {
    const character = Game.character;

    let missRoll = Math.random() * 100; // 0 to 99.999...
    if (missRoll < Game.currentCreature.missChance) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
            <em class="enemyMark">${Game.currentCreature.name}'s</em> attack missed!<br>
        </li></div>` + document.getElementById("battle-log").innerHTML;
    } else {
        let creatureAtk = getRandom(Game.currentCreature.minAtk, Game.currentCreature.maxAtk);  // Creature's attack damage
        character.hp -= creatureAtk;
        if (character.hp < 0) character.hp = 0;
        
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-dark"><li> 
            <em class="enemyMark">${Game.currentCreature.name}'s</em> <em class="atkMark">${Game.currentCreature.nameAtk}</em> dealt (${creatureAtk}) DMG to <em class="heroMark">${character.name}</em>: <em class="hpMark">${character.hp} HP</em><br>
        </li></div>` + document.getElementById("battle-log").innerHTML;

        if (character.hp <= 0) {
            document.getElementById("battle-log").innerHTML = `<div class="notification battle battle is-danger"><li> You have been defeated. RIP <em class="heroMark">${character.name}</em>.</li></div>` + document.getElementById("battle-log").innerHTML;
            endBattle();  // End the battle if the player dies
            // Implement game over logic
            gameOver();
            return;
        }
    }

    // **Reset the potion usage flag at the end of the creature's turn (start of player's next turn)**
    Game.hasUsedPotionThisTurn = false;
    updateAll();
}

function handlePotionDrop(dropChance) {
    const randomChance = Math.random() * 100; // Generate a random number between 0-100
    if (randomChance < dropChance) { // If the random number is less than the drop chance
        Game.character.potions += 1; // Increase potion count

        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-info"><li>You found a potion!</li></div>` + document.getElementById("battle-log").innerHTML;


    }
}


// Implement game over logic
function gameOver() {
    // Reset character data
    localStorage.removeItem('rpg-character');
    Game.character = null;
    Game.inBattle = false;
    Game.currentCreature = null;
    Game.currentEvent = null;
    // Display game over message
    alert("Your cat has perished. Game over.");
    // Redirect to character creation
    showTab('edit');
}

// End the battle and reset UI elements
function endBattle() {
    Game.inBattle = false;
    document.getElementById("start-battle-btn").style.display = "inline";
    document.getElementById("Bite-btn").style.display = "none";
    document.getElementById("Scratch-btn").style.display = "none";
    document.getElementById("KickDirt-btn").style.display = "none";
    document.getElementById("potion-btn").style.display = "inline";
    document.getElementById("battle-status").style.display = "none";
    
    updateAll();

    

    // Optionally, you can display a message after clearing the log
    document.getElementById("battle-log").innerHTML = `<div class="notification battle is-success"><li> 
        You've made it back to Camp. Use potions or continue exploring.<br>
    </li></div>` + document.getElementById("battle-log").innerHTML;

    updateBattleStatus();
    displayCharacter();


    
}

// Handle an event during exploration
function handleEvent() {
    // **Clear the battle log before displaying the event**

    const availableEvents = encounters.filter(event => {
        return Math.random() <= event.encounterRate;
    });

    if (availableEvents.length === 0) {
        document.getElementById("battle-log").innerHTML = `<div class="notification battle is-light"><li>No event occurred, you continue your journey.</li></div>` + document.getElementById("battle-log").innerHTML;
        return;
    }

    // Select a random event
    Game.currentEvent = availableEvents[getRandom(0, availableEvents.length - 1)];

    // Display the event in the battle log
    document.getElementById("battle-log").innerHTML = `
    <article id="event-log" class="message is-success is-dark">
        <div class="message-header"><p>${Game.currentEvent.name}</p></div>
        <div class="message-body">${Game.currentEvent.desc}</div>    
    </article>` + document.getElementById("battle-log").innerHTML;

    document.getElementById("start-battle-btn").style.display = "none";  // Hide battle button during event
    document.getElementById("eventYes-btn").style.display = "inline";  // Show Yes button
    document.getElementById("eventNo-btn").style.display = "inline";  // Show No button

    // Disable Yes button if player doesn't meet the event's requirements
    if (Game.currentEvent.type === 'choice' && Game.character.potions <= 0) {
        document.getElementById("eventYes-btn").disabled = true;
    } else {
        document.getElementById("eventYes-btn").disabled = false;
    }

    // Update event buttons with appropriate text
    document.getElementById("eventYes-btn").innerHTML = Game.currentEvent.yes;
    document.getElementById("eventNo-btn").innerHTML = Game.currentEvent.no || "Leave";
}

// Handle 'Yes' response to an event
function useEventYes() {
    if (!Game.currentEvent) return;
    const character = Game.character;
    let messageContent = '';  // Initialize message content

    // **Reset the potion usage flag in case an event affects it**
    Game.hasUsedPotionThisTurn = false;

    if (Game.currentEvent.type === 'choice') {
        character.potions -= 1;  // Deduct a potion for helping the cat

        const yesResponses = Game.currentEvent.yesResponses;
        const response = yesResponses[getRandom(0, yesResponses.length - 1)];

        messageContent = `<div class="message-body">${response}</div>`;
        messageContent += `<div class="message-body">${Game.currentEvent.yesEnd}</div>`; 

        character.experience += Game.currentEvent.baseExp;  // Gain experience
        character.levelUp();
    } else if (Game.currentEvent.type === 'stash') {
        character.potions += 1;  // Gain a potion from the stash
        messageContent = `<div class="message-body">${Game.currentEvent.yesResponse}</div>`;
        messageContent += `<div class="message-body">${Game.currentEvent.yesEnd}</div>`;
    } else if (Game.currentEvent.type === 'investigate') {
        const randomNumber = Math.random();
        const ratioA = Game.currentEvent.ratioABC[0];
        const ratioB = Game.currentEvent.ratioABC[1];
        const ratioC = Game.currentEvent.ratioABC[2];

        if (randomNumber <= ratioA) {
            // Option A: Find a potion
            character.potions += 1;
            messageContent = `<div class="message-body">${Game.currentEvent.yesA}<hr />`;
            messageContent += `${Game.currentEvent.yesAEnd}</div>`;
        } else if (randomNumber <= ratioA + ratioB) {
            // Option B: Get hurt
            character.hp -= 2;
            if (character.hp < 0) character.hp = 0;
            messageContent = `<div class="message-body">${Game.currentEvent.yesB}<hr />`;
            messageContent += `${Game.currentEvent.yesBEnd}</div>`;

            if (character.hp <= 0) {
                messageContent += `<div class="message-body">Curiosity killed the cat.</div>`;
                character.save();
                displayCharacter();
                gameOver();
            }
        } else {
            // Option C: Nothing happens
            messageContent = `<div class="message-body">${Game.currentEvent.yesC}<hr />`;
            messageContent += `${Game.currentEvent.yesCEnd}</div>`;
        }
    }

    // Display the outcome of the event
    document.getElementById("battle-log").innerHTML = `
    <article id="event-log" class="message is-success is-dark">
        <div class="message-header"><p>${Game.currentEvent.name}</p></div>
        ${messageContent}
    </article>` + document.getElementById("battle-log").innerHTML;

    endEvent();  // End the event
    character.save();
    displayCharacter();
}

// Handle 'No' response to an event
function useEventNo() {
    if (!Game.currentEvent) return;

    document.getElementById("battle-log").innerHTML = `
    <article id="event-log" class="message is-success">
        <div class="message-header"><p>${Game.currentEvent.name}</p></div>
        <div class="message-body">${Game.currentEvent.noResponse || 'You decided to ignore the event.'}</div>
    </article>` + document.getElementById("battle-log").innerHTML;

    endEvent();  // End the event
}

// End the current event and reset UI elements
function endEvent() {
    Game.currentEvent = null;
    document.getElementById("eventYes-btn").style.display = "none";
    document.getElementById("eventNo-btn").style.display = "none";
    document.getElementById("start-battle-btn").style.display = "inline";
    document.getElementById("potion-btn").style.display = "inline";

    // **Reset the potion usage flag after the event ends**
    Game.hasUsedPotionThisTurn = false;

    updateAll();
}// Show the appropriate tab in the UI
function showTab(tabId) {
    document.getElementById('woods-tab').style.display = 'none';
    document.getElementById('edit-tab').style.display = 'none';
    document.getElementById(tabId + '-tab').style.display = 'block';
}

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

// Initial setup when the window is loaded
window.onload = function() {
    loadCharacter();  // Load saved character data
    if (Game.character) {
        showTab('woods');  // Default to the 'woods' tab
    } else {
        showTab('edit');  // If no character, show the edit tab
    }
};
