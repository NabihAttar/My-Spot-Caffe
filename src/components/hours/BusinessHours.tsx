"use client";

import Image from "next/image";

const BusinessHours = () => {
  return (
    <div className="opening-hours-area default-padding overflow-hidden">
      <div className="container">
        <div className="opening-hour-items">
          <h2 className="text-fixed">My Spot</h2>

          <div className="shape">
            <Image
              src="/assets/img/shape/CozyCaffe3.png"
              width={1304}
              height={673}
              alt="Image Not Found"
            />
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="opening-hours-thumb video-bg-live">
                <video
                  src="/assets/img/video/spot.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{ width: "100%", height: "506px", objectFit: "cover" }}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="opening-hours-info animate" data-aos="fade-left">
                <h3>Opening Hours</h3>
                <p>
                  A relaxing and pleasant atmosphere, good jazz, and cocktails.
                  My Spot Café is the perfect place to unwind after a long day or
                  catch up with friends over a cup of coffee.
                </p>

                <ul className="opening-hours-table">
                  <li>
                    <h6>Monday:</h6> <span>9:00 AM - 1:00 AM</span>
                  </li>
                  <li>
                    <h6>Tuesday:</h6> <span>9:00 AM - 1:00 AM</span>
                  </li>
                  <li>
                    <h6>Wednesday:</h6> <span>9:00 AM - 1:00 AM</span>
                  </li>
                  <li>
                    <h6>Thursday:</h6> <span>9:00 AM - 1:00 AM</span>
                  </li>
                  <li>
                    <h6>Friday:</h6> <span>9:00 AM - 1:00 AM</span>
                  </li>
                  <li>
                    <h6>Saturday:</h6> <span>9:00 AM - 1:00 AM</span>
                  </li>
                  <li>
                    <h6>Sunday:</h6> <span>9:00 AM - 1:00 AM</span>
                  </li>
                </ul>

                <div className="call-to-action">
                  <div className="icon">
                    <Image
                      src="/assets/img/icon/6.png"
                      alt="Image Not Found"
                      width={64}
                      height={64}
                    />
                  </div>

                  <div className="info">
                    <p>Call Anytime</p>
                    <a
                      href="https://wa.me/96171592971?text=Hello%20My%20Spot%20Caffe!%20I%27d%20like%20to%20order%20a%20coffee."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      71 592 971
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
      </div>
    </div>
  );
};

export default BusinessHours;
