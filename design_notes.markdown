# Basic Game Concepts

## Users

A user of the game.

## Tytons

A Tyton represents the physical body of the User's character in the game world.

A User can have many Tytons, but the creation of a new Tyton implies restarting the game in a new slot.

### Attributes

- **user**: M:1 relationship with User
- **location**: (x,y,z) tuple of Integers representing location in the game world

## Structures

Structures are non-directed graphs of Cells which are in turn combined to form a Tyton.

### Attributes

- **tyton**: M:1 relationship with the Tyton object.
- **offset**: (x,y) tuple of Integers representing the offset of the Structure centroid from the Tyton's centroid
- **neighbors**: M:M relationship with other Structures in the same Tyton. i.e. Structures snap together.
- **organ**: M:1 relationship with an Organ type.

## Challenges

User is challenged to do something. Challenge success and failure is scored on on a scale from 1 to 0. Multiple challenges may exist simultaneously.

## Cells

New Cells are dropped occasionally based on aggregate Challenge successes and other conditions.

Cells join together in a non-directed graph to form a Structure.

### Attributes

- **structure**: M:1 relationship with a Structure
- **health**: Number 0 to 1. Cells which reach 0 health are deleted.
- **neighbors**: M:M relationship to other Cells in the same Structure, i.e. Cells snap together.
- **tissue**: M:1 relationship with a Tissue type

### Cell degradation

Cells degrade due to a number of factors:

- **Time**: All cells degrade over time. Cells on the outer edge of structures degrade first.
- **Environmental factors**: Cells may degrade faster based on a combination of Location and Type.

Challenge successes can heal cell degradation.
