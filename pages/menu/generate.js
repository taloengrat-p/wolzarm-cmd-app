import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import color from "picocolors";
import chokidarPkg from "chokidar";
import fsPkg from "fs";
import csvPkg from "csv-parser";

const chokidar = chokidarPkg;
const fs = fsPkg;
const csv = csvPkg;

export const Generate = () => {
  async function onGenerateLocaleI18NLocale() {
    console.clear();

    const generateInput = await p.group({
      csvInputPath: () =>
        p.text({
          message: "Where locale.csv file source?",
          placeholder: "./locale.csv",
          validate: (value) => {
            if (!value) return "Please enter a path.";
            if (value[0] !== ".") return "Please enter a relative path.";
            if (!value.endsWith(".csv")) return "Please provide a csv file.";
          },
        }),
      outputPath: () =>
        p.text({
          message:
            "Where output th.json, en.json and string.g file destination?",
          placeholder: "./{folderName}",
          validate: (value) => {
            if (!value) return "Please enter a path.";
            if (value[0] !== ".") return "Please enter a relative path.";
          },
        }),
      outputFileType: ({ results }) =>
        p.select({
          message: `Pick a project type within "${results.outputPath}"`,
          initialValue: "ts",
          options: [
            { value: "ts", label: "TypeScript" },
            { value: "js", label: "JavaScript" },
          ],
        }),
    });

    onGenerateStart(
      generateInput.csvInputPath,
      generateInput.outputPath,
      generateInput.outputFileType
    );
  }

  function onGenerateStart(csvInput, baseOutputPath, fileType) {
    console.log("onGenerateStart", { csvInput, baseOutputPath });

    const outputEN = `${baseOutputPath}/en.json`;
    const outputTH = `${baseOutputPath}/th.json`;
    const outputStringG = `${baseOutputPath}/string.g.${fileType}`;

    const options = {
      delimiter: ",",
      quote: '"',
    };

    let enResults = [];
    let thResults = [];
    let stringsConcat = "";

    chokidar.watch(csvInput).on("change", (path) => {
      // Read the updated contents of the JSON file and convert to text format
      console.log(color.bgWhite(`re generate ${path}`));
      enResults = [];
      thResults = [];
      stringsConcat = "";

      fs.createReadStream(csvInput)
        .pipe(csv(options))
        .on("data", (data) => {
          const key = data.key;

          const enObject = `{ "${key}" : "${data.en}" }`;
          const thObject = `{ "${key}" : "${data.th}" }`;

          if (key !== undefined) {
            const stringLineObject = `const ${key} = "${key}"\n`;
            stringsConcat += stringLineObject;
          }

          console.log({ enObject, thObject });

          enResults.push(JSON.parse(enObject));
          thResults.push(JSON.parse(thObject));
        })
        .on("end", () => {
          if (!fs.existsSync(baseOutputPath)) {
            fs.mkdirSync(baseOutputPath);
          }

          const stringGResult = `${
            fileType === "ts" ? "export StringsG" : ""
          } { ${stringsConcat} }`;

          fs.writeFileSync(outputEN, JSON.stringify(enResults));
          fs.writeFileSync(outputTH, JSON.stringify(thResults));
          fs.writeFileSync(outputStringG, stringGResult);
        });
    });
  }

  return { onGenerateLocaleI18NLocale };
};
