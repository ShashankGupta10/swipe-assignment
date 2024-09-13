import React from "react";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import Button from "./common/Button";

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items, onRowAdd } = props;

  const itemTable = items.map((item) => (
    <ItemRow
      key={item.id}
      item={item}
      onDelEvent={onRowDel}
      onItemizedItemEdit={onItemizedItemEdit}
      currency={currency}
    />
  ));

  return (
    <div>
      <table className="min-w-full border border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">ITEM</th>
            <th className="px-4 py-2 text-left">QTY</th>
            <th className="px-4 py-2 text-left">PRICE/RATE</th>
            <th className="px-4 py-2 text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </table>
      <Button
        onClick={onRowAdd}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-indigo-600 transition font-bold"
      >
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="px-4 py-2 w-full">
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemName",
            placeholder: "Item name",
            value: props.item.itemName,
            id: props.item.itemId,
          }}
        />
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "text",
            name: "itemDescription",
            placeholder: "Item description",
            value: props.item.itemDescription,
            id: props.item.itemId,
          }}
        />
      </td>
      <td className="px-4 py-2" style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            type: "number",
            name: "itemQuantity",
            min: 1,
            step: "1",
            value: props.item.itemQuantity,
            id: props.item.itemId,
          }}
        />
      </td>
      <td className="px-4 py-2" style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={(evt) =>
            props.onItemizedItemEdit(evt, props.item.itemId)
          }
          cellData={{
            leading: props.currency,
            type: "number",
            name: "itemPrice",
            min: 1,
            step: "0.01",
            precision: 2,
            textAlign: "text-end",
            value: props.item.itemPrice,
            id: props.item.itemId,
          }}
        />
      </td>
      <td className="px-4 py-2 text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          className="text-red-500 cursor-pointer hover:text-red-600 transition"
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
