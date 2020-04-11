# Maze Controller for Automated Rat Maze at Poe Lab

### Go to [Technical Documentation](https://github.com/vedantmathur/maze-controller/wiki)

## How to use

This for use with the Automated Maze at the Poe Lab at UCLA. This is meant to be used with rats, however I am not judgemental of your choice in animal.

This program is meant to be run with 4 Arduinos connected via USB to the computer. Each arduino is correspondant to a "Module" (as commonly referred to through this code) on the maze. Each module can move independently from other modules, each module can be configured to one of 5 directions/positons: Right, Center, Left, Up, Down [R C L U D]. Each direction specified is a direction the rat is coerced to move to. The last module is generally left to the down position so the rat can make a free decision.

Here it is divided into Frontend and Backend, however there is also the Backend for the Maze as well, which is not uploaded. Instead the transmit code is replaced by dummy code to turn a light on and off. See `controller/controller.ino` and `arduinocom.js:42` to change.

You can build this by using the below commands.

```
npm run build-mac
```

```
npm run build-win
```

Untested, but you may also build for Linux using

```
npm run build-linux
```

## Future Features

This is a nonexhaustive and unordered list of ideas I have to improve this project. What I am currently working on can be seen [here](#What-I'm-currently-working-on).

-   Importing of a text file of lists so that the researcher does not have to manually enter each round of the run
-   Emergency kill-all
-   Reward dispenser integration
-   Sensor Integration (?)

# What I'm currently working on

Arduino receiving end of commands

# Licenses

MIT Open Source License

THIS IS FOR RESEARCH USE
