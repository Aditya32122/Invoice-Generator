
// src/components/InvoiceItem.js
import React from 'react';

const InvoiceItem = ({ item, index, removeItem }) => {
  return (
    <div>
      <span>{index + 1}. {item.description} - ${item.amount}</span>
      <button onClick={() => removeItem(index)}>Remove</button>
    </div>
  );
};

export default InvoiceItem;
