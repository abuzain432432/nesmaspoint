import React from "react";

export default function Page() {
  return (
    <div className="py-8 max-w-[1000px] mx-auto md:px-20 px-3 min-h-[calc(100vh-70px)]">
      <h3 className="text-2xl font-semibold mb-4 underline underline-offset-2">
        Cookie Policy
      </h3>
      <section className="text-slate-700">
        <div>
          <h6 className="text-[15px] font-medium text-black mt-4 mb-2">
            1) WHAT IS COOKIE?
          </h6>
          <p>
            Cookies are small text files that contain fragments of data, such as
            a username and password, and are utilized to recognize your computer
            while you navigate a computer network.
          </p>
        </div>
        <div>
          <h6 className="text-[15px] font-medium text-black mt-4 mb-2">
            2) PURPOSE OF COOKIE
          </h6>
          <ul className="pl-4 list-disc mt-2">
            <li>
              Session management: Cookies enable websites to identify users and
              remember their unique login information and preferences, such as
              their preference for sports news or politics.
            </li>
            <li>
              Personalization: Cookies play a key role in personalizing your
              browsing experience by facilitating customized advertising. They
              analyse your interactions with a website, such as the items you
              view, and utilize this information to deliver targeted
              advertisements that align with your interests.
            </li>
            <li>
              Tracking: Shopping websites utilize cookies to track the products
              that users have previously viewed. This allows the websites to
              suggest related items that users might find appealing and keeps
              items saved in their shopping carts while they continue browsing.
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-[15px] font-medium text-black mt-4 mb-2">
            3) RIGHT TO USE COOKIE
          </h6>
          <p>
            You are under no obligation to use cookies, and you retain the right
            to accept or decline them whenever they appear.
          </p>
        </div>
      </section>
    </div>
  );
}
