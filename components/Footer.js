"use client";

import Link from "next/link";
import React from "react";
import ProtectComponent from "./ProtectComponent";
import { usePathname } from "next/navigation";
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
      { label: "Contact Us", href: "contact" },
      { label: "FAQ", href: "faq" },
      { label: "Blog" },
    ],
  },
  { title: "Our Apps", tabs: [{ label: "Cooming Soon" }] },
  {
    title: "Social Media",
    tabs: [
      {
        label: "Facebook: @nesmaspoint",
        href: "https://www.facebook.com/profile.php?id=100092978044834",
      },
      {
        label: "Linkdlen: @nesmaspoint",
        href: "https://www.linkedin.com/company/nesmaspoint/",
      },
      {
        label: "Instagram: @nesmaspoint",
        href: "https://www.instagram.com/nesmaspoint/",
      },
      { label: "X: @nesmaspoint", href: "https://twitter.com/nesmaspoint" },
    ],
  },
  {
    title: "Ad Posting/Promotional Packages:",
    tabs: [
      { label: "Post Free", href: "packages" },
      { label: "Best", href: "packages" },
      { label: "Boost", href: "packages" },
      { label: "Premium Boost", href: "packages" },
      { label: "Premium Boost Plus", href: "packages" },
    ],
  },
];
export default function Footer() {
  const pathname = usePathname();

  return (
    <ProtectComponent customCheck={[!pathname.includes("admin-dashboard")]}>
      <div className="mt-0 gradient-sidebar gap-y-4 md:gap-y-16 grid grid-cols-2  xl:gap-x-6 md:gap-x-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4  justify-between text-white lg:px-8 px-4 md:px-4 xl:px-10 py-6">
        {footerData.map((item) => (
          <div>
            <h4 className="text-[18px]  font-semibold mb-4">{item.title}</h4>
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
    </ProtectComponent>
  );
}
