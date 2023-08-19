"use client";
import { useState } from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const FAQData = [
  {
    question: "What is NesMasPoint?",
    answer: [
      "NesMasPoint is a Classified Ads Marketplace, where sellers and business owners advertise their goods and services to potential buyers.",
    ],
  },
  {
    question: "Are the sellers’ on NesMasPoint real people?",
    answer: ["Yes, every seller here is a real person."],
  },
  {
    question: "Do I have to pay before I can place an advertisement?",
    answer: [
      "No, here, it’s not mandatory to pay before placing an advert or creating an account. You can choose to use the free plan or use any of our promotional packages.",
    ],
  },
  {
    question: "How many promotional packages are here on NesMasPoint?",
    answer: [
      "Post Free",
      "Best",
      "Boost",
      "Premium Boost",
      "Premium Boost Plus",
    ],
  },
  {
    question: "What is the advantage(s) of using any promotional package?",
    answer: [
      "It is to boost visibility of your advertisement to potential buyers.",
      "It increases the number of people that your advert will get to.",
      "It makes your advert stand out.",
    ],
  },
  {
    question: "What are the rules I must follow on NesMasPoint Platform?",
    answer: [
      "All advertisements must have a precise title and feature photographs captured directly by theseller.",
      "A proper categorization is crucial for a successful advertisement.",
      "Overpriced items will not be accepted.",
      "The items you post should be in Nigeria and must be legal.",
      "It is not permissible to include multiple items within a single or similar advertisement.",
      "Every advertisement should provide a precise and transparent description.",
      "Food products must have expiration date, any without expiration date boldly written will not be accepted.",
      "See our Terms and Conditions.",
    ],
  },
  {
    question: "Will my Ads be deleted from NesMasPoint?",
    answer: [
      "Yes, your ads will be deleted after 30 days of listing it on NesMasPoint, so all you need to do is to upload it again if it hasn’t been sold.",
    ],
  },
  {
    question: "Can I be ban from using NesMasPoint?",
    answer: ["Yes, if you violate our Terms and Conditions."],
  },
  {
    question: "Why do I have to wait for approval before my post can go live?",
    answer: [
      "Because we must make sure that you don’t upload anything that will violate NesMasPoint rules and regulations.",
    ],
  },
  {
    question: "Can I upload anything that is sellable on NesMasPoint?",
    answer: ["No"],
  },
  {
    question: "Why can´t I advertise anything that is sellable on NesMasPoint?",
    answer: [
      "Because there are some products that are not permitted to be advertise here.",
    ],
  },
  {
    question: "Which items are prohibited from being posted on NesMasPoint?",
    answer: [
      " Prohibited items on NesMasPoint include hard drugs, medications that necessitate a prescription from a licensed medical professional.",
      " Weapons, restricted military, or police items.",
      " Illegal or pirated copies of an item(s).",
      " Stolen properties.",
      " Prohibited items by law are not allowed.",
      " Services of a sexually oriented nature",
      " Human Parts.",
      " Loans, money transactions, and Bitcoin-related activities are prohibited.",
      " Products, offers, or services that are generally prohibited from being sold by law are not allowed.",
    ],
  },
  {
    question: "How can I avoid not being scammed?",
    answer: [
      "We advise you pay attention in dealing with anyone here, don’t make payment without physically seeing what you want to purchase, and report any fraudulent activities to us, so we can take necessary actions.",
      "After reading all these questions and you are not satisfied or your question is not answered, feel free to contact us. We are open to answering your questions.",
    ],
  },
];

export default function FAQ() {
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (key) => {
    setActivePanel(key === activePanel ? null : key);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <Collapse
        accordion
        activeKey={activePanel}
        onChange={togglePanel}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        {FAQData.map((faq, index) => (
          <Panel key={index} header={faq.question}>
            <ul className="list-disc pl-4">
              {faq?.answer?.map((ans) => (
                <li key={Math.random()}>{ans}</li>
              ))}
            </ul>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}
