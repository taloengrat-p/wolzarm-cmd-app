import { select, intro } from "@clack/prompts";
import color from "picocolors";

export const PageMenu = () => {
  const EXIT = { label: color.red("Exit"), value: "E" };
  const BACK = { label: color.green("Back"), value: "B" };

  async function open() {
    intro(color.bgBlue("<=-. Menu .-=>"));

    const GENERATE = { label: "Generate", value: "G" };

    const menuOption = [GENERATE, BACK, EXIT];

    const menus = await select({
      message: color.bgYellow("Select menu"),
      options: menuOption,
    });

    if (menus === GENERATE.value) {
      generate();
    } else {
      exitOrBack(menus);
    }
  }

  async function generate() {
    const LOCALE = { label: "Locale", value: "L" };
    const PAGE = { label: "Page", value: "P" };

    const menuOption = [LOCALE, PAGE, BACK, EXIT];

    const menus = await select({
      message: "Generate",
      options: menuOption,
    });
  }

  function exitOrBack(value) {
    if (value === BACK.value) {
      return open();
    } else if (value === EXIT.value) {
      return process.exit(0);
    }
  }

  return { open };
};
