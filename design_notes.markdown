# Basic Game Concepts

## Users

A user of the game.

## Tytons

A Tyton represents the User's desire to improve their life.
The Tyton loves the User because the User loves herself.
The Tyton will die if the User doesn't take action.
They Tyton talks to the User and explains this.

A User can have many Tytons, but the creation of a new Tyton implies restarting the game in a new slot.

### Attributes

- **user**: M:1 relationship with User
- **location**: (x,y,z) tuple of Integers representing location in the game world

### Tyton degradation

Tytons can degrade due to a number of factors:

- **Time**: All tytons degrade over time.
- **Environmental factors**: Tyton may degrade faster based on Location.

Tyton gets brighter as it gets healthier, darker as it degrades.
There is a timer in the corner of the screen which prompts the user to complete a Challenge and heal their Tyton.

Challenge successes can heal cell degradation.

## Challenges

User is challenged to do something. Challenge success and failure is scored on on a scale from 1 to 0. Multiple challenges may exist simultaneously.
