import React from "react";

export default function Page() {
  return (
    <div className="py-8 max-w-[1000px] mx-auto md:px-20 px-3 min-h-[calc(100vh-70px)]">
      <h3 className="text-2xl font-semibold mb-2 underline underline-offset-4">
        Safety Tips
      </h3>
      <ul className="list-disc pl-4 mt-4">
        <li>
          Be very careful when going to meet someone (to inspect products and
          properties).
        </li>
        <li>
          Be very careful of offers that seems too good because some may be a
          trap.
        </li>
        <li>
          Don’t share your personal information: these includes your bank
          details (BVN, MasterCard), copies of your identity card (drivers’
          licence, international passport, NIN).
        </li>
        <li>Ensure you physically inspect every product before committing.</li>
        <li>Do not make any pre-payment to anyone.</li>
        <li>Take your time to think about the offers presented before you.</li>
        <li>
          When buying properties and cars, make sure they have genuine
          documents.
        </li>
        <li>Avoid buying stolen items.</li>
      </ul>
    </div>
  );
}
