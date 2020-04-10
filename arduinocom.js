class arduinocom {
    // Keeps the access variables for the instance.
    constructor() {
        this.ports = new Array(4);
    }

    // Open a COM port and insert into this.ports
    connectCOM() {
        var sp = require("serialport");

        // Disconnect currently connected ports (if any).
        /* To be implemented */

        var modport_text = [];
        var modport_value = [];

        // Read the selected COM port from the dropdown. If no COM has been selected, modport_value will be '0'.
        for (var i = 0; i < 4; i++) {
            var modport = document.getElementById("mod" + i + "select");
            modport_text.push(modport.options[modport.selectedIndex].text);
            modport_value.push(modport.options[modport.selectedIndex].value);
        }

        // Make sure this works: If a port is selected, add it to this.ports (otherwise -1 for error/ignore).
        for (var i = 0; i < modport_value.length; i++) {
            // the `new` command opens a connection.
            if (modport_value[i] != "0") {
                this.ports[i] = new sp(modport_text[i], {
                    baudRate: 9600,
                    parser: new sp.parsers.Readline("\r\n"),
                });
                this.ports[i].on("open", () => {});
            } else {
                this.ports[i] = -1;
            }
        }
    }

    // Close the port. Ignore -1 or 0 for uninitialized port.
    closePorts() {
        for (let i = 0; i < this.ports.length; i++) {
            if (this.ports[i] != -1 && this.ports[i] != 0) {
                this.ports[i].close();
            }
        }
    }

    // Configure the module to the spec. Write the byte over COM.
    configureModules() {
        // Read Radio Button value
        var i, j;
        // For each module...
        for (j = 0; j < 4; j++) {
            var modulesetting = 0;
            var radiosetting = document.getElementsByName("mod" + j);
            // Find radio button that is checked
            for (i = 0; i < radiosetting.length; i++) {
                if (radiosetting[i].checked) modulesetting = i;
            }

            // Temporary for e = OFF, s = ON. On a connected Arduino
            if (j == 0) {
                if (modulesetting == 1) {
                    this.ports[0].write("e");
                }
                if (modulesetting == 2) {
                    this.ports[0].write("s");
                }
            }
        }
    }

    // For debugging purposes. This displays the connections over console.
    logPorts() {
        console.log("this.ports");
        console.log(this.ports);
        console.log("this.ports[0]");
        console.log(this.ports[0]);
        console.log("typeof this.ports[0]");
        console.log(typeof this.ports[0]);
    }
}

// Does not require this.ports
// See which COM ports are available and write to display.
function readCOM() {
    var sp = require("serialport");
    var mod0select = document.getElementById("mod0select");
    var mod1select = document.getElementById("mod1select");
    var mod2select = document.getElementById("mod2select");
    var mod3select = document.getElementById("mod3select");

    // Read this.ports from Serial port and create a variable ports.
    sp.list().then((ports) => {
        var i = 0;
        ports.forEach(function (port) {
            i = i + 1;

            // Add port to list
            // There has to be a better way to do this
            var option = document.createElement("option");
            option.text = port.path;
            option.setAttribute("value", i);
            mod0select.add(option);

            var option = document.createElement("option");
            option.text = port.path;
            option.setAttribute("value", i);
            mod1select.add(option);

            var option = document.createElement("option");
            option.text = port.path;
            option.setAttribute("value", i);
            mod2select.add(option);

            var option = document.createElement("option");
            option.text = port.path;
            option.setAttribute("value", i);
            mod3select.add(option);
        });
    });
}
