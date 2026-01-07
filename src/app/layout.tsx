import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'react-modal-video/css/modal-video.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-photo-view/dist/react-photo-view.css';
import "react-datepicker/dist/react-datepicker.css";

import '@/assets/css/font-awesome.css';
import '@/assets/css/animate.css';
import '@/assets/css/flaticon-set.css';
import '@/assets/css/shop.css';
import '@/assets/css/helper.css';
import '@/assets/css/unit-test.css';
import '@/assets/css/validnavs.css';
import '@/assets/css/style.css';

import Dependency from "@/components/utilities/Dependency";
import type { Metadata } from "next";
import ReduxWrapper from '@/components/utilities/ReduxWrapper';

export const metadata: Metadata = {
  title: "Restan - Food & Restaurant NextJS Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxWrapper>
          <Dependency />
          {children}
        </ReduxWrapper>
      </body>
    </html>
  );
}
