# LimaRPG 0.1.3

## Character Creation

- **Name**: The player can name their character. By default, the name is "Lima".
- **Class**: Players can choose between different cat classes:
  - **Cat**:
    - A balanced class with 20 HP.
    - Starts with **2 potions**.
    - Starts with **2 uses of "Kick Dirt"**.
  - **Fat Cat**:
    - Higher HP (30) but can't use the "Scratch" attack.
    - Starts with **3 potions**.
    - Starts with **2 uses of "Kick Dirt"**.
  - **Sneaky Cat**:
    - Lower HP (15) but gets an additional hit when using "Scratch".
    - Starts with **1 potion**.
    - Starts with **2 uses of "Kick Dirt"**.

## Leveling Up

- **Experience**: Defeating creatures and completing events grants experience points (XP). Each level requires a certain amount of XP.
- **Level Bonuses**:
  - **+1 attack damage per level**.
  - Potions are reset to class default on each level-up.
  - **"Kick Dirt" uses are reset to 2** on each level-up.
  - HP increases by **2 points per level**.

## Combat

Combat occurs when you encounter a creature while exploring the woods.

### Attacks:

1. **Bite**:
   - Deals damage between **3 and 6**, plus a bonus of **+1 damage per character level**.

2. **Scratch**:
   - Deals **two hits**, each doing **1-4 damage**, plus a bonus of **+1 damage per character level**.
   - **Sneaky Cat** class performs a **third hit**.

3. **Kick Dirt**:
   - A strategic move that **increases the enemy's chance to miss**.
   - When used, sets the enemy's **miss chance to 75%** (if it was lower).
   - Limited to **2 uses per level**.
   - Does **not deal damage** but can prevent incoming damage from the enemy.
   - After use, the enemy will have a significantly higher chance to miss their next attacks.

### Creatures:

Each creature has the following attributes:

- **Health** (HP): How much damage it can take.
- **Attack**: The type of attack the creature uses.
- **Miss Chance**: The percentage chance a creature will miss an attack.
- **Reward**: Creatures drop potions or give experience points upon defeat.

Example creatures:

- **Spider**:
  - **10 HP**.
  - Attacks with **Bite**.
  - **10% miss chance**.
  - Drops potions **10%** of the time.

- **Raccoon**:
  - **25 HP**.
  - Attacks with **Scratch**.
  - **10% miss chance**.
  - More challenging opponent.

## Potions and Abilities

### Potions

- **Healing**: Each potion restores **10 HP**.
- **Starting Potions**:
  - **Cat**: 2 potions.
  - **Fat Cat**: 3 potions.
  - **Sneaky Cat**: 1 potion.
- **Potion Limit**: Potions reset to class default upon leveling up.

### Kick Dirt

- **Effect**: Increases the enemy's miss chance to **75%**.
- **Uses**: Limited to **2 uses per level**.
- **Reset**: "Kick Dirt" uses reset to 2 upon leveling up.
- **Strategic Use**: Best used against tough opponents to reduce the damage you might receive.

## Events

During exploration, you may encounter random events. These can include:

- **Sidequests**: Offer rewards or challenges.
- **Rescue missions**: For example, helping a wounded cat in exchange for experience points.

## Exploration

As you explore the woods, you'll encounter creatures and events. Every move could lead to:

- A creature battle.
- An event offering rewards or risks.
- Finding potions to aid your journey.

