import { MapPin } from "lucide-react";

export default function StoreMap() {
  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-[8px] border border-ink-900/10 bg-[#e9e2d8] shadow-soft">
      <div className="absolute inset-0 opacity-70">
        <div className="absolute left-[12%] top-0 h-full w-8 rotate-[31deg] bg-white/80" />
        <div className="absolute left-[36%] top-0 h-full w-8 rotate-[31deg] bg-white/80" />
        <div className="absolute left-[58%] top-0 h-full w-8 rotate-[31deg] bg-white/80" />
        <div className="absolute left-0 top-[22%] h-7 w-full -rotate-[14deg] bg-white/70" />
        <div className="absolute left-0 top-[48%] h-7 w-full -rotate-[14deg] bg-white/70" />
        <div className="absolute left-0 top-[73%] h-7 w-full -rotate-[14deg] bg-white/70" />
      </div>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-[8px] bg-coral-700 text-white shadow-2xl ring-8 ring-white/80">
          <MapPin size={30} aria-hidden="true" />
        </div>
        <div className="mt-4 rounded-[8px] bg-white px-5 py-4 shadow-lg">
          <p className="text-sm font-black uppercase text-coral-700">Gift Man</p>
          <p className="mt-1 text-lg font-bold text-ink-900">176 5th Ave</p>
          <p className="text-sm font-medium text-stone-600">Between Degraw and Sackett</p>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 rounded-[8px] bg-white/90 px-3 py-1 text-xs font-bold uppercase text-stone-700">
        Park Slope, Brooklyn
      </div>
    </div>
  );
}
