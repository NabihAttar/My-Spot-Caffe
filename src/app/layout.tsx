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
import type { Metadata } from "next";


// const elegante = localFont({
//   src: "../fonts/Elegant.ttf",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "My Spot Café",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
