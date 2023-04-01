// Run `npm start` to start the demo
import pkg from "node-emoji";

import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
} from "@clack/prompts";

import { setTimeout as sleep } from "node:timers/promises";

import color from "picocolors";

import { Login } from "./pages/login/index.js";

const { get } = pkg;
const login = Login();

export async function main() {
  intro(color.bgBlue(" WOLZARM CMD APP "));
  intro(color.inverse(" Welcome tan phu jaroen thang lai ! "));

  console.log();

  login.open();
  //   const name = await text({
  //     message: "What is your name?",
  //     placeholder: "Anonymous",
  //   });

  //   if (isCancel(name)) {
  //     cancel("Operation cancelled");
  //     return process.exit(0);
  //   }

  //   const shouldContinue = await confirm({
  //     message: "Do you want to continue?",
  //   });

  //   if (isCancel(shouldContinue)) {
  //     cancel("Operation cancelled");
  //     return process.exit(0);
  //   }

  //   const projectType = await select({
  //     message: "Pick a project type.",
  //     options: [
  //       { value: "ts", label: "TypeScript" },
  //       { value: "js", label: "JavaScript" },
  //       { value: "coffee", label: "CoffeeScript", hint: "oh no" },
  //     ],
  //   });

  //   if (isCancel(projectType)) {
  //     cancel("Operation cancelled");
  //     return process.exit(0);
  //   }

  //   const s = spinner();
  //   s.start("Installing via npm");

  //   await sleep(3000);

  //   s.stop("Installed via npm");

  //   outro("You're all set!");

  //   await sleep(1000);
}

main().catch(console.error);
