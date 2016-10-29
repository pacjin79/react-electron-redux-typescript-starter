#! /usr/bin/env node

const spawn = require('child_process').spawn;

const compileEntry = spawn('node_modules/typescript/bin/tsc', ['-p', './main_proc_tsconfig.json']);
compileEntry.stdout.on('data', (data) => {
    console.log(`${data}`);
    console.log("=====Completed compiling main process.");
});

compileEntry.stderr.on('data', (data) => {
  console.log(`${data}`);
});

compileEntry.on('close', (code) => {
    spawn('yarn', ['run', 'kickoff']).stdout.on('data', (data) => {
        console.log(`${data}`);
    });
})


