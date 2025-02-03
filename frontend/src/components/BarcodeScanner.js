import { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function BarcodeScanner({ onScan }) {
  const [scanner, setScanner] = useState(null);
  const [scannedCode, setScannedCode] = useState('');

  const startScanner = () => {
    const qrScanner = new Html5QrcodeScanner(
      "qr-reader", { fps: 10, qrbox: 250 }
    );
    qrScanner.render(
      (decodedText) => {
        setScannedCode(decodedText);
        onScan(decodedText);
        qrScanner.clear();
      },
      (errorMessage) => {
        console.warn(errorMessage);
      }
    );
    setScanner(qrScanner);
  };

  return (
    <div className="p-4">
      <button onClick={startScanner} className="bg-blue-500 text-white px-4 py-2 rounded">
        Scan Barcode
      </button>
      <div id="qr-reader" className="mt-4"></div>
      {scannedCode && <p className="mt-2 text-green-600">Scanned Code: {scannedCode}</p>}
    </div>
  );
}