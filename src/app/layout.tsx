import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/bundle";
import "react-modal-video/css/modal-video.css";
import "react-toastify/dist/ReactToastify.css";
import "react-photo-view/dist/react-photo-view.css";
import "react-datepicker/dist/react-datepicker.css";

import "@/assets/css/font-awesome.css";
import "@/assets/css/animate.css";
import "@/assets/css/flaticon-set.css";
import "@/assets/css/shop.css";
import "@/assets/css/helper.css";
import "@/assets/css/unit-test.css";
import "@/assets/css/validnavs.css";
import "@/assets/css/style.css";

import Dependency from "@/components/utilities/Dependency";
import ReduxWrapper from "@/components/utilities/ReduxWrapper";
import type { Metadata, Viewport } from "next";

// Public site URL — override with NEXT_PUBLIC_SITE_URL in your .env when you
// deploy so absolute Open Graph / Twitter / canonical URLs resolve correctly.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://myspotcaffe.com";

const SITE_NAME = "My Spot Caffe";
const SITE_TITLE = "My Spot Caffe | Coffee, Drinks & QR Code Menu";
const SITE_DESCRIPTION =
  "Discover My Spot Caffe, a modern coffee shop serving delicious coffee, refreshing drinks, desserts, and an easy QR code menu experience.";
const OG_IMAGE = "/assets/img/my%20spot%20logo%20png.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | My Spot Caffe",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "My Spot Caffe",
    "coffee shop",
    "caffe",
    "cafe menu",
    "QR code menu",
    "coffee",
    "drinks",
    "desserts",
    "digital menu",
    "coffee menu",
  ],
  category: "food",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/assets/img/favicon.png",
  },
  manifest: undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "My Spot Caffe Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a120b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      {/* Apply font to the entire site */}
      <body >
        <ReduxWrapper>
          <Dependency />
          {children}
        </ReduxWrapper>
      </body>
    </html>
  );
}
