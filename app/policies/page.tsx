export default function PoliciesPage() {
  const sections = [
    {
      t: "Delivery Policy",
      b: [
        "Orders within Nairobi are dispatched the same working day and delivered within 24 hours.",
        "Countrywide deliveries take 2–4 business days via our courier partners.",
        "Chemicals classified as hazardous are delivered only to physical addresses with an adult receiving officer.",
        "Delivery fees are calculated at checkout based on location and are shown before payment.",
      ],
    },
    {
      t: "Returns & Refunds",
      b: [
        "Unopened chemicals and equipment may be returned within 7 days of delivery, subject to inspection.",
        "Opened chemicals cannot be returned for safety and regulatory reasons.",
        "Damaged or incorrect items must be reported within 48 hours of receipt for replacement.",
        "Refunds are issued to the original payment method within 5–7 business days.",
      ],
    },
    {
      t: "Privacy Policy",
      b: [
        "We collect only the information needed to process your order and communicate with you.",
        "Your personal data is never sold or shared with third parties for marketing purposes.",
        "Payment information is processed by trusted payment providers and is not stored on our servers.",
        "You may request deletion of your data at any time by contacting us.",
      ],
    },
    {
      t: "Safety & Handling",
      b: [
        "All chemicals are supplied with hazard labels and Safety Data Sheet (SDS) guidance.",
        "Customers must ensure adequate PPE and safe storage before opening any chemical container.",
        "We do not sell restricted chemicals without valid institutional identification.",
        "Disposal of chemicals must follow NEMA guidelines and local regulations.",
      ],
    },
    {
      t: "Institutional Ordering",
      b: [
        "Schools, colleges and labs may order using a Local Purchase Order (LPO) or official letter.",
        "Invoices are issued upon delivery unless prior credit terms have been agreed.",
        "Termly and annual supply agreements are available — please contact us for a quotation.",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <span className="text-[11px] uppercase tracking-widest text-brand font-semibold">Policies</span>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold">Our Terms & Policies</h1>
      <p className="mt-3 text-slate-600">
        These policies govern ordering, delivery, returns and privacy for Racie Chem Supplies.
        Last updated: prototype version.
      </p>

      <div className="mt-10 space-y-6">
        {sections.map(s => (
          <section key={s.t} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-xl font-bold">{s.t}</h2>
            <ul className="mt-4 space-y-3">
              {s.b.map(line => (
                <li key={line} className="flex gap-3 text-slate-700">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-8 text-xs text-slate-500">
        This content is a placeholder for a prototype and must be reviewed by the business owner
        before publishing publicly.
      </p>
    </div>
  );
}