import Link from "next/link";
import React from "react";

export default function Footer() {
  const footerData = [
    {
      title: "About",
      tabs: [
        { label: "About", href: "about" },
        { label: "Term and Conditions", href: "termAndCondition" },
        { label: "Privacy Policy", href: "privacyPolicy" },
        { label: "Cookie Policy", href: "cookiePolicy" },
      ],
    },
    {
      title: "Support",
      tabs: [
        // { label: "Email (TBN)", href: "email" },
        { label: "Safety Tips", href: "safetyTips" },
        { label: "Contact", href: "contact" },
        { label: "FAQ", href: "faq" },
        { label: "Blog", href: "blog" },
      ],
    },
    { title: "Our Apps", tabs: [{ label: "Cooming Soon" }] },
    {
      title: "Social Media",
      tabs: [
        { label: "Facebook: @nesmaspoint" },
        { label: "Instagram: @nesmaspoint" },
        { label: "Twitter: @nesmaspoint" },
      ],
    },
    {
      title: "Ad Posting/Promotional Packages:",
      tabs: [
        { label: "Post Free" },
        { label: "Best" },
        { label: "Boost" },
        { label: "Premium Boost" },
        { label: "Premium Boost Plus" },
      ],
    },
  ];
  return (
    <div className="mt-4 bg-sky-700 grid grid-cols-2 gap-6 md:grid-cols-5 sm:flex-row justify-between text-white px-10 py-6">
      {footerData.map((item) => (
        <div>
          <h4 className="text-[18px] font-semibold mb-4">{item.title}</h4>
          <ul className="space-y-2">
            {item.tabs.map((tab) => (
              <li className="text-sm pl-2 cursor-pointer">
                <Link href={tab?.href || "/"}>{tab.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
