import Image from "next/image";

export default function AboutEditorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        संपादक के बारे में
      </h1>

      {/* Editor Images — तीनों */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        <Image
          src="/editor/rajesh-1.jpg"
          alt="प्रो. राजेश कुमार गर्ग"
          width={160}
          height={220}
          className="rounded shadow object-cover"
        />
        <Image
          src="/editor/rajesh-2.jpg"
          alt="प्रो. राजेश कुमार गर्ग"
          width={160}
          height={220}
          className="rounded shadow object-cover"
        />
        <Image
          src="/editor/rajesh-3.jpg"
          alt="प्रो. राजेश कुमार गर्ग"
          width={160}
          height={220}
          className="rounded shadow object-cover"
        />
      </div>

      {/* Text */}
      <div className="text-gray-800 leading-relaxed space-y-4 text-justify">
        <p>
          प्रो. राजेश कुमार गर्ग देश के प्रतिष्ठित केंद्रीय विश्वविद्यालय,
          इलाहाबाद विश्वविद्यालय में हिन्दी विभाग में प्रोफेसर के पद पर कार्यरत
          हैं। आप आलोचक, काव्य-शास्त्री तथा मध्यकालीन कविता के विद्वान हैं।
        </p>

        <p>
          आपने हिन्दी साहित्य की अभिवृद्धि में विपुल योगदान दिया है। आपकी छह
          पुस्तकें प्रकाशित हो चुकी हैं। पचास से अधिक पुस्तकों तथा शोध-पत्रिकाओं
          में आपके विद्वत्तापूर्ण आलेख प्रकाशित हैं।
        </p>

        <p>
          आप कई पत्रिकाओं के सम्मान्य संपादक हैं, जिनमें इलाहाबाद विश्वविद्यालय
          की पत्रिका <strong>“अनुसंधान”</strong>
          विशेष रूप से उल्लेखनीय है।
        </p>

        <p>
          आप हिन्दी साहित्य सम्मेलन, हिंदुस्तानी एकेडमी, भारतीय हिन्दी परिषद
          सहित अनेक हिन्दी-सेवी संस्थाओं से जुड़े हैं तथा अखिल भारतीय हिन्दी
          परिषद के माननीय उपाध्यक्ष के रूप में दायित्व निभा रहे हैं।
        </p>

        <p>
          आप सौ से अधिक संगोष्ठियों में विद्वतापूर्ण उद्बोधन दे चुके हैं और अनेक
          प्रतिष्ठित सम्मानों से सम्मानित हो चुके हैं।
        </p>
      </div>
    </div>
  );
}
