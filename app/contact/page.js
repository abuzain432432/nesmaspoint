import React from "react";
import { CgMail } from "react-icons/cg";
import {
  AiFillFacebook,
  AiOutlineAim,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
export default function Page() {
  return (
    <section className="md:py-8 py-5 max-w-[1000px] mx-auto md:px-20 sm:px-6 px-4 min-h-[calc(100vh-65px)]">
      <div>
        <h4 className="font-semibold mb-2 md:text-[20px] underline underline-offset-2  text-[14px] text-slate-700">
          CONTACT US
        </h4>
        <h2 className="xl:text-4xl md:mb-14 sm:mb-8 mb-4 lg:text-3xl sm:text-3xl text-2xl   leading-[1.1] font-semibold lg:leading-[1.15] text-gray-700">
          Let’s talk about NesMasPoint
          <br /> Love to hear from you!
        </h2>
        <div className="sm:flex  lg:gap-2 sm:gap-4 w-full justify-between">
          <div className="flex xl:gap-6 lg:gap-2 sm:mb-0 mb-5 sm:gap-6 gap-4 items-center">
            <div>
              <AiOutlineAim className="text-4xl text-primary font-medium" />
            </div>
            <div>
              <h4 className="text-lg font-medium xl:mb-3 lg:mb-1">
                Quick Response
              </h4>
              <p className="text-gray-400">
                We aim to respond to all questions within 24 hours
              </p>
            </div>
          </div>
          <div className="flex xl:gap-6 sm:gap-6 lg:gap-3 gap-5 items-center">
            <div>
              <CgMail className="sm:text-4xl text-3xl text-primary font-medium" />
            </div>
            <div>
              <h4 className="text-lg font-medium xl:mb-3 lg:mb-1">
                How Can We Help?
              </h4>
              <p className="text-gray-400 underline underline-offset-1">
                <a href="mailto:support@nesmaspoint.com">
                  support@nesmaspoint.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="md:mt-20 sm:mt-12 mt-6">
          <h3 className="mb-2 text-lg font-medium">
            Follow us on social media
          </h3>
          <div className="flex gap-2">
            <a
              className="sm:text-4xl text-3xl text-primary font-medium"
              href="https://www.instagram.com/nesmaspoint/"
            >
              <AiFillInstagram color="#C806DE" />
            </a>

            <a
              className="sm:text-4xl text-3xl text-primary font-medium"
              href="https://twitter.com/nesmaspoint/"
            >
              <AiFillTwitterCircle color="#1C9CEA" />
            </a>
            <a
              className="sm:text-4xl text-3xl text-primary font-medium"
              href="https://www.facebook.com/nesmaspoint/"
            >
              <AiFillFacebook color="#1C9CEA" />
            </a>
          </div>
        </div>
      </div>
    </section>
    // <section className="py-8 max-w-[1000px] mx-auto md:px-20 px-3 min-h-[calc(100vh-70px)]">
    //   <h3 className="text-2xl font-semibold mb-4 underline underline-offset-[4px]">
    //     CONTACT US
    //   </h3>

    //   <p className="text-slate-700 mt-1 pl-4">Let’s talk about AdsReveal</p>
    // </section>
  );
}
