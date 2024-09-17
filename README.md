# LimaRPG 0.1.4

## Character Creation

- **Name**: Players can name their character. By default, the name is "Lima".
- **Class Options**:
  - **Cat**:
    - Balanced class with **20 HP**.
    - Starts with **2 potions**.
    - **2 uses of "Kick Dirt"**.
  - **Fat Cat**:
    - Higher HP (**30**) but cannot use the "Scratch" attack.
    - Starts with **3 potions**.
    - **2 uses of "Kick Dirt"**.
  - **Sneaky Cat**:
    - Lower HP (**15**) but gains an additional hit when using "Scratch".
    - Starts with **1 potion**.
    - **2 uses of "Kick Dirt"**.

## Leveling Up

- **Experience Points (XP)**: Earned by defeating creatures and completing events. Each level requires a specific amount of XP.
- **Level Bonuses**:
  - **+1 attack damage** per level.
  - Potions reset to class default on level-up.
  - **"Kick Dirt" uses reset to 2** on level-up.
  - HP increases by **2 points** per level.

## Combat

Combat occurs during exploration when you encounter a creature.

### Attacks:

1. **Bite**:
   - Damage: **3 to 6**, plus **+1 damage per character level**.

2. **Scratch**:
   - Deals **two hits**, each doing **1-4 damage**, plus **+1 damage per character level**.
   - **Sneaky Cat** class performs an **additional third hit**.

3. **Kick Dirt**:
   - A strategic move that **increases the enemy's chance to miss**.
   - Sets the enemy's **miss chance to 75%** (if it was lower).
   - Limited to **2 uses per level**.
   - Does **not deal damage** but can significantly reduce incoming damage.

### Creature Attributes:

Each creature has the following attributes:

- **Health (HP)**: Total damage it can withstand.
- **Attack**: The type of attack the creature uses.
- **Miss Chance**: Percentage chance the creature will miss an attack.
- **Reward**: Creatures drop potions or grant XP upon defeat.

**Example Creatures**:

- **Spider**:
  - **HP**: 10
  - **Attack**: Bite
  - **Miss Chance**: 10%
  - **Potion Drop**: 10%

- **Raccoon**:
  - **HP**: 25
  - **Attack**: Scratch
  - **Miss Chance**: 10%
  - **More challenging opponent**.

## Potions and Abilities

### Potions

- **Healing Effect**: Each potion restores **10 HP**.
- **Starting Potions**:
  - **Cat**: 2 potions.
  - **Fat Cat**: 3 potions.
  - **Sneaky Cat**: 1 potion.
- **Potion Limit**: Potions reset to class default upon leveling up.

### Kick Dirt

- **Effect**: Increases the enemy's miss chance to **75%**.
- **Uses**: Limited to **2 uses per level**.
- **Reset**: Uses reset to 2 upon leveling up.
- **Strategic Use**: Effective against tougher opponents.

## Events

During exploration, random events may occur, including:

- **Sidequests**: Offer rewards or challenges.
- **Rescue Missions**: Help a wounded animal in exchange for XP.

## Exploration

As you explore the woods, you may encounter:

- Creature battles.
- Events offering rewards or challenges.
- Opportunities to find potions to aid your journey.

