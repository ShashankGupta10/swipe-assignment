import React, { useRef, useEffect } from "react";
import { BiPaperPlane, BiCloudDownload, BiX } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Button from "./common/Button";

const generatePDF = () => {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });
};

const InvoiceModal = ({ showModal, closeModal, info, items, currency, subTotal, taxAmount, discountAmount, total }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, closeModal]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div ref={modalRef} className="bg-white rounded-lg w-full max-w-4xl p-6 py-12 relative">
            <div id="invoiceCapture" className="space-y-6">
              <div className="flex justify-between items-start bg-gray-100 p-4 rounded-lg">
                <div>
                  <h6 className="font-bold text-gray-500 mb-1">
                    Invoice ID: {info.id || ""}
                  </h6>
                  <h4 className="font-bold text-lg">
                    {info.billFrom || "John Uberbacher"}
                  </h4>
                  <h7 className="font-bold text-gray-500 mb-1">
                    Invoice No.: {info.invoiceNumber || ""}
                  </h7>
                </div>
                <div className="text-right">
                  <h6 className="font-bold mt-1 mb-2">Amount Due:</h6>
                  <h5 className="font-bold text-gray-600">
                    {currency} {total}
                  </h5>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="font-bold">Billed to:</p>
                  <p>{info.billTo || ""}</p>
                  <p>{info.billToAddress || ""}</p>
                  <p>{info.billToEmail || ""}</p>
                </div>
                <div>
                  <p className="font-bold">Billed From:</p>
                  <p>{info.billFrom || ""}</p>
                  <p>{info.billFromAddress || ""}</p>
                  <p>{info.billFromEmail || ""}</p>
                </div>
                <div>
                  <p className="font-bold">Date Of Issue:</p>
                  <p>{info.dateOfIssue || ""}</p>
                </div>
              </div>

              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="border-b">
                    <th>QTY</th>
                    <th>DESCRIPTION</th>
                    <th className="text-right">PRICE</th>
                    <th className="text-right">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-2">{item.itemQuantity}</td>
                      <td>
                        {item.itemName} - {item.itemDescription}
                      </td>
                      <td className="text-right">
                        {currency} {item.itemPrice}
                      </td>
                      <td className="text-right">
                        {currency} {item.itemPrice * item.itemQuantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="grid grid-cols-1 md:grid-cols-3">
                <div></div>
                <div></div>
                <div>
                  <table className="w-full">
                    <tbody>
                      <tr className="text-right">
                        <td className="font-bold">TAX</td>
                        <td className="text-right">
                          {currency} {taxAmount}
                        </td>
                      </tr>
                      {discountAmount !== 0.0 && (
                        <tr className="text-right">
                          <td className="font-bold">DISCOUNT</td>
                          <td className="text-right">
                            {currency} {discountAmount}
                          </td>
                        </tr>
                      )}
                      <tr className="text-right">
                        <td className="font-bold">TOTAL</td>
                        <td className="text-right">
                          {currency} {total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {info.notes && (
                <div className="bg-gray-100 p-4 rounded-lg">
                  {info.notes}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Button onClick={generatePDF}>
                <BiPaperPlane className="mr-2 w-8 h-8" />
                <span>Send Invoice</span>
              </Button>
              <Button onClick={generatePDF}>
                <BiCloudDownload className="mr-2 w-8 h-8" />
                <span>Download Copy</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceModal;
