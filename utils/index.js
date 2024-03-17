export const formatDate = (str) => {
  return new Date(str).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatCurrency = (number) => {
  return number?.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const terms = [
  { id: 1, name: "Net 1 Day" },
  { id: 2, name: "Net 7 Days" },
  { id: 3, name: "Net 14 Days" },
  { id: 4, name: "Net 30 Days" },
];

export const findPaymentTerms = (term) => {
  switch (term) {
    case 1:
      return terms[0];
    case 7:
      return terms[1];
    case 14:
      return terms[2];
    case 30:
      return terms[3];
  }
};
export const findPaymentTermsId = (id) => {
  switch (id) {
    case 1:
      return 1;
    case 2:
      return 7;
    case 3:
      return 14;
    case 4:
      return 30;
  }
};

export const findPaymentDueDate = (date, days) => {
  let myNewDate = new Date(date);
  let result = myNewDate.setDate(myNewDate.getDate() + days);
  return result;
};

const today = new Date();
export const emptyInvoice = {
  date: today.toISOString().split("T")[0],
  projectDescription: "",
  paymentTerms: 7,
  billToName: "",
  billToEmail: "",
  status: "draft",
  billFromStreetAddress: "",
  billFromCity: "",
  billFromPostalCode: "",
  billFromCountry: "",
  billToStreetAddress: "",
  billToCity: "",
  billToPostalCode: "",
  billToCountry: "",
  invoiceItems: [{ name: "New Item", quantity: 1, price: 0, total: 0 }],
  amountDue: 0,
};
