        // Character object
        let character = null; // Initialize character as null
        let currentCreature = null;
        let inBattle = false;

        // Creatures array remains the same
    const creatures = [
        {
            name: "Spider",
            nameAtk: "Bite",   // Attack type
            hp: 10,            // Creature's health points
            lvl: 0,            // Creature's level
            minAtk: 1,         // Minimum attack damage
            maxAtk: 2,         // Maximum attack damage
            missChance: 3.0,    // 10% chance to miss
            baseExp: 10,       // Base experience rewarded
            expRange: [2, 4],  // Random additional experience range
            encounterRate: 5,  // 50% chance to encounter
            coinDrop: 2     // 10% chance to drop cions
        },
        {
            name: "Pigeon",
            nameAtk: "Peck",   // Attack type
            hp: 15,
            lvl: 1,
            minAtk: 1,
            maxAtk: 4,
            missChance: 3.0,    // 20% chance to miss
            baseExp: 15,
            expRange: [2, 5],
            encounterRate: 3,  // 30% chance to encounter
            coinDrop: 3
        },
        {
            name: "Possum",
            nameAtk: "Bite",
            hp: 20,
            lvl: 2,
            minAtk: 2,
            maxAtk: 4,
            missChance: 3.0,
            baseExp: 20,
            expRange: [2, 5],
            encounterRate: 2,  // 10% chance to encounter
            coinDrop: 3
        },
        {
            name: "Raccoon",
            nameAtk: "Scratch",
            hp: 25,
            lvl: 3,
            minAtk: 3,
            maxAtk: 6,
            missChance: 2.0,
            baseExp: 25,
            expRange: [2, 5],
            encounterRate: 2,
            coinDrop: 6
        },
        {
            name: "Snake",
            nameAtk: "Bite",
            hp: 30,
            lvl: 4,
            minAtk: 3,
            maxAtk: 6,
            missChance: 1.0,
            baseExp: 30,
            expRange: [2, 5],
            encounterRate: 2,
            coinDrop: 9
        },
        {
            name: "Armadillo",
            nameAtk: "Roll",    // Attack type
            hp: 45,             // Creature's health points
            lvl: 4,             // Creature's level
            minAtk: 3,          // Minimum attack damage
            maxAtk: 5,          // Maximum attack damage
            missChance: 1.5,     // 15% chance to miss
            baseExp: 40,        // Base experience rewarded
            expRange: [2, 6],   // Random additional experience range
            encounterRate: 1, // 10% chance to encounter
            coinDrop: 10      // 30% chance to drop cions
        },
        {
            name: "Turkey",
            nameAtk: "Peck",    // Attack type
            hp: 30,             // Creature's health points
            lvl: 5,             // Creature's level
            minAtk: 1,          // Minimum attack damage
            maxAtk: 7,          // Maximum attack damage
            missChance: 4.0,     // 20% chance to miss
            baseExp: 35,        // Base experience rewarded
            expRange: [2, 4],   // Random additional experience range
            encounterRate: 2, // 20% chance to encounter
            coinDrop: 13      // 20% chance to drop cions
        },
        {
            name: "Cat",
            nameAtk: "Bite",
            hp: 30,
            lvl: 6,
            minAtk: 1,
            maxAtk: 7,
            missChance: 2.0,
            baseExp: 45,
            expRange: [2, 5],
            encounterRate: 2,
            coinDrop: 20
        },
        {
            name: "Fat Cat",
            nameAtk: "Bite",
            hp: 40,
            lvl: 6,
            minAtk: 1,
            maxAtk: 6,
            missChance: 2.0,
            baseExp: 45,
            expRange: [2, 5],
            encounterRate: 2,
            coinDrop: 20
        },
        {
            name: "Sneaky Cat",
            nameAtk: "Scratches",
            hp: 22,
            lvl: 6,
            minAtk: 1,
            maxAtk: 8,
            missChance: 2.0,
            baseExp: 45,
            expRange: [2, 5],
            encounterRate: 2,
            coinDrop: 20
        },
        {
            name: "Fox",
            nameAtk: "Bite",   // Attack type
            hp: 45,            // Creature's health points
            lvl: 3,            // Creature's level
            minAtk: 4,         // Minimum attack damage
            maxAtk: 7,         // Maximum attack damage
            missChance: 2.0,    // 10% chance to miss
            baseExp: 45,       // Base experience rewarded
            expRange: [3, 5],  // Random additional experience range
            encounterRate: 15,  // 15% chance to encounter
            coinDrop: 25     // 25% chance to drop cions
        },    
        {
            name: "Bobcat",
            nameAtk: "Slash",   // Attack type
            hp: 50,             // Creature's health points
            lvl: 7,             // Creature's level
            minAtk: 4,          // Minimum attack damage
            maxAtk: 8,          // Maximum attack damage
            missChance: 1.0,     // 10% chance to miss
            baseExp: 55,        // Base experience rewarded
            expRange: [2, 6],  // Random additional experience range
            encounterRate: 15, // 10% chance to encounter
            coinDrop: 35      // 50% chance to drop cions
        },
        {
            name: "Coyote",
            nameAtk: "Bite",    // Attack type
            hp: 85,             // Creature's health points
            lvl: 11,             // Creature's level
            minAtk: 5,          // Minimum attack damage
            maxAtk: 10,          // Maximum attack damage
            missChance: 1.5,     // 15% chance to miss
            baseExp: 70,        // Base experience rewarded
            expRange: [3, 7],  // Random additional experience range
            encounterRate: 1,// 8% chance to encounter
            coinDrop: 45      // 40% chance to drop cions
        }
    ];

        // Utility function to get a random integer between min and max (inclusive)
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        // Display character information
        function displayCharacter() {
            if (character) {
                document.getElementById("character-info").innerHTML = `

        <article class="message p-1 is-primary is-small">
            <div class="message-body" style="padding: 10px 0;">

                <div class="field is-grouped is-grouped-multiline is-flex is-flex-wrap-wrap is-justify-content-center" >
                    <div class="control">
                        <div class="tags has-addons are-medium">
                            <span class="tag is-dark">Name</span>
                            <span class="tag is-success">${character.name}</span>
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
                            <span class="tag is-dark">HP</span>
                                <span class="tag is-danger is-light">${character.hp}</span>
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
                </div >

            </div>
        </article>


            `;
            } else {
                document.getElementById("character-info").innerHTML = "";
            }
        }


        // Update battle status display
        function updateBattleStatus() {
            if (inBattle && currentCreature) {
                document.getElementById("battle-status").innerHTML = `


            <article style="width: 400px;" class="message p-1 is-danger is-centered">
                <div class="message-body" style="padding: 10px 0;">
                    <p class="is-centered has-text-centered is-family-code">
                        <span class="tags has-addons are-medium is-centered">
                            <span "min-width: 100px" class="tag is-dark is-danger">${currentCreature.name}</span>
                            <span "width: 45px" class="tag is-danger is-light">${currentCreature.hp}HP</span>
                            <span "width: 0px" class="tag is-warning">${currentCreature.lvl}</span>
                        </span>
                    </p>
                </div>

                ${character.level > 0 ? `
                        <div style="padding: 0;" class="message message-body is-warning is-small is-centered">
                            <p class="is-centered has-text-centered is-medium is-family-code">Bonus:
                    Level ${character.level} Bonus +${character.level} DMG
                    </p>
                        </div>
                ` : ''}

            </article>

        `;
            } else {
                document.getElementById("battle-status").innerHTML = "";
            }
            displayCharacter();
        }

        // Save character data to localStorage
        function saveCharacter() {
            if (character) {
                localStorage.setItem('rpg-character', JSON.stringify(character));
            }
        }

        // Load character data from localStorage
        function loadCharacter() {
            const savedCharacter = localStorage.getItem('rpg-character');
            if (savedCharacter) {
                character = JSON.parse(savedCharacter);
                setClassAttributes(character.class); // Ensure class attributes are set
            } else {
                // If no character is saved, prompt character creation
                showCharacterCreation();
            }
            displayCharacter();
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
                character.maxHp += 1;  // Increase max HP
                character.potions = 2; // Restock potions

                // Restore health to max
                character.hp = character.maxHp + character.level;

                // Display level-up notification
                document.getElementById("battle-log").innerHTML = `
            <p style="color: green;">Leveled up! Now level ${character.level}. HP restored to ${character.hp}/${character.maxHp + character.level}, +1 ATK, +2 HP, and potions restocked.</p>
        ` + document.getElementById("battle-log").innerHTML;

                saveCharacter();
            }
        }

        // Function to use Bite attack
        function useBite() {
            if (!inBattle) return;  // Ensure you're in battle

            let characterAtk = getRandom(character.minAtk, character.maxAtk) + character.level;
            let characterBase = characterAtk - character.level;
            currentCreature.hp -= characterAtk;

            document.getElementById("battle-log").innerHTML = `
    
            <em class="heroMark">${character.name}'s</em> <em class="atkMark">Bite</em> dealt (<span class="heroAtkMark">${characterBase}</span>${character.level > 0 ? `<span class="bnsMark">+${character.level}</span>` : ''}) DMG to 
            <em class="enemyMark">${currentCreature.name}</em>: <em class="hpMark">${currentCreature.hp} HP</em><br>

            ` + document.getElementById("battle-log").innerHTML;

            if (currentCreature.hp <= 0) {
                victory();
                return;
            }

            updateBattleStatus();
            creatureAttack();
        }

        // Function to use Scratch attack
        function useScratch() {
            if (!inBattle) return;  // Ensure you're in battle

            let damage1 = getRandom(1, 4);  // First hit
            let damage2 = getRandom(1, 4);  // Second hit
            let damage3 = character.class === "Sneaky Cat" ? getRandom(1, 4) : 0;

            let totalDamage = damage1 + damage2 + damage3 + character.level;

            currentCreature.hp -= totalDamage;

            document.getElementById("battle-log").innerHTML = `

            <em class="heroMark">${character.name}'s</em> <em class="atkMark">Scratches</em> dealt (<span class="heroAtkMark">${damage1}+${damage2}${damage3 ? `+${damage3}` : ''}</span>${character.level > 0 ? `<span class="bnsMark">+${character.level}</span>` : ''}) DMG to 
            <em class="enemyMark">${currentCreature.name}</em>: <em class="hpMark">${currentCreature.hp} HP</em><br>

            ` + document.getElementById("battle-log").innerHTML;

            if (currentCreature.hp <= 0) {
                victory();
                return;
            }

            updateBattleStatus();
            creatureAttack();
        }

        // Creature's attack turn
        function creatureAttack() {
            let creatureMiss = getRandom(1, 10);  // Random chance for the creature to miss
            if (creatureMiss <= currentCreature.missChance) {
                document.getElementById("battle-log").innerHTML = `
            <em class="enemyMark">${Game.currentCreature.name}'s</em> attack missed!<br>
            ` + document.getElementById("battle-log").innerHTML;
                return;
            }

            let creatureAtk = getRandom(currentCreature.minAtk, currentCreature.maxAtk);  // Creature's attack damage
            character.hp -= creatureAtk;

            document.getElementById("battle-log").innerHTML = `

            <em class="enemyMark">${currentCreature.name}'s</em> <em class="atkMark">${currentCreature.nameAtk}</em> dealt (${creatureAtk}) DMG to <em class="heroMark">${character.name}</em>: <em class="hpMark">${character.hp} HP</em><br>

            ` + document.getElementById("battle-log").innerHTML;

            if (character.hp <= 0) {
                document.getElementById("battle-log").innerHTML = `
                You have been defeated. RIP <em class="heroMark">${character.name}</em>.
                ` + document.getElementById("battle-log").innerHTML;
                endBattle();
                return;
            }

            updateBattleStatus();
        }

        // Function to use a potion
        function usePotion() {
            if (character.potions <= 0) {
                document.getElementById("battle-log").innerHTML = `No potions left to use.<br>` + document.getElementById("battle-log").innerHTML;
                return;
            }

            if (character.hp >= character.maxHp + character.level) {
                document.getElementById("battle-log").innerHTML = `HP is already full, potion not needed.<br>` + document.getElementById("battle-log").innerHTML;
                return;
            }

            character.hp += 10;  // Restore 10 HP
            if (character.hp > character.maxHp + character.level) character.hp = character.maxHp + character.level;
            character.potions -= 1;  // Deduct a potion

            document.getElementById("battle-log").innerHTML = `
        ${character.name} regained 10 HP from potion. ${character.potions} Potions left.<br>
    ` + document.getElementById("battle-log").innerHTML;

            // Potions can only be used once per turn
            if (inBattle) {
                updateBattleStatus();
                creatureAttack();
            } else {
                updateBattleStatus();
            }
        }

        // Function to randomly select a creature based on encounter rates
        function selectCreature() {
            const availableCreatures = creatures.filter(creature => {
                return getRandom(1, 10) <= creature.encounterRate && creature.lvl <= character.level + 1;
            });

            if (availableCreatures.length > 0) {
                const creatureIndex = getRandom(0, availableCreatures.length - 1);
                return JSON.parse(JSON.stringify(availableCreatures[creatureIndex])); // Deep copy
            }

            return null; // No creature encountered
        }

        // Function to start a battle
        function startBattle() {
            if (!character) {
                document.getElementById("battle-log").innerHTML = `
            Please create a character first.<br>
        ` + document.getElementById("battle-log").innerHTML;
                return;
            }

            if (inBattle) return;

            currentCreature = selectCreature();

            if (!currentCreature) {
                document.getElementById("battle-log").innerHTML = `
            No creatures encountered. Try again.<br>
        ` + document.getElementById("battle-log").innerHTML;
                return;
            }

            inBattle = true;

            // Hide 'Find Battle' button and show attack buttons
            document.getElementById("find-battle-btn").style.display = "none";
            document.getElementById("shop-btn").style.display = "none";
            document.getElementById("bite-btn").style.display = "inline";
            if (character.class !== "Fat Cat") {
                document.getElementById("scratch-btn").style.display = "inline";
            }
            document.getElementById("potion-btn").style.display = "inline";

            document.getElementById("battle-log").innerHTML = `
        A wild ${currentCreature.name} appeared!<br>
    ` + document.getElementById("battle-log").innerHTML;

            updateBattleStatus();
        }

        // Function to end a battle
        function endBattle() {
            inBattle = false;
            currentCreature = null;

            // Show 'Find Battle' button and hide attack buttons
            document.getElementById("find-battle-btn").style.display = "inline";
            document.getElementById("shop-btn").style.display = "inline";
            document.getElementById("bite-btn").style.display = "none";
            document.getElementById("scratch-btn").style.display = "none";
            document.getElementById("potion-btn").style.display = "inline";

            if (character.hp <= 0) {
                // Character died, prompt for new character creation
                localStorage.removeItem('rpg-character');
                character = null;
                document.getElementById("battle-log").innerHTML = `
            <p style="color: red;">${character ? character.name : "Your character"} has died. Create a new character to continue playing.</p>
        ` + document.getElementById("battle-log").innerHTML;
                showCharacterCreation();
            } else {
                // Battle won, potions can be accessed
                document.getElementById("potion-btn").style.display = "inline";
            }

            updateBattleStatus();
            saveCharacter();
        }

        // Function called when player defeats a creature
        function victory() {
            let expGained = currentCreature.baseExp + getRandom(currentCreature.expRange[0], currentCreature.expRange[1]);
            character.experience += expGained;

            document.getElementById("battle-log").innerHTML = `
        <p style="color: green;">${currentCreature.name} defeated! You gained ${expGained} XP.</p>
    ` + document.getElementById("battle-log").innerHTML;

            levelUp();
            endBattle();
        }

        // Show character creation interface
        function showCharacterCreation() {
            document.getElementById("character-creation").style.display = "block";
            // Hide game buttons
            document.getElementById("find-battle-btn").style.display = "none";
            document.getElementById("shop-btn").style.display = "none";
            document.getElementById("bite-btn").style.display = "none";
            document.getElementById("scratch-btn").style.display = "none";
            document.getElementById("potion-btn").style.display = "none";
            document.getElementById("new-character-btn").style.display = "none";
        }

        // Hide character creation interface
        function hideCharacterCreation() {
            document.getElementById("character-creation").style.display = "none";
            // Show game buttons
            document.getElementById("find-battle-btn").style.display = "inline";
            document.getElementById("shop-btn").style.display = "inline";
            document.getElementById("new-character-btn").style.display = "inline";
        }

        // Create a new character
        function createCharacter() {
            const name = document.getElementById("character-name").value.trim();
            const characterClass = document.getElementById("character-class").value;

            if (!name) {
                alert("Please enter a character name.");
                return;
            }

            character = {
                name: name,
                class: characterClass,
                level: 0,
                experience: 0,
                hp: 0,
                maxHp: 0,
                potions: 0,
                minAtk: 3,
                maxAtk: 6
                coins: 0 // Initialize coins to zero
            };

            setClassAttributes(characterClass);

            hideCharacterCreation();
            saveCharacter();
            displayCharacter();
            document.getElementById("battle-log").innerHTML = `
        <p style="color: blue;">Welcome, ${character.name} the ${character.class}!</p>
    ` + document.getElementById("battle-log").innerHTML;
        }

        // Set class-specific attributes like HP and potions
        function setClassAttributes(characterClass) {
            if (characterClass === "Cat") {
                character.hp = 20;
                character.maxHp = 20;
                character.potions = 2;
                character.minAtk = 3;
                character.maxAtk = 6;
            } else if (characterClass === "Fat Cat") {
                character.hp = 30;
                character.maxHp = 30;
                character.potions = 3;
                character.minAtk = 4;
                character.maxAtk = 7;
            } else if (characterClass === "Sneaky Cat") {
                character.hp = 15;
                character.maxHp = 15;
                character.potions = 1;
                character.minAtk = 2;
                character.maxAtk = 5;
            }
        }

        // Event listeners for buttons
        document.getElementById("find-battle-btn").addEventListener("click", startBattle);
        document.getElementById("shop-btn").addEventListener("click", catShop);
        document.getElementById("bite-btn").addEventListener("click", useBite);
        document.getElementById("scratch-btn").addEventListener("click", useScratch);
        document.getElementById("potion-btn").addEventListener("click", usePotion);
        document.getElementById("create-character-btn").addEventListener("click", createCharacter);
        document.getElementById("new-character-btn").addEventListener("click", showCharacterCreation);

        // Initialize game
        loadCharacter();
        updateBattleStatus();

    // The following code is based off a toggle menu by @Bradcomp
    // source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
    (function () {
        var burger = document.querySelector('.burger');
        var menu = document.querySelector('#' + burger.dataset.target);
        burger.addEventListener('click', function () {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    })();

