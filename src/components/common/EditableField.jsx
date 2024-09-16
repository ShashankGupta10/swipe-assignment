import React from "react";

const EditableField = (props) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${props.cellData.textAlign}`}
        type={props.cellData.type}
        placeholder={props.cellData.placeholder}
        min={props.cellData.min}
        name={props.cellData.name}
        id={props.cellData.id}
        value={props.cellData.value}
        step={props.cellData.step}
        precision={props.cellData.precision}
        aria-label={props.cellData.name}
        onChange={props.onItemizedItemEdit}
        required
      />
    </div>
  );
};

export default EditableField;
