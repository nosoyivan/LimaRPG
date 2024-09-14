# LimaRPG 0.1.3

## Character Creation

- **Name**: The player can name their character. By default, the name is "Lima".
- **Class**: Players can choose between different cat classes:
  - **Cat**: A balanced class with 20 HP and 2 potions.
  - **Fat Cat**: Higher HP (30) but can't use the "Scratch" attack. Comes with 3 potions.
  - **Sneaky Cat**: Lower HP (15) but gets an additional hit in combat. Comes with 1 potion.

## Leveling Up

- **Experience**: Defeating creatures and completing events grants experience points (XP). Each level requires a certain amount of XP.
- **Level Bonuses**:
  - +1 attack damage per level.
  - Potions are reset to class default on each level-up.
  - HP increases by 2 points per level.

## Combat

Combat occurs when you encounter a creature while exploring the woods.

### Attacks:
1. **Bite**:
   - Deals damage between 3 and 6, plus a bonus of +1 damage per character level.
   
2. **Scratch**:
   - Deals two hits, each doing 1-4 damage, plus a bonus of +1 damage per character level.
   - Sneaky Cat class can perform a third hit.

### Creatures:
Each creature has the following attributes:
- **Health** (HP): How much damage it can take.
- **Attack**: The type of attack the creature uses.
- **Miss Chance**: The percentage chance a creature will miss an attack.
- **Reward**: Creatures drop potions or give experience points upon defeat.

Example creatures:
- **Spider**: 10 HP, attacks with Bite, 40% miss chance, drops potions 10% of the time.
- **Raccoon**: 25 HP, attacks with Scratch, 10% miss chance, more challenging.

## Potions

- **Healing**: Each potion restores 10 HP. You start with a certain number of potions depending on your class:
  - Cat: 2 potions
  - Fat Cat: 3 potions
  - Sneaky Cat: 1 potion
- **Potion Limit**: Potions are capped at a set amount depending on your class, and they reset to the default upon leveling up.

## Events

During exploration, you may encounter random events. These can include:
- **Sidequests**: Offer rewards or challenges.
- **Rescue missions**: For example, helping a wounded cat in exchange for experience points.

<!-- ### Event Types:
1. **Choice Events**: Require you to decide whether to help or leave, sometimes using potions.
2. **Stash Events**: Allow you to collect items like potions.
3. **Investigation Events**: Present you with the opportunity to investigate and receive a reward or suffer a consequence.
 -->
## Exploration

As you explore the woods, you'll encounter creatures and events. Every move could lead to:
- A creature battle.
- An event offering rewards or risks.
- Finding potions to aid your journey.

---
