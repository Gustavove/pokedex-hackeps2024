import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
    const [data, setData] = useState("No se ha detectado ningún ID");
    const [error, setError] = useState("");

    const handleScan = (result) => {
        if (result) {
            const extractedId = result.text.split('/').pop();
            setData(extractedId || "No se encontró un ID válido");
            setError("");
        }
    };

    const handleError = (err) => {
        console.error("Error al escanear:", err);
        setError("Error al intentar leer el QR.");
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Escanner de zonas</h2>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        handleScan(result);
                    }

                    if (!!error) {
                        handleError(error);
                    }
                }}
                style={{ width: "100%" }}
                constraints={{ facingMode: "environment" }} // Cámara trasera
            />
            <p>Id de la zona: {data}</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default QRScanner;