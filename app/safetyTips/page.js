import React from "react";

export default function Page() {
  return (
    <div className="md:py-8 py-5 max-w-[1000px] mx-auto md:px-20 px-3 min-h-[calc(100vh-70px)]">
      <h3 className="md:text-2xl text-xl font-semibold mb-3  underline underline-offset-2">
        Safety Tips
      </h3>
      <ul className="list-disc ps-4 text-slate-700 mt-1 mb-3 md:pl-4 pl-2">
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
