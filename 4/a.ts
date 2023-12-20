const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((r) => r.split(":"));

let total = 0;

input.forEach((row) => {
  let gameTotal = 0;

  // console.log(gameID);
  const splitNumbers = row[1].split("|")?.map((el) =>
    el
      ?.trim()
      .split(" ")
      ?.filter((el) => el?.length)
  );

  const winningNumbers = splitNumbers[0];
  const currentNumbers = splitNumbers[1];

  currentNumbers.forEach((num) => {
    if (winningNumbers.includes(num)) {
      // console.log(gameID, num);
      if (gameTotal === 0) {
        gameTotal = 1;
        return;
      } else {
        gameTotal = gameTotal * 2;
      }
    }
  });
  // console.log(gameTotal);
  total += gameTotal;
  // console.log(gameID, winningNumbers, currentNumbers);
});

console.log("total", total);
