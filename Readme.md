# To-Do List

1. Create GUI
2. Communicate with Arduino
3. Send 'e'/'d'-packet to arduino
4. Clean up code

## What I'm currently working on

2. Communicate with Arduino

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

This function establishes the connection to the COM ports. It stores the connection handle (\*) in `ports` for access everywhere.

Future:

-   Add an initial command with a "Ready" return.
-   Save COM port ID and reconnect on future login

#### `configureModules()`

This will send a command with [L/C/R U/D] \(\*\*) to each connected arduino (from `ports`) and the Arduino will raise/lower each arm to the correct position.

#### `closePorts()`

This closes the COM ports properly so other programs may be able to use them. This allows a safe disconnect and removal of any memory leak/obstructions.

#### `logPorts()`

!! For debugging purposes only
This does a `console.log(this.ports)` to display the current connection status of the arduinos on the developer console, accessible through <kbd>&#8984;</kbd> + <kbd>I</kbd>

### References

(\*) It may possibly just save the name of the COM port for repeated connection (not ideal), but it may just work.

(\*\*) [Left/Center/Right AllUp/AllDown]
