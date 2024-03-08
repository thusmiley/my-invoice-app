import * as yup from "yup";

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
    case 0:
      return 1;
    case 1:
      return 7;
    case 2:
      return 14;
    case 3:
      return 30;
  }
};

export const findPaymentDueDate = (date, days) => {
  let myNewDate = new Date(date);
  let result = myNewDate.setDate(myNewDate.getDate() + days);
  return result;
};

export const Schema = yup.object().shape({
  senderStreet: yup.string().required("can't be empty"),
  senderCity: yup.string().required("can't be empty"),
  senderZipCode: yup.string().required("can't be empty"),
  senderCountry: yup.string().required("can't be empty"),
  name: yup.string().required("can't be empty"),
  email: yup.string().email("invalid").required("can't be empty"),
  clientStreet: yup.string().required("can't be empty"),
  clientCity: yup.string().required("can't be empty"),
  clientZipCode: yup.string().required("can't be empty"),
  clientCountry: yup.string().required("can't be empty"),
  projectDescription: yup.string().required("can't be empty"),
});

export const DraftSchema = yup.object().shape({
  senderStreet: yup.string(),
  senderCity: yup.string(),
  senderZipCode: yup.string(),
  senderCountry: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  clientStreet: yup.string(),
  clientCity: yup.string(),
  clientZipCode: yup.string(),
  clientCountry: yup.string(),
  projectDescription: yup.string(),
});

export const emptyInvoice = {
  date: new Date(),
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
  invoiceItems: [],
  amountDue: 0.0,
};

// export const getCookie = (name) => {
//   var cookie = document.cookie;
//   var prefix = name + "=";
//   var begin = cookie.indexOf("; " + prefix);
//   if (begin == -1) {
//     begin = cookie.indexOf(prefix);
//     if (begin != 0) return null;
//   } else {
//     begin += 2;
//     var end = document.cookie.indexOf(";", begin);
//     if (end == -1) {
//       end = cookie.length;
//     }
//   }
//   return unescape(cookie.substring(begin + prefix.length, end));
// };
