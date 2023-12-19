const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((r) => r.split(":"));

// 12 red cubes, 13 green cubes, and 14 blue cubes

/* 
LOGIC: 
1. Initialise idsSum variable 
2. Loop through each game - Get gameId,
2. split game string by ";", getting each "set" as an array entry
3. Loop through sets, get x, y, z - number of red, green, blue cubes in the current set.
4. IF x > 12 OR y > 13 OR z > 14 - game = impossible, ELSE idsSum += gameId
*/

let idsSum = 0;

// const totals = [{ red: 12 }, { green: 13 }, { blue: 14 }];
const totals = { red: 12, green: 13, blue: 14 };

input.forEach((row) => {
  //@ts-ignore
  const gameID = parseInt(row[0]?.match(/(\d+)/)[0]);

  const sets = row[1]?.split(";");

  // If at least 1 set is impossible - the entire game is.

  const isGameImpossible = sets.some((set) => {
    // Gives as an array of "x {color}" strings
    const cubesByColor = set.split(",");
    return cubesByColor.some((singleColorCubes) => {
      const impossibleCase = Object.entries(totals).some((el) => {
        const color = el[0];
        const maxCubeCount = el[1];
        //@ts-ignore
        const currentCubeCount = parseInt(singleColorCubes?.match(/(\d+)/)[0]);

        return (
          singleColorCubes.includes(color) && currentCubeCount > maxCubeCount
        );
      });
      return impossibleCase;
    });
  });
  if (!isGameImpossible) {
    idsSum += gameID;
  }
});

console.log(idsSum, "IDS SUM");
