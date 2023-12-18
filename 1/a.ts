const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((r) => r.split(""));

let totalSum = 0;

input.forEach((row) => {
  const rowNumbers = [] as string[];

  row.forEach((str) => {
    const number = parseInt(str);
    if (!isNaN(number)) {
      // calibrationValue += str;
      rowNumbers.push(str);
    }
  });
  const calibrationValue = rowNumbers.length
    ? //@ts-ignore
      Number(rowNumbers.at(0) + rowNumbers.at(-1))
    : 0;
  totalSum += calibrationValue;
});

console.log(totalSum);
