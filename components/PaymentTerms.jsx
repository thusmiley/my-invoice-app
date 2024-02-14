"use client";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

const terms = [
  { id: 1, name: "Net 1 Day" },
  { id: 2, name: "Net 7 Days" },
  { id: 3, name: "Net 14 Days" },
  { id: 4, name: "Net 30 Days" },
];

const PaymentTerms = () => {
  const [selectedTerm, setSelectedTerm] = useState(terms[3]);
  return (
    <Listbox value={selectedTerm} onChange={setSelectedTerm}>
      <Listbox.Button>{selectedTerm.name}</Listbox.Button>
      <Listbox.Options>
        {terms.map((term) => (
          <Listbox.Option key={term.id} value={term}>
            {term.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default PaymentTerms;
