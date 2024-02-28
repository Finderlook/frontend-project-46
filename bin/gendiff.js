#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .option('-v, --version', 'output the current version')
    .helpOption('-h, --help', 'output usage information');


program.parse();