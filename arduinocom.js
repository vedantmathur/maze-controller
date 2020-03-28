// this.ports are in localstorage. To access this.ports, do var this.ports = JSON.parse(localStorage.getItem("allports"));

class arduinocom {
    // Connect to COM this.ports. This keeps the COM port open until 4. runs.
    constructor() {
        this.ports = new Array(4);
    }
    static connectCOM() {
        var sp = require("serialport");

        this.ports = new Array(4);
        console.log(this.ports);
        var modport_text = [];
        var modport_value = [];

        for (var i = 0; i < 4; i++) {
            var modport = document.getElementById("mod" + i + "select");
            modport_text.push(modport.options[modport.selectedIndex].text);
            modport_value.push(modport.options[modport.selectedIndex].value);
        }
        for (var i = 0; i < modport_value.length; i++) {
            if (modport_value[i] != "0") {
                this.ports[i] = new sp(modport_text[i], {
                    baudRate: 9600,
                    parser: new sp.parsers.Readline("\r\n")
                });
                console.log(i);
                //qports[i] = modport_text[i];
            } else {
                this.ports[i] = -1;
            }
        }
        // Display connections.
        console.log(this.ports);
        console.log(typeof this.ports[0]);
        console.log(this.ports[0]);

        this.logPorts();
    }

    // Close the port so other apps can use it at some point
    static closePorts() {
        this.ports = JSON.parse(localStorage.getItem("allports"));
        for (let i = 0; i < this.ports.length; i++) {
            if (ports[i] != -1 && this.ports[i] != 0) {
                this.ports[i].close();
            }
        }
    }

    // Configure the module to the spec. Write the byte over COM.
    static configureModules() {
        var sp = require("serialport");

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
            console.log("Module " + j + ": " + modulesetting);

            // Testing
            if (j == 0) {
                if (modulesetting == 1) {
                    console.log(ports[0]);
                    this.ports[0].on("open", () => {
                        //ports[0].write("e");
                        console.log("hello");
                    });
                }
                if (modulesetting == 2) {
                    console.log("mod2 ws");
                    this.ports[0].on("open", () => {
                        this.ports[0].write("s");
                    });
                }
            }
        }
    }
    // For debugging purposes. This displays the connections over console.
    static logPorts() {
        console.log(this.ports);
    }
}

// Extra functions
// See which COM this.ports are available and write to display.
function readCOM() {
    var sp = require("serialport");
    var mod0select = document.getElementById("mod0select");
    var mod1select = document.getElementById("mod1select");
    var mod2select = document.getElementById("mod2select");
    var mod3select = document.getElementById("mod3select");

    // Read this.ports from Serial port and create a variable this.ports.
    sp.list().then(ports => {
        var i = 0;
        this.ports.forEach(function(port) {
            i = i + 1;
            console.log(port.path);
            console.log(i);

            console.log(mod0select);

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
