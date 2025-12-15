// components/SammelanSection.js

import React from "react";

// --- सम्मेलन का डेटा (आसानी से संपादन के लिए) ---

const sammelanDetails = {
  name: "हिन्दी साहित्य सम्मेलन, प्रयाग",
  tagline: "राष्ट्रीय महत्त्व की संस्था: हिन्दी भाषा और साहित्य को समर्पित",
  headquarters: "सम्मेलन मार्ग, प्रयागराज, उत्तर प्रदेश",
  establishment: "१ मई, १९१० ई. (नागरी प्रचारिणी सभा के तत्वावधान में)",
  nationalImportance:
    "संसद के अधिनियम (The Hindi Sahitya Sammelan Act, 1962) द्वारा घोषित",
  keyFigures: [
    { role: "प्रथम अध्यक्ष", name: "महामना मदन मोहन मालवीय" },
    {
      role: "प्रथम प्रधान मंत्री",
      name: "पुरुषोत्तम दास टंडन ('सम्मेलन के प्राण')",
    },
  ],
  objectives: [
    "हिन्दी भाषा, साहित्य और देवनागरी लिपि का व्यापक प्रचार-प्रसार करना।",
    "हिन्दी भाषा के विकास और समृद्धि को सुनिश्चित करना, जैसा कि संविधान के अनुच्छेद ३५१ में निर्दिष्ट है।",
    "हिन्दी साहित्य में अनुसंधान और अध्ययन को बढ़ावा देना।",
    "हिन्दी लेखकों और विद्वानों को पुरस्कारों (जैसे मंगलाप्रसाद पारितोषिक) द्वारा प्रोत्साहित करना।",
    "पुस्तकालय, छापाखाना और संग्रहालय जैसी सुविधाओं का संचालन करना।",
  ],
};

// --- मुख्य कंपोनेंट ---

export default function SammelanSection() {
  return (
    <main
      id="sammelan-section"
      className="min-h-screen bg-white p-4 sm:p-8 scroll-mt-20"
    >
      {/* Header/Title Section */}
      <header className="text-center py-10 bg-red-800 text-white rounded-lg shadow-xl max-w-5xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
          {sammelanDetails.name}
        </h1>
        <p className="text-lg sm:text-xl font-light italic">
          {sammelanDetails.tagline}
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        {/* Foundation & Status */}
        <section
          id="basics"
          className="mb-10 p-6 bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            स्थापना एवं स्थिति
          </h2>
          <div className="space-y-3 text-lg text-gray-700">
            <p>
              <strong>स्थापना दिवस:</strong> {sammelanDetails.establishment}
            </p>
            <p>
              <strong>मुख्यालय:</strong> {sammelanDetails.headquarters}
            </p>
            <p>
              <strong>वैधानिक मान्यता:</strong>{" "}
              <span className="font-semibold text-red-700">
                {sammelanDetails.nationalImportance}
              </span>
            </p>
          </div>
        </section>

        {/* Objectives Section */}
        <section
          id="objectives"
          className="mb-10 p-6 bg-gray-50 rounded-lg shadow-xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-6">
            प्रमुख उद्देश्य और कार्य
          </h2>
          <ul className="list-inside space-y-4">
            {sammelanDetails.objectives.map((item, index) => (
              <li
                key={index}
                className="flex items-start text-lg text-gray-700"
              >
                <span className="text-red-600 font-extrabold mr-3 mt-1">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Key Figures Section */}
        <section
          id="leaders"
          className="p-6 bg-white rounded-lg shadow-md border"
        >
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-6">
            मुख्य विभूतियाँ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sammelanDetails.keyFigures.map((figure, index) => (
              <div
                key={index}
                className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600"
              >
                <p className="text-xl font-semibold text-blue-800">
                  {figure.name}
                </p>
                <p className="text-md text-gray-600 italic mt-1">
                  {figure.role}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
