var fs = require('fs-extra');
var path = require('path');
var childProcess = require('child_process');

var DEFAULT_LOG_FILENAME = 'NWJSChromeDriver.txt'

var NWJSChromeDriverLauncher = function() {
        this.chromeDriverLogs = null
        this.chromeDriverArgs = {}
        this.logToStdout = false
}

NWJSChromeDriverLauncher.prototype.onPrepare = function(config) {
    var isWin = /^win/.test(process.platform);

    var executable = process.platform === isWin ? 'chromedriver.exe' : 'chromedriver';
    this.binPath = path.join(process.cwd(), config.nwjsChromeDriverPath, executable);

    this.chromeDriverArgs = config.chromeDriverArgs || [];
    this.chromeDriverLogs = config.chromeDriverLogs;
    this.logToStdout = config.logToStdout;

    return new Promise((resolve, reject) => {
        this.process = childProcess.execFile(this.binPath, this.chromeDriverArgs, (err, stdout, stderr) => {
            if (err) {
                return reject(err);
            }
        })

        if (this.process) {
            if (typeof this.chromeDriverLogs === 'string') {
                this.redirectLogStream();
            }
            resolve();
        }
    })
};

NWJSChromeDriverLauncher.prototype.onComplete = function() {
    if (this.process) {
        this.process.kill();
    }
}

NWJSChromeDriverLauncher.prototype.redirectLogStream = function() {
    var logFile = path.join(this.chromeDriverLogs, DEFAULT_LOG_FILENAME);

    // ensure file & directory exists
    fs.ensureFileSync(logFile);

    var logStream = fs.createWriteStream(logFile, { flags: 'w' });

    this.process.stdout.pipe(logStream);
    this.process.stderr.pipe(logStream);
}

module.exports = NWJSChromeDriverLauncher;