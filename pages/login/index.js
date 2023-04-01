import pkg from "node-emoji";

import { text, intro, outro, spinner } from "@clack/prompts";
import color from "picocolors";

import { setTimeout as sleep } from "node:timers/promises";
import { PageMenu } from "../menu/PageMenu.js";

const { get } = pkg;

const menu = PageMenu();
export const Login = () => {
  async function open() {
    console.log();

    intro(color.bgMagenta("<=-. Login .-=>"));

    const key = await text({
      message: " Please enter your key... ",
      placeholder: "key password",
      validate(value) {
        if (value.length === 0) return `Key is required!`;
      },
    });

    const s = spinner();
    s.start("Validating Key");

    await sleep(1500);

    if (key === "admin") {
      s.stop(color.green(`Key Verify Success ${get("white_check_mark")}`));
      menu.open();
    } else {
      s.stop(color.red(`Key Verify fail ${get("x")}`));

      return open();
    }
  }

  return { open };
};
