import { select, intro } from "@clack/prompts";
import color from "picocolors";
import { Generate } from "./generate.js";

const generateFunc = Generate();

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

    if (menus === LOCALE.value) {
      generateLocaleOption();
    }
  }

  async function generateLocaleOption() {
    const Flutter = { label: "Flutter", value: "F" };
    const I18N = { label: "I18N package", value: "I18N" };

    const menuOption = [Flutter, I18N];

    const menus = await select({
      message: "Template",
      options: menuOption,
    });

    if (menus === I18N.value) {
      generateFunc.onGenerateLocaleI18NLocale();
    }
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
