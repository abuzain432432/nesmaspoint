import React from "react";

export default function Page() {
  return (
    <div className="md:py-8 py-5 max-w-[1000px] mx-auto md:px-20 px-3 min-h-[calc(100vh-70px)]">
      <h3 className="md:text-2xl text-xl font-semibold mb-3  underline underline-offset-2">
        Privacy Policy
      </h3>

      <p className="text-slate-700 mt-1 mb-3 md:pl-4 pl-2">
        BY USING THE SERVICE, YOU PROMISE US THAT:
        <br />
        (I) you have read, comprehended, and consented to this Privacy Policy,
        and (II) you are 15 years old and above.
        <br />
        If in a way the privacy policy does not sit well with you and you do not
        agree or are unable to make this promise, you must refrain from using
        the service. In such a situation, if you have created an account on this
        platform, please reach out to us through online chat or email to request
        the deletion of your account and data.
      </p>
      <section className="text-slate-700 mt-1 pl-4">
        <div>
          <h6 className="md:text-[18px] text-base text-gray-600 font-medium">
            1) PERSONAL INFORMATION THAT WE COLLECT
          </h6>
          <p>
            Some of the personal information that we collect from users are
            optional, which the user can decide to decline.
          </p>
          <ul className="pl-4 list-disc mt-2">
            <li>
              Full name: The user's complete name is requested during the
              account creation process.
            </li>
            <li>
              Email address: Users are asked to provide their email address,
              which will be associated with their account.
            </li>
            <li>
              Password: A secure password is required to protect the user's
              account and ensure confidentiality.
            </li>
            <li>
              Contact information: Users may be asked to provide additional
              contact details, such as a phone number or address, to facilitate
              communication with either NesMasPoint Administrator or potential
              buyers.
            </li>
            <li>
              Profile information: Users have the option to provide additional
              information about themselves, such as a profile picture, bio, or
              other personal details.
            </li>
            <li>
              Payment details: Users may need to provide payment information,
              such as credit card details or a PayPal account, for purchasing of
              our promotional packages.
            </li>
            <li>
              Preferences: Users may have the opportunity to customize their
              account settings, notification preferences.
            </li>
          </ul>
          <p className="my-2">
            We may share your data with third parties in certain circumstances.
            We may, for example, share data with:
          </p>
          <ul className="pl-4 list-disc">
            <li>
              government bodies and law enforcement agencies, to comply with the
              law.
            </li>
            <li>
              professional advisers, to enforce or defend our legal rights; or
            </li>
            <li>
              with a purchaser or seller in connection with a corporate event
              such as a merger, business acquisition or insolvency situation
            </li>
          </ul>
        </div>
        <div>
          <h6 className="md:text-[18px] text-base text-gray-600 font-medium mt-4 mb-1">
            2) DATA PROTECTION STATEMENT
          </h6>
          <ul className="pl-4 list-disc ">
            <li>
              We will only retain personal information as long as necessary for
              the fulfilment of those purposes.
            </li>
            <li>
              We collect and process personal data in accordance with applicable
              data protection laws and regulations.
            </li>
            <li>
              The personal data we collect is used for specific purposes and
              only with your consent or as permitted by law.
            </li>
            <li>
              We implement appropriate security measures to protect your
              personal data from unauthorized access, disclosure, alteration, or
              destruction.
            </li>
            <li>
              We may share your personal data with third parties only when
              necessary and with your explicit consent or as required by law.
            </li>
            <li>
              We will share your personal data with payment providers and local
              banks.
            </li>
            <li>
              You have the right to access, rectify, or delete your personal
              data, as well as the right to restrict or object to its
              processing, subject to legal limitations.
            </li>
            <li>
              We provide you with clear and transparent information about our
              data collection and processing practices through this data
              protection statement.
            </li>
            <li>
              We may use cookies or similar technologies to enhance your
              browsing experience and personalize the services we offer.
            </li>
            <li>
              By using our services, you acknowledge and agree to the terms of
              this data protection statement.
            </li>
          </ul>
        </div>
        <div>
          <h6 className="md:text-[18px] text-base text-gray-600 font-medium mt-4 mb-1">
            3) PRIVACY POLICY MODIFICATION
          </h6>
          <p>
            Our privacy policy is subject to modification without prior notice.
          </p>
        </div>
        <div>
          <h6 className="md:text-[18px] text-base text-gray-600 font-medium mt-4 mb-1">
            4) TRANSFER OF DATA COLLECTED
          </h6>
          <p>
            We may transfer user data to third-party service providers or other
            entities located in different countries for various purposes
            outlined in our privacy policy. These transfers may include the
            transmission of personal information across borders in a situation
            with a purchaser, subject to the applicable data protection laws and
            regulations.
            <br />
            By using our services and providing your consent to this privacy
            policy, you acknowledge and agree to such data transfers. We take
            reasonable measures to ensure that any data transfers comply with
            the relevant legal requirements and provide adequate protection for
            your personal information. However, please note that the privacy
            protections and rights may vary depending on the jurisdiction to
            which the data is transferred. We will take appropriate steps to
            safeguard your personal information during any international data
            transfers in accordance with applicable laws and regulations.
          </p>
        </div>
      </section>
    </div>
  );
}
