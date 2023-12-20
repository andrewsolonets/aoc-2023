const input = Deno.readTextFileSync("input.txt")
  .split("\n")
  .map((r) => r.split(":"));

type Card = {
  cardNumber: string;
  winningNumbers: string[];
  existingNumbers: string[];
};

function getCards(rows: string[][]) {
  return rows?.map((row) => {
    //@ts-ignore
    const gameID = row[0]?.match(/(\d+)/)[0];
    // console.log(gameID);
    const splitNumbers = row[1].split("|")?.map((el) =>
      el
        ?.trim()
        .split(" ")
        ?.filter((el) => el?.length)
    );

    const winningNumbers = splitNumbers[0];
    const existingNumbers = splitNumbers[1];

    return { cardNumber: gameID, winningNumbers, existingNumbers };
  });
}

const cards = getCards(input);
// console.log(cards);

function solve(cards: Card[]) {
  const cardInstances = cards.reduce<Record<string, number>>((acc, card) => {
    acc[card.cardNumber] = 1;
    return acc;
  }, {});
  // console.log(cardInstances);
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const hits = checkNumberOfWins(card);
    for (let j = 1; j <= hits && i + j < cards.length; j++) {
      const nextCard = cards[i + j];
      cardInstances[nextCard.cardNumber] =
        (cardInstances[nextCard.cardNumber] ?? 0) +
        cardInstances[card.cardNumber];
    }
  }
  return Object.values(cardInstances).reduce((sum, x) => sum + x, 0);
}

console.log("total", solve(cards));

function checkNumberOfWins(card: Card) {
  return card.existingNumbers.reduce(
    (acc, cardNum) => (card.winningNumbers.includes(cardNum) ? acc + 1 : acc),
    0
  );
}
