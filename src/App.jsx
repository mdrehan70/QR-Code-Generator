import { useRef, useState } from "react";
import "./App.css";
import QRCode from "qrcode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const input = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleQrCodeGenerator = async () => {
    const value = input.current.value.trim();
    if (!value) {
      toast.error("⚠️ Please enter some text or link!");
      return;
    }

    setLoading(true);
    await QRCode.toCanvas(canvasRef.current, value)
      .then(() => {
        setLoading(false);
        input.current.value = "";
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleQrCodeGenerator();
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="title">🚀 QR Code Generator</h2>
        <div className="input-section">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="Enter text or URL..."
            ref={input}
            className="input-field"
          />
          <button
            onClick={handleQrCodeGenerator}
            disabled={loading}
            className="generate-btn"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {loading && <div className="loader"></div>}

        <canvas ref={canvasRef} className="qrCanvas"></canvas>
      </div>
      <div className="footer">
        <p className="footerPara">
          Created By <strong>Md Rehan</strong> from
          <a
            href="https://github.com/mdrehan70"
            target="_blank"
            style={{ color: "white" }}
          >
            {" "}
            @Rehan Github
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
