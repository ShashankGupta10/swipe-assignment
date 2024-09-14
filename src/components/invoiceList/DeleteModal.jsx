import React from "react";
import { BiTrash } from "react-icons/bi";

const DeleteModal = ({ id, dispatch, deleteInvoice, setIsDeleteModalOpen }) => {
  if (!id) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white flex flex-col items-center max-w-xl rounded-xl border px-8 py-10 text-gray-800 shadow-lg">
        <BiTrash className="h-16 w-16 rounded-xl bg-red-100 p-2 text-red-500" />
        <p className="mt-4 text-center text-xl font-bold">Deleting Invoice</p>
        <p className="mt-2 text-center text-lg">
          Are you sure you want to delete the invoice with ID{" "}
          <span className="truncate font-medium">{id}</span>? Keep in mind that
          this cannot be undone.
        </p>
        <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <button
            className="whitespace-nowrap rounded-xl bg-red-600 hover:bg-red-500 px-4 py-3 font-medium text-white"
            onClick={() => dispatch(deleteInvoice(id))}
          >
            Yes, delete the invoice
          </button>
          <button
            className="whitespace-nowrap rounded-xl bg-gray-100 hover:bg-gray-200 px-4 py-3 font-medium"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel, keep the invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
