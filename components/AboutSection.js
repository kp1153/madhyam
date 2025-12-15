export default function AboutSection() {
  return (
    <main
      id="about-section"
      className="min-h-screen bg-gray-50 p-4 sm:p-8 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center py-10 bg-orange-100 rounded-lg shadow-xl mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
            माध्यम पत्रिका के बारे में
          </h1>
          <p className="text-lg text-gray-600 italic">
            हिन्दी साहित्य की प्रतिष्ठित शोध एवं साहित्यिक पत्रिका
          </p>
        </header>

        {/* परिचय */}
        <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-6">
            परिचय
          </h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              <strong>माध्यम (Madhyam)</strong> 'हिन्दी साहित्य सम्मेलन, प्रयाग'
              द्वारा प्रकाशित एक{" "}
              <span className="font-semibold text-orange-600">
                Peer Reviewed Referred Research Journal
              </span>{" "}
              है, जो साहित्य और रचनात्मक विचारों को समर्पित है।
            </p>
          </div>
        </section>

        {/* इतिहास */}
        <section className="mb-10 p-6 bg-orange-50 rounded-lg shadow-md border-l-4 border-orange-600">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-6">
            इतिहास
          </h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              पत्रिका का साहित्यिक प्रवेश पहली बार <strong>१९६४</strong> में
              हिन्दी के महत्वपूर्ण कवि <strong>बालकृष्ण राव</strong> के संपादन
              में हुआ था।
            </p>
            <p>
              <strong>१९६९</strong> में प्रकाशन बंद होने के बाद,{" "}
              <strong>२००१</strong> में <strong>सत्यप्रकाश मिश्र</strong> जी के
              सहयोग से इसका पुनर्प्रकाशन शुरू हुआ।
            </p>
            <p>
              दुर्भाग्यवश, <strong>२००७</strong> के बाद यह पुनः बंद हो गई।
            </p>
          </div>
        </section>

        {/* पुनर्प्रकाशन */}
        <section className="mb-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-6">
            पुनर्प्रकाशन (२०२५)
          </h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              अब <strong>२०२५</strong> में, यह पत्रिका{" "}
              <span className="font-semibold text-orange-600">
                सहस्राब्दि अंक-२८
              </span>{" "}
              के रूप में <strong>'इक्कीसवीं सदी की हिन्दी कविता'</strong> पर
              केंद्रित विशेषांक के साथ पुनर्प्रकाशित हुई है।
            </p>
          </div>
        </section>

        {/* उद्देश्य */}
        <section className="mb-10 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-6">
            उद्देश्य
          </h2>
          <ul className="space-y-3 text-lg text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-600 font-extrabold mr-3 mt-1">
                ✓
              </span>
              <span>साहित्य की समृद्ध विरासत का पुनस्मरण करना</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 font-extrabold mr-3 mt-1">
                ✓
              </span>
              <span>साहित्य जगत में नवीन विमर्शों और बहसों को स्थान देना</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-600 font-extrabold mr-3 mt-1">
                ✓
              </span>
              <span>हिन्दी साहित्य में शोध और अध्ययन को बढ़ावा देना</span>
            </li>
          </ul>
        </section>

        {/* संपादक */}
        <section className="mb-10 p-6 bg-white rounded-lg shadow-md border">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-6">
            संपादक
          </h2>
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
            <p className="text-xl font-semibold text-blue-800">
              प्रो. राजेश कुमार गर्ग
            </p>
            <p className="text-md text-gray-600 italic mt-1">
              हिन्दी विभाग, इलाहाबाद विश्वविद्यालय
            </p>
          </div>
        </section>

        {/* संपर्क */}
        <section className="p-6 bg-orange-50 rounded-lg shadow-md border-l-4 border-orange-600">
          <h2 className="text-3xl font-bold text-gray-800 border-b-2 pb-2 mb-6">
            संपर्क करें
          </h2>
          <div className="space-y-3 text-lg text-gray-700">
            <p>
              <strong>आलेख प्रेषण हेतु Email:</strong>{" "}
              <a
                href="mailto:madhyampatrikaprayagraj@gmail.com"
                className="text-orange-600 hover:underline"
              >
                madhyampatrikaprayagraj@gmail.com
              </a>
            </p>
            <p>
              <strong>पता:</strong> १२१, सम्मेलन मार्ग, प्रयागराज – ३
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
