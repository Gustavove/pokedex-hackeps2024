import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const QRScanner = () => {
    const [data, setData] = useState("No ha detectado el QR");
    const [error, setError] = useState("");

    const handleScan = (result) => {
        if (result) {
            setData(result.text); // Almacena el texto del QR
            setError(""); // Limpia errores previos
        }
    };

    const handleError = (err) => {
        console.error("Error al escanear:", err);
        setError("Error al intentar leer el QR.");
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h2>QR Scanner</h2>
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
            <p>Resultado: {data}</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default QRScanner;