import { useMemo, useState } from "react";

import { getLangFromUrl, useTranslations } from "@/i18n";

const MAPS = [
  "Avalanche Incline",
  "Avalanche Ravine",
  "Battlebrae Flatland",
  "Battlebrae Grassland",
  "Battlebrae Lake",
  "Battlebrae Meadow",
  "Battlebrae Peaks",
  "Battlebrae Plain",
  "Black Monastery",
  "Bleachskull Desert",
  "Bleachskull Steppe",
  "Braemore Lowland",
  "Braemore Upland",
  "Brambleshore Hinterlands",
  "Citadel of Ash",
  "Daemonium Keep",
  "Darkbough Snag",
  "Deadpine Forest",
  "Deathreach Priory",
  "Deathwisp Bog",
  "Deathwisp Sink",
  "Deepwood Copse",
  "Deepwood Dell",
  "Deepwood Gorge",
  "Deepwood Pines",
  "Driftwood Glen",
  "Driftwood Hollow",
  "Driftwood Vale",
  "Drownfield Course",
  "Drownfield Fen",
  "Drownfield Mire",
  "Drownfield Quag",
  "Drownfield Rut",
  "Drownfield Sink",
  "Drownfield Slough",
  "Drownfield Wetland",
  "Drybasin Oasis",
  "Drybasin Riverbed",
  "Drytop Pillars",
  "Drytop Riverbed",
  "Dryvein Confluence",
  "Dryvein Cross",
  "Dryvein End",
  "Dryvein Oasis",
  "Dryvein Plain",
  "Dryvein Riverbed",
  "Dryvein Steppe",
  "Eldersleep",
  "Everwinter Crossing",
  "Everwinter Expanse",
  "Everwinter Gap",
  "Everwinter Gorge",
  "Everwinter Incline",
  "Everwinter Peak",
  "Everwinter Passage",
  "Everwinter Plain",
  "Everwinter Reach",
  "Everwinter Shores",
  "Eye of the Forest",
  "Farshore Bay",
  "Farshore Cape",
  "Farshore Drylands",
  "Farshore Esker",
  "Farshore Heath",
  "Farshore Lagoon",
  "Firesink Caldera",
  "Firesink Trench",
  "Flammog Desolation",
  "Flammog Fork",
  "Flammog Valley",
  "Flatrock Cliffs",
  "Flatrock Plateau",
  "Floatshoal Bight",
  "Floatshoal Fissure",
  "Floatshoal Floe",
  "Frostbite Chasm",
  "Frostbite Mountain",
  "Frostpeak Ascent",
  "Frostpeak Vista",
  "Frostseep Crevasse",
  "Frostseep Ravine",
  "Frostspring Passage",
  "Frostspring Volcano",
  "Giantweald Copse",
  "Giantweald Dale",
  "Giantweald Edge",
  "Giantweald Glade",
  "Giantweald Roots",
  "Giantweald Woods",
  "Glacierbreak Summit",
  "Glacierfall Canyon",
  "Glacierfall Cross",
  "Glacierfall Fissure",
  "Glacierfall Pass",
  "Glacierfall Passage",
  "Glacierfall Valley",
  "Gravemound Brim",
  "Gravemound Cliffs",
  "Gravemound Hills",
  "Gravemound Knoll",
  "Gravemound Slope",
  "Greenhollow Copse",
  "Greenhollow Vale",
  "Greenshore Bay",
  "Greenshore Peninsula",
  "Hightree Borderlands",
  "Hightree Cliffs",
  "Hightree Dale",
  "Hightree Enclave",
  "Hightree Glade",
  "Hightree Hillock",
  "Hightree Isle",
  "Hightree Lake",
  "Hightree Levee",
  "Hightree Pass",
  "Hightree Steep",
  "Hightree Strand",
  "Highstone Grassland",
  "Highstone Loch",
  "Highstone Meadow",
  "Highstone Mound",
  "Highstone Plains",
  "Highstone Plateau",
  "Iceburn Cliffs",
  "Iceburn Firth",
  "Iceburn Peaks",
  "Iceburn Tundra",
  "Longfen Arms",
  "Longfen Marsh",
  "Longfen Veins",
  "Meltwater Bog",
  "Meltwater Channel",
  "Meltwater Delta",
  "Meltwater Sump",
  "Mudfoot Mounds",
  "Mudfoot Sump",
  "Munten Fell",
  "Munten Rise",
  "Munten Tundra",
  "Murdergulch Cross",
  "Murdergulch Divide",
  "Murdergulch Gap",
  "Murdergulch Ravine",
  "Murdergulch Trail",
  "Northstrand Beach",
  "Northstrand Dunes",
  "Parchsand Cliffs",
  "Parchsand Drought",
  "Razorrock Bank",
  "Razorrock Chasm",
  "Razorrock Edge",
  "Razorrock Gulch",
  "Razorrock Passage",
  "Razorrock Ravine",
  "Razorrock Valley",
  "Razorrock Verge",
  "Redtree Enclave",
  "Rivercopse Crossing",
  "Rivercopse Curve",
  "Rivercopse Fount",
  "Rivercopse Path",
  "Runnelvein Bog",
  "Runnelvein Sink",
  "Runnelvein Slough",
  "Sandmount Ascent",
  "Sandmount Desert",
  "Sandmount Esker",
  "Sandmount Strand",
  "Sandrift Coast",
  "Sandrift Dunes",
  "Sandrift Expanse",
  "Sandrift Fringe",
  "Sandrift Prairie",
  "Sandrift Shore",
  "Sandrift Steppe",
  "Scuttlesink Marsh",
  "Scuttlesink Mouth",
  "Scuttlesink Pools",
  "Shaleheath Hills",
  "Shaleheath Steep",
  "Skullmarsh Lower",
  "Skullmarsh Upper",
  "Skylake Bridge",
  "Skylake Hinterlands",
  "Skysand Plateau",
  "Skysand Ridge",
  "Slakesands Canyon",
  "Slakesands Mesa",
  "Southgrove Copse",
  "Southgrove Escarp",
  "Southgrove Thicket",
  "Springsump Basin",
  "Springsump Melt",
  "Springsump Wetland",
  "Stonelake Fields",
  "Stonelake Hillock",
  "Stonemouth Bay",
  "Stonemouth Northbluff",
  "Stonemouth Southbluff",
  "Sunfang Approach",
  "Sunfang Cliffs",
  "Sunfang Dawn",
  "Sunfang Ravine",
  "Sunfang Wasteland",
  "Sunkenbough Spring",
  "Sunkenbough Woods",
  "Sunstrand Delta",
  "Sunstrand Dunes",
  "Sunstrand Quicksands",
  "Sunstrand Shoal",
  "Swiftsands Basin",
  "Swiftsands Chaparral",
  "Swiftsands Plain",
  "Thirstwater Gully",
  "Thirstwater Steppe",
  "Thirstwater Waste",
  "Thunderrock Ascent",
  "Thunderrock Draw",
  "Thunderrock Rapids",
  "Thunderrock Upland",
  "Timberscar Copse",
  "Timberscar Dell",
  "Timberslope Dell",
  "Timberslope Grove",
  "Timberslope Bridge",
  "Timbertop Dale",
  "Timbertop Escarp",
  "Timbertop Wood",
  "Twinchannel Narrows",
  "Unhallowed Cloister",
  "Wailing Bulwark",
  "Watchwood Bluffs",
  "Watchwood Grove",
  "Watchwood Lakeside",
  "Watchwood Precipice",
  "Westweald Shore",
  "Westweald Thicket",
  "Wetgrave Bog",
  "Wetgrave Marsh",
  "Wetgrave Swale",
  "Whitebank Cross",
  "Whitebank Descent",
  "Whitebank Ridge",
  "Whitebank Shore",
  "Whitebank Stream",
  "Whitebank Wall",
  "Whitecliff Peak",
  "Whitecliff Expanse",
  "Whitepeak Ascent",
  "Whitepeak Spring",
  "Whitepeak Tundra",
  "Whitewall Pass",
  "Whitewall Ridge",
  "Widemoor Delta",
  "Widemoor End",
  "Widemoor Estuary",
  "Widemoor Fen",
  "Widemoor Flats",
  "Widemoor Hills",
  "Widemoor Pool",
  "Widemoor Shore",
  "Widemoor Woods",
  "Willowshade Icemarsh",
  "Willowshade Hills",
  "Willowshade Lake",
  "Willowshade Mire",
  "Willowshade Pools",
  "Willowshade Sink",
  "Willowshade Wetlands",
  "Windgrass Border",
  "Windgrass Coast",
  "Windgrass Fields",
  "Windgrass Gully",
  "Windgrass Precipice",
  "Windgrass Rill",
  "Windgrass Terrace",
] as const;

const TOTAL_MAPS = MAPS.length;

export default function MapBrowser() {
  const lang = typeof window !== "undefined" ? getLangFromUrl(new URL(window.location.href)) : "en";
  const t = useTranslations(lang);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return query ? MAPS.filter((m) => m.toLowerCase().includes(query)) : [...MAPS];
  }, [search]);

  return (
    <div className="my-4 rounded-lg border border-border bg-popover">
      <div className="sticky top-0 z-10 space-y-2 border-b border-border bg-popover p-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder={t("mapBrowser.searchPlaceholder").replace("{count}", String(TOTAL_MAPS))}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {t("mapBrowser.showing")
            .replace("{filtered}", String(filtered.length))
            .replace("{total}", String(TOTAL_MAPS))}
        </p>
      </div>

      <div className="max-h-[500px] overflow-auto p-4">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            {t("mapBrowser.noResults")}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-x-4 gap-y-0.5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((map) => (
              <li key={map} className="text-sm text-foreground">
                {map}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
