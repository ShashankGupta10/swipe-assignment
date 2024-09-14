import React from "react";
import { BiPlus, BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";
import Button from "./common/Button";

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items, onRowAdd } = props;

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const item = JSON.parse(data);
    console.log(item);
    const addableItem = {
      itemId: item.id,
      itemName: item.productName,
      itemDescription: item.productDescription,
      itemQuantity: 1,
      itemPrice: item.productPrice,
    };
    onRowAdd(addableItem);
    console.log(items);
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border p-4">
      <div
        className="w-full border-indigo-600 border-dashed border-2 h-40 rounded-xl flex justify-center items-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <span>DROP ITEM HERE</span>
      </div>
      {items.map((item) => (
        <ItemForm
          key={item.id}
          item={item}
          onDelEvent={onRowDel}
          onItemizedItemEdit={onItemizedItemEdit}
          currency={currency}
          onRowAdd={onRowAdd}
        />
      ))}
      <span>
        <Button
          onClick={onRowAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-indigo-600 transition font-medium"
        >
          <BiPlus className="w-6 h-6" /> Add Item
        </Button>
      </span>
    </div>
  );
};

const ItemForm = (props) => {
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="font-medium">Item Name</label>
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
          </div>
          <div>
            <label className="font-medium">Description</label>
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
          </div>
          <div>
            <label className="font-medium">Quantity</label>
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
          </div>
          <div>
            <label className="font-medium">Price</label>
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
                value: props.item.itemPrice,
                id: props.item.itemId,
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 items-center">
          <div></div>
          <BiTrash
            onClick={onDelEvent}
            className="text-red-500 cursor-pointer hover:text-red-600 transition w-6 h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;
