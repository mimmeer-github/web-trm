const express = require('express');
const os = require('os');
var pty = require('node-pty');

var shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';

var ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env
});

const srv = express();

srv.get('/run', (req, res) => {
    let session = cp.spawn(bash, [bashargs, req.query.cmd]);
    session.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.write(data);
    });
    session.on("close", () => {
        res.end();
    })
})

srv.listen(8192)