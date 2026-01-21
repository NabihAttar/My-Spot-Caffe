"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function MenuQRCode() {
  const url = "https://my-spot-caffe-kappa.vercel.app/food-menu";

  return (
    <div style={{ background: "white", padding: 12, display: "inline-block" }}>
      <QRCodeCanvas value={url} size={220} />
    </div>
  );
}
