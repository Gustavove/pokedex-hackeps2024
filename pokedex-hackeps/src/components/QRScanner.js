import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = ({onScanResult}) => {
    const [data, setData] = useState("No se ha detectado ningún ID");
    const [lastData, setLastData] = useState(""); // Estado para rastrear el último código leído

    const handleScan = (result) => {
        if (result?.text) {
            const extractedId = result.text.split("/").pop();

            if (extractedId !== lastData) {
                setData(extractedId || "No se encontró un ID válido");
                setLastData(extractedId);
                onScanResult(extractedId);
            }
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <QrReader
                onResult={(result) => {
                    if (result?.text) {
                        handleScan(result);
                    }
                }}
                style={{ width: "100%" }}
                constraints={{ facingMode: "environment" }} // Cámara trasera
            />
            <p>Id de la zona: {data}</p>
        </div>
    );
};

export default QRScanner;