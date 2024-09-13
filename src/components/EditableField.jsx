import React from "react";

const EditableField = (props) => {
  return (
    <div className="flex items-center space-x-2 my-1">
      {props.cellData.leading != null && (
        <div className="bg-gray-200 font-bold text-gray-500 p-1 rounded flex items-center justify-center">
          <span className="border border-gray-400 rounded-full flex items-center justify-center text-xs w-5 h-5">
            {props.cellData.leading}
          </span>
        </div>
      )}
      <input
        className={`border border-gray-300 px-3 py-2 rounded ${props.cellData.textAlign}`}
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
