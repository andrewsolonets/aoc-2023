const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((r) => r.split(":"));

// 12 red cubes, 13 green cubes, and 14 blue cubes

/* 
LOGIC: 
0. Initialize powerSum variable.
1. Loop through each game - Get gameId,
2. Initialize maxCubes variables for each color.
2. split game string by ";", getting each "set" as an array entry
3. Loop through each set
4. Get x, y, z - number of red, green, blue cubes in the current set.
5. Compare x,y,z to maxCubes variables, if one of them is bigger, update maxCubes accordingly.
6. Multiply x * y * z, add the result to powerSum.
*/

let powerSum = 0;

input.forEach((row) => {
  const sets = row[1]?.split(";");

  let minCubes = { red: 0, blue: 0, green: 0 };
  sets.forEach((set) => {
    // Gives as an array of "x {color}" strings
    const cubesByColor = set.split(",");
    cubesByColor.forEach((singleColorCubes) => {
      Object.entries(minCubes).forEach((el) => {
        const color = el[0];
        const currentMinCount = el[1];
        //@ts-ignore
        const currentCubeCount = parseInt(singleColorCubes?.match(/(\d+)/)[0]);
        // console.log(color, currentMinCount < currentCubeCount);
        if (
          singleColorCubes.includes(color) &&
          currentMinCount < currentCubeCount
        ) {
          minCubes = { ...minCubes, [color]: currentCubeCount };
        }
      });
    });
  });
  powerSum += minCubes.blue * minCubes.green * minCubes.red;
});

console.log(powerSum, "POWER SUM");
