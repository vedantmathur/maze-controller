// Ports are in localstorage. To access ports, do var ports = JSON.parse(localStorage.getItem("allports"));

class arduinocom {
    // Connect to COM ports. This keeps the COM port open until 4. runs.
    static connectCOM() {
        var sp = require("serialport");
        // Make all ports available
        //this.closePorts();

        var ports = new Array(4);
        var modport_text = [];
        var modport_value = [];

        for (var i = 0; i < 4; i++) {
            var modport = document.getElementById("mod" + i + "select");
            modport_text.push(modport.options[modport.selectedIndex].text);
            modport_value.push(modport.options[modport.selectedIndex].value);
        }
        for (var i = 0; i < modport_value.length; i++) {
            if (modport_value[i] != "0") {
                ports[i] = new sp(modport_text[i], {
                    baudRate: 9600,
                    parser: new sp.parsers.Readline("\r\n")
                });
                console.log(i);
                //qports[i] = modport_text[i];
            } else {
                ports[i] = -1;
            }
        }
        // Display connections.
        console.log(ports);
        console.log(typeof ports[0]);
        console.log(ports[0]);

        localStorage.setItem("allports", JSON.stringify(ports));
        this.logPorts();
        //ports[0].write("e");
    }

    // Close the port so other apps can use it at some point
    static closePorts() {
        var ports = JSON.parse(localStorage.getItem("allports"));
        for (let i = 0; i < ports.length; i++) {
            if (ports[i] != -1 && ports[i] != 0) {
                this.ports[i].close();
            }
        }
    }

    // Configure the module to the spec. Write the byte over COM.
    static configureModules() {
        var sp = require("serialport");
        // Connect to COM PORTS
        var ports = JSON.parse(localStorage.getItem("allports"));

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
                    ports[0].on("open", () => {
                        //ports[0].write("e");
                        console.log("hello");
                    });
                }
                if (modulesetting == 2) {
                    console.log("mod2 ws");
                    ports[0].on("open", () => {
                        ports[0].write("s");
                    });
                }
            }
        }
    }
    // For debugging purposes. This displays the connections over console.
    static logPorts() {
        var sp = require("serialport");
        //var ports: typeof sp;
        var ports = JSON.parse(localStorage.getItem("allports"));
        console.log(ports);
        ports[0] = Object.assign(
            new sp(ports[0].path, {
                baudRate: 9600
            }),
            ports[0]
        );
        console.log(ports[0]);

        ports[0].on("open", () => {
            //ports[0].write("e");
            console.log("hello");
        });
    }
}

// Extra functions
// See which COM ports are available and write to display.
function readCOM() {
    var sp = require("serialport");
    var mod0select = document.getElementById("mod0select");
    var mod1select = document.getElementById("mod1select");
    var mod2select = document.getElementById("mod2select");
    var mod3select = document.getElementById("mod3select");

    // Read ports from Serial port and create a variable PORTS.
    sp.list().then(ports => {
        var i = 0;
        ports.forEach(function(port) {
            i = i + 1;
            console.log(port.path);
            console.log(i);

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
