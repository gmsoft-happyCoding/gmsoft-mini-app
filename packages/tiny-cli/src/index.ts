import { Command } from "commander";

const program = new Command();

program
  .version("1.0.0")
  .command("@gmsoft-tiny")
  .option("-v, --recursive", "Remove recursively")
  .description("Split a string into substrings and display as an array");

program.parse();
