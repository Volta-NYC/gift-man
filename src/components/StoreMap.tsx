import { ExternalLink, MapPin } from "lucide-react";

const storeAddress = "Gift Man, 176 5th Ave, Brooklyn, NY 11217";
const mapQuery = encodeURIComponent(storeAddress);
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
const googleMapsEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

export default function StoreMap() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-ink-900/10 bg-white shadow-soft">
      <div className="relative min-h-[340px]">
        <iframe
          title="Map to Gift Man at 176 5th Ave, Brooklyn, NY 11217"
          src={googleMapsEmbedUrl}
          className="absolute inset-0 size-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-start">
          <div className="max-w-sm rounded-[8px] bg-white/95 px-5 py-4 shadow-lg ring-1 ring-ink-900/10">
            <p className="flex items-center gap-2 text-sm font-black uppercase text-coral-700">
              <MapPin size={16} aria-hidden="true" /> Gift Man
            </p>
            <p className="mt-1 text-lg font-bold text-ink-900">176 5th Ave</p>
            <p className="text-sm font-medium text-stone-600">Brooklyn, NY 11217</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-ink-900/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-stone-700">Park Slope, Brooklyn</p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-black text-coral-700 transition hover:text-coral-800"
        >
          Open in Google Maps <ExternalLink size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
