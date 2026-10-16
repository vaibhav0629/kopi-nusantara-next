"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Q1. What is Kopi Nusantara?",
    a: "Kopi Nusantara is a coffee brand that showcases Indonesian coffee from various regions across the archipelago, allowing coffee lovers to experience the different flavors and characteristics of Indonesian coffee.",
  },
  {
    q: "Q2. Where does Kopi Nusantara's coffee come from?",
    a: "Our coffee comes from various regions in Indonesia, including Aceh, Sulawesi, Bali, Flores, North Sumatra, and Kalimantan.",
  },
  {
    q: "Q3. What types of coffee are available?",
    a: "Kopi Nusantara offers several varieties, including Robusta Gayo, Arabica Toraja, Arabica Kintamani, Robusta Flores Bajawa, Arabica Mandailing, and Liberika Coffee.",
  },
  {
    q: "Q4. What is the difference between Arabica and Robusta coffee?",
    a: "Arabica and Robusta are different species of coffee with different characteristics. Arabica generally has a more complex and nuanced flavor, while Robusta tends to have a stronger and more robust character.",
  },
];

export default function Faq() {
  const [openItems, setOpenItems] = useState<boolean[]>(faqs.map(() => false));

  const toggle = (i: number) =>
    setOpenItems((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section id="faq">
      <div id="faq-title">
        <h1>Frequenly Asked Question (FAQ)</h1>
        <h3>Find frequenly asked question about us here.</h3>
      </div>

      <div id="faq-content">
        {faqs.map((f, i) => (
          <div className="round-container" key={i}>
            <button className="accordion" onClick={() => toggle(i)}>
              {f.q}
            </button>
            <div
              className="accordion-content"
              style={{ display: openItems[i] ? "block" : "none" }}
            >
              <p>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}