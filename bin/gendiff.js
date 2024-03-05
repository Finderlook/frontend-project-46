#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
import genDiff from '../src/index.js';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1', '-v, --version', 'output the current version')
    .option('-f, --format <type>', 'output format')
    .helpOption('-h, --help', 'output usage information')
    .arguments('<filepath1>')
    .arguments('<filepath2>')
    .action((filepath1, filepath2) => {
        const diff = genDiff(filepath1, filepath2);
        console.log(diff);
    });
program.parse();