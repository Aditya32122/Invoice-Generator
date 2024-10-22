// src/components/Invoice.js
import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import InvoiceItem from './InvoiceItem';

const Invoice = () => {
  const [items, setItems] = useState([{ description: '', amount: '' }]);
  const [total, setTotal] = useState(0);

  const addItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
    calculateTotal(newItems);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    calculateTotal(newItems);
  };

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    setTotal(totalAmount);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Invoice", 20, 20);

    // Prepare table data
    const tableData = items.map(item => [item.description, item.amount]);
    tableData.unshift(["Description", "Amount"]); // Add header

    doc.autoTable({
      head: [["Description", "Amount"]],
      body: tableData,
      startY: 30,
      theme: 'grid'
    });

    // Add total
    doc.text(`Total: $${total}`, 20, doc.lastAutoTable.finalY + 10);
    doc.save("invoice.pdf");
  };

  return (
    <div className="invoice-container">
      <h1>Invoice Maker</h1>
      {items.map((item, index) => (
        <div key={index} className="item-row">
          <input
            type="text"
            name="description"
            placeholder="Item Description"
            value={item.description}
            onChange={(e) => handleChange(index, e)}
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={item.amount}
            onChange={(e) => handleChange(index, e)}
          />
          <InvoiceItem item={item} index={index} removeItem={removeItem} />
        </div>
      ))}
      <button onClick={addItem}>Add Item</button>
      <h2>Total: ${total}</h2>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default Invoice;
