const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((r) => r.split(""));

const numbersSpelled = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

let totalSum = 0;

input.forEach((row) => {
  const rowNumbers = [] as string[];

  let spelledOut = "";

  row.forEach((str) => {
    const number = parseInt(str);
    if (!isNaN(number)) {
      // calibrationValue += str;
      rowNumbers.push(str);
    } else {
      spelledOut += str;

      for (let i = spelledOut.length - 1; i >= 0; i--) {
        // console.log(spelledOut.slice(i));
        const num = numbersSpelled.indexOf(spelledOut.slice(i));
        if (num !== -1) {
          rowNumbers.push(num.toString());

          break;
        }
      }
    }
  });
  // console.log(spelledOut);
  const calibrationValue = rowNumbers.length
    ? //@ts-ignore
      Number(rowNumbers.at(0) + rowNumbers.at(-1))
    : 0;
  // console.log(rowNumbers);
  totalSum += calibrationValue;
});
console.log(totalSum, "- total");
