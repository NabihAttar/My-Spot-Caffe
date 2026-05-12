import type { Metadata } from "next";
import Home1 from "./home-1/page";

export const metadata: Metadata = {
  title: "My Spot Caffe | Coffee, Drinks & QR Code Menu",
  description:
    "Welcome to My Spot Caffe, your place for coffee, drinks, desserts, and a smooth QR code menu experience.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "My Spot Caffe | Coffee, Drinks & QR Code Menu",
    description:
      "Welcome to My Spot Caffe, your place for coffee, drinks, desserts, and a smooth QR code menu experience.",
    url: "/",
  },
  twitter: {
    title: "My Spot Caffe | Coffee, Drinks & QR Code Menu",
    description:
      "Welcome to My Spot Caffe, your place for coffee, drinks, desserts, and a smooth QR code menu experience.",
  },
};

export default function HomePage() {
  return (
    <>
      <Home1 />
    </>
  );
}
