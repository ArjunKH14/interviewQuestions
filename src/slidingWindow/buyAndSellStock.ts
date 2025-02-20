function maxProfit(prices: number[]): number {
  let maxProfit = 0;
  let minValue = prices[0];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minValue) {
      minValue = prices[i];
    } else {
      maxProfit = Math.max(maxProfit, prices[i] - minValue);
    }
  }

  return Math.max(maxProfit, 0);
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
