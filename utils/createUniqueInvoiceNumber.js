/**
    Each ID must start with 2 capital letters and end with 4 numbers, characters can repeat

    26 possibilities for first char 0 
    26 possibilities for second char 1
    10 possibilities for chars 2 - 6

    26 ^ 2 * 10 ^ 4 = 6,760,000 combinations
*/

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export const createInvoiceNumber = () => {
  let invoiceNumber = "";

  for (let i = 0; i < 2; i++) {
    const index = Math.floor(Math.random() * 25);
    invoiceNumber += letters[index].toUpperCase();
  }

  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * 9);
    invoiceNumber += index;
  }

  return invoiceNumber;
};

export const uniqueInvoiceNumber = (invoiceNumber, invoiceNumbers) => {
  return !invoiceNumbers.includes(invoiceNumber);
};
