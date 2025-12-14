// app/page.js (Next.js App Router के लिए)

import React from "react";

// --- पत्रिका का डेटा (आसानी से संपादन के लिए) ---

// पत्रिका का परिचय/भूमिका का सारांश (ऊपर से लिया गया)
const introductionText = `
  माध्यम (Madhyam) 'हिन्दी साहित्य सम्मेलन, प्रयाग' द्वारा प्रकाशित एक 'Peer Reviewed Referred Research Journal' है, जो साहित्य और रचनात्मक विचारों को समर्पित है।
  
  **इतिहास:**
  पत्रिका का साहित्यिक प्रवेश पहली बार १९६४ में हिन्दी के महत्वपूर्ण कवि बालकृष्ण राव के संपादन में हुआ था। १९६९ में प्रकाशन बंद होने के बाद, २००१ में सत्यप्रकाश मिश्र जी के सहयोग से इसका पुनर्प्रकाशन शुरू हुआ। दुर्भाग्यवश, २००७ के बाद यह पुनः बंद हो गई।
  
  **पुनर्प्रकाशन और वर्तमान अंक:**
  अब २०२५ में, यह पत्रिका सहस्राब्दि अंक-२८ के रूप में 'इक्कीसवीं सदी की हिन्दी कविता' पर केंद्रित विशेषांक के साथ पुनर्प्रकाशित हुई है।
  
  **लक्ष्य:**
  इसका उद्देश्य न केवल साहित्य की समृद्ध विरासत का पुनस्मरण करना है, बल्कि साहित्य जगत में नवीन विमर्शों और बहसों को स्थान देना भी है।
  
  **सम्पादक:** प्रो. राजेश कुमार गर्ग, हिन्दी विभाग, इलाहाबाद विश्वविद्यालय।
  **आलेख प्रेषण हेतु Email:** madhyampatrikaprayagraj@gmail.com
`;

const currentIssueDetails = {
  title: "सहस्राब्दि अंक-२८",
  subtitle: "इक्कीसवीं सदी की हिन्दी कविता' पर केन्द्रित विशेषांक",
  period: "जनवरी-दिसम्बर २०२५",
  editor: "प्रो. राजेश कुमार गर्ग",
  publisher: "हिन्दी साहित्य सम्मेलन, प्रयाग",
};

const tableOfContents = [
  { title: "भूमिका", page: "३", author: "" },
  {
    title: "इक्कीसवीं सदी में हिन्दी कविता की अर्थभूमि",
    page: "०८",
    author: "प्रो. रामआह्लाद चौधरी",
  },
  {
    title: "इक्कीसवीं सदी की हिन्दी कविता का स्वरूप",
    page: "१७",
    author: "प्रो. किश्वर सुल्ताना",
  },
  {
    title: "इक्कीसवीं सदी की हिन्दी कविता में स्त्री अस्मिता के प्रश्न",
    page: "७६",
    author: "डॉ० विजयलक्ष्मी",
  },
  {
    title: "इक्कीसवीं सदी की आदिवासी कविता",
    page: "९९",
    author: "प्रो. शिवप्रसाद शुक्ल",
  },
  // यहाँ आप बाकी लेखों को जोड़ सकते हैं
];

// --- मुख्य कंपोनेंट ---

export default function Home() {
  // HTML स्ट्रिंग को रेंडर करने के लिए एक सहायक फ़ंक्शन
  // **सुरक्षा नोट:** यदि परिचय का पाठ विश्वसनीय (Trusted) है, तभी इसका उपयोग करें।
  const renderIntroduction = () => {
    return {
      __html: introductionText
        .replace(/\n/g, "<br />")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
    };
  };

  return (
    // Tailwind CSS से बेसिक स्टाइलिंग (आपको अपने प्रोजेक्ट में Tailwind इंस्टॉल करना होगा)
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* Navbar/Header */}
      <nav className="bg-white shadow p-4 mb-8 rounded-lg max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-red-700">
          माध्यम (Madhyam)
        </h1>
        <p className="text-sm text-gray-600">
          Peer Reviewed Referred Research Journal
        </p>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Current Issue Details */}
        <section
          id="current-issue"
          className="mb-10 p-6 bg-red-100 border-l-4 border-red-700 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-red-800 mb-2">
            {currentIssueDetails.title}
          </h2>
          <p className="text-xl font-medium text-red-700 mb-4">
            {currentIssueDetails.subtitle}
          </p>
          <div className="grid grid-cols-2 gap-2 text-md text-gray-700">
            <p>**अवधि:** {currentIssueDetails.period}</p>
            <p>**सम्पादक:** {currentIssueDetails.editor}</p>
            <p>**प्रकाशक:** {currentIssueDetails.publisher}</p>
          </div>
        </section>

        {/* Introduction/About Section */}
        <section
          id="parichay"
          className="mb-10 p-6 bg-white rounded-lg shadow-xl"
        >
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-6">
            परिचय (About 'Madhyam' Journal)
          </h2>
          <div
            className="text-lg text-gray-700 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={renderIntroduction()}
          />
        </section>

        {/* Table of Contents Section */}
        <section
          id="anukramanika"
          className="p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-4">
            अनुक्रमणिका (Table of Contents)
          </h2>
          <ul className="space-y-3">
            {tableOfContents.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-gray-700 border-b last:border-b-0 pb-3"
              >
                <span className="font-medium text-lg">
                  {item.title}
                  {item.author && (
                    <span className="text-base italic text-gray-500 block sm:inline">
                      {" "}
                      ({item.author})
                    </span>
                  )}
                </span>
                <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded mt-1 sm:mt-0">
                  पृष्ठ: {item.page}
                </span>
              </li>
            ))}
            <li className="text-right text-sm text-gray-500 pt-4">
              ...और भी आलेख इस अंक में शामिल हैं।
            </li>
          </ul>
        </section>

        {/* Footer Placeholder */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p className="border-t pt-4">
            © {new Date().getFullYear()} हिन्दी साहित्य सम्मेलन, प्रयाग। |
            सर्वाधिकार सुरक्षित।
          </p>
        </footer>
      </div>
    </main>
  );
}
