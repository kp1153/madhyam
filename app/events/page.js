import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getAllEvents() {
  const query = `*[_type == "event" && !isUpcoming] | order(eventDate desc) {
    _id,
    title,
    slug,
    eventDate,
    location,
    description,
    fullDescription,
    "coverImageUrl": coverImage.asset->url,
    "galleryImages": gallery[].asset->url,
    organizers,
    guests,
    isFeatured
  }`;

  return await client.fetch(query);
}

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            आयोजन एवं गतिविधियाँ
          </h1>
          <p className="text-gray-600">
            हिन्दी साहित्य सम्मेलन के सांस्कृतिक कार्यक्रमों की रिपोर्ट
          </p>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">कोई आयोजन उपलब्ध नहीं है</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Cover Image */}
      {event.coverImageUrl && (
        <div className="relative h-64 bg-gray-100">
          <Image
            src={event.coverImageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>

        {/* Date & Location */}
        <div className="space-y-2 mb-4">
          <p className="text-gray-600 flex items-center">
            <span className="mr-2">📅</span>
            {new Date(event.eventDate).toLocaleDateString("hi-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          {event.location && (
            <p className="text-gray-600 flex items-center">
              <span className="mr-2">📍</span>
              {event.location}
            </p>
          )}
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        )}

        {/* Full Description */}
        {event.fullDescription && (
          <details className="mb-4">
            <summary className="cursor-pointer text-orange-600 font-semibold hover:text-orange-700">
              विस्तार से पढ़ें
            </summary>
            <div className="mt-4 prose prose-sm text-gray-600">
              <PortableText value={event.fullDescription} />
            </div>
          </details>
        )}

        {/* Organizers */}
        {event.organizers && event.organizers.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">आयोजक:</h4>
            <div className="flex flex-wrap gap-2">
              {event.organizers.map((organizer, idx) => (
                <span
                  key={idx}
                  className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                >
                  {organizer}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Guests */}
        {event.guests && event.guests.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">विशेष अतिथि:</h4>
            <div className="flex flex-wrap gap-2">
              {event.guests.map((guest, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {guest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Preview */}
        {event.galleryImages && event.galleryImages.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">फोटो गैलरी:</h4>
            <div className="grid grid-cols-3 gap-2">
              {event.galleryImages.slice(0, 6).map((imageUrl, idx) => (
                <div
                  key={idx}
                  className="relative h-24 bg-gray-100 rounded overflow-hidden"
                >
                  <Image
                    src={imageUrl}
                    alt={`${event.title} ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
            {event.galleryImages.length > 6 && (
              <p className="text-sm text-gray-500 mt-2">
                +{event.galleryImages.length - 6} और फोटो
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
