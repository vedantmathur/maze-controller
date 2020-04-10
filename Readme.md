# Documentation

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

## Frontend

Fun fact: I learned javascript/html/css while working on this project.

This application is built on the Electron platform. Javascript is wrapped around Material Design by Google.

If theres a problem its probably part of frontend.

## Backend

We have several functions we will be using

```javascript
readCOM();

class arduinocom {
    connectCOM();
    configureModules();
    closePorts();
    logPorts();
}
```

This is the order the functions will be executed in.

#### `readCOM()`

This function simply reads the COM ports connected to the computer and populates the dropdowns defined in the GUI so that the researcher can select which arduino (a module of the maze) corresponds to which module of the maze.

---

The next four functions are wrapped inside a class, the class has an instantiated variable `this.ports = new Array(4)` which holds the connection handles for the 4 modules. Refer to this as `ports`. More on this variable in the final docs...

#### `connectCOM()`

This function establishes the connection to the COM ports. It stores the connection handle in `ports` for access everywhere.

This button is associated with the GUI button "Save Modules"

Future:

-   Add an initial command with a "Ready" return.
-   Save COM port ID and reconnect on future login

#### `configureModules()`

This will send a command with [L/C/R U/D] \(\*) to each connected arduino (from `ports`) and the Arduino will raise/lower each arm to the correct position.

#### `closePorts()`

This closes the COM ports properly so other programs may be able to use them. This allows a safe disconnect and removal of any memory leak/obstructions.

#### `logPorts()`

!! For debugging purposes only
This does a `console.log(this.ports)` to display the current connection status of the arduinos on the developer console, accessible through <kbd>&#8984;</kbd> + <kbd>I</kbd>

### References

(\*) [Left/Center/Right AllUp/AllDown]

# What I'm currently working on

5. Arduino on the board

# Licenses

MIT Open Source License

THIS IS FOR RESEARCH USE
