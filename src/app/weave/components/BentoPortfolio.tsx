'use client';
import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import CharactersLocations from './CharactersLocations';
import ServiceSplitIndex from './ServiceSplitIndex';
import RenderToReality from '@/app/weave/components/RenderToReality';
import { ServiceSection } from './SectionParts';
import { SlideRow, SlideCard, MediaLightbox, MediaItem, CardKind } from './SlideRow';

interface BentoCell {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  tag?: string;
  video?: string;
  position?: string;
  contain?: boolean;
}

const adsData: BentoCell[] = [
{
  id: 18,
  title: 'The Sanctuary',
  subtitle: 'Tranquility Bali',
  image: "https://res.cloudinary.com/wle6dmxs/image/upload/v1785847539/3_bedroom_Pool_iegaig.png",
  alt: 'The Sanctuary - Tranquility Bali campaign video',
  tag: 'ad',
  video: 'https://res.cloudinary.com/wle6dmxs/video/upload/03._The_Investor_Numbers_Ad_-_The_Three-Bedroom_By_the_Figures_ylttga.mp4'
},
{
  id: 19,
  title: 'The Sanctuary',
  subtitle: 'Tranquility Bali',
  image: "https://res.cloudinary.com/wle6dmxs/image/upload/v1785847592/1_dipir9.png",
  alt: 'The Sanctuary - Tranquility Bali original campaign video',
  tag: 'ad',
  video: 'https://res.cloudinary.com/wle6dmxs/video/upload/Three_Bedroom_Hero_evdphr.mp4'
},
{
  id: 1,
  title: 'Nara Villas',
  subtitle: 'Balitecture',
  image: "https://res.cloudinary.com/wle6dmxs/image/upload/v1785846311/Balitecture_-_Nara_Villas_3_bedroom_fzc2g6_poster.jpg",
  alt: 'Nara Villas - Balitecture campaign video',
  tag: 'ad',
  video: 'https://res.cloudinary.com/wle6dmxs/video/upload/Balitecture_-_Nara_Villas_3_bedroom_fzc2g6.mp4'
},
{
  id: 15,
  title: 'The Nest',
  subtitle: 'Roam International',
  image: "https://res.cloudinary.com/wle6dmxs/image/upload/v1785847664/hf_20260516_101101_9ba0c234-0cb5-4a27-ad08-8a601ac33e47_xyohvg.png",
  alt: 'The Nest - Roam International campaign video',
  tag: 'ad',
  video: 'https://res.cloudinary.com/wle6dmxs/video/upload/The_Nest_5_xyo8ln.mp4'
}];

const aiFilmsData: BentoCell[] = [
  {
    id: 1003,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1791172768/Sanaya_Reel_dohd3g.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791173786/Sanaya_Thumbnail_mjghvk.png',
    title: 'Sanaya',
    subtitle: 'Client Feature',
    alt: 'Sanaya Reel',
    tag: 'ai film',
    position: 'center top',
  },
  {
    id: 1002,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1791172768/The_Hum_Reel_tu7u7m.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791173786/Hum_Thumbnail_g5wzbs.png',
    title: 'The Hum',
    subtitle: 'Client Feature',
    alt: 'The Hum Reel',
    tag: 'ai film',
    position: 'center top',
  },
  {
    id: 1001,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1794500872/Bali_Beans_Reel_pgvb3x.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794500957/BB_Thumbnail_pact37.png',
    title: 'Bali Beans',
    subtitle: 'Client Feature',
    alt: 'Bali Beans Reel',
    tag: 'ai film',
    position: 'center top',
  },
];

const realismData: BentoCell[] = [
  {
    id: 2001,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1794501093/Bali_Beans_-_Ayu_s_story_e6trug.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794501098/BB_Thumbnail_rzk8fy.png',
    title: 'The Sudana Family Story',
    subtitle: 'Bali Beans',
    alt: 'The Sudana Family Story - Bali Beans documentary-style film',
    tag: 'Bali Beans',
  },
  {
    id: 2002,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1794502590/Bali_Beans_x_Vella_Social_tdyyuz.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794502785/hf_20261002_103844_3b3a1e1a-8e15-4113-bd11-7e6d61fd7757.00_00_55_03.Still003_ld8dj4.png',
    title: 'Bali Beans Spec Film',
    subtitle: 'Bali Beans',
    alt: 'Bali Beans Spec Film - documentary-style film',
    tag: 'Bali Beans',
    position: 'center top',
  },
];

const luxuryData: BentoCell[] = [
  {
    id: 3001,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1794384226/Sanctuary_Hero_-_Cinematic_Crop_4k_newwww_bfjzkn.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/video/upload/so_14,w_1600/v1794384226/Sanctuary_Hero_-_Cinematic_Crop_4k_newwww_bfjzkn.jpg',
    title: 'The Sanctuary',
    subtitle: 'Tranquility Bali',
    alt: 'The Sanctuary - Tranquility Bali cinematic property film',
    tag: 'property',
  },
  {
    id: 3002,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1794384189/The_Sanctuary_-_Villa_9_acr94l.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/video/upload/so_1,w_1600/v1794384189/The_Sanctuary_-_Villa_9_acr94l.jpg',
    title: 'The Sanctuary, Villa 9',
    subtitle: 'Tranquility Bali',
    alt: 'The Sanctuary, Villa 9 - Tranquility Bali property film',
    tag: 'property',
  },
];

const talkingHeadData: BentoCell[] = [
  {
    id: 5001,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1794461472/Peter_-_Ubud_or_Uluwatu_1_ewdqt4.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794461792/Peter_Ubud_or_Uluwatu_.00_00_47_08.Still001_m4adz5.png',
    title: 'Ubud or Uluwatu?',
    subtitle: 'Tranquility Bali',
    alt: 'Ubud or Uluwatu? - Tranquility Bali talking head video',
    tag: 'vsl',
    position: 'center top',
  },
  {
    id: 5002,
    video: 'https://res.cloudinary.com/wle6dmxs/video/upload/v1794461515/Peter_-_ROI_calculator_dajrt0.mp4',
    image: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1794461789/Peter_ROI_daziyp.png',
    title: 'The ROI Calculator',
    subtitle: 'Tranquility Bali',
    alt: 'The ROI Calculator - Tranquility Bali talking head video',
    tag: 'vsl',
  },
];

interface MediaSliderProps {
  items: BentoCell[];
  kind: CardKind;
  label: string;
}

// Slider of media cards (videos open in the lightbox with sound, images open full size)
function MediaSlider({ items, kind, label }: MediaSliderProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const playable = items.filter((c) => c.video || c.image);
  const lightboxItems: MediaItem[] = playable.map((c) => ({
    type: c.video ? 'video' : 'image',
    src: c.video || c.image,
    poster: c.image,
    alt: c.alt,
    title: c.title,
    caption: c.subtitle,
  }));

  return (
    <>
      {openIndex !== null && (
        <MediaLightbox items={lightboxItems} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
      )}
      <SlideRow cardWidth={kind === 'wide' ? 821 : 260} ariaLabel={label}>
        {playable.map((cell, i) => (
          <SlideCard
            key={cell.id}
            kind={kind}
            tag={cell.tag}
            title={cell.title}
            subtitle={cell.subtitle}
            showPlay={!!cell.video}
            ariaLabel={`Open ${cell.title}`}
            onClick={() => setOpenIndex(i)}>
            <AppImage
              src={cell.image}
              alt={cell.alt}
              fill
              className="w-full h-full"
              objectFit={cell.contain ? 'contain' : 'cover'}
              objectPosition={cell.position ?? 'center center'} />
          </SlideCard>
        ))}
      </SlideRow>
    </>
  );
}

export default function BentoPortfolio() {
  return (
    <div
      id="portfolio"
      className="relative px-6 md:px-12 overflow-x-hidden"
      style={{ background: '#0D0D12' }}>
      <span id="services" aria-hidden="true" className="absolute top-0 left-0 w-0 h-0" />

      {/* ── WHAT WE MAKE OVERVIEW ───────────────────────────────────────────── */}
      <ServiceSplitIndex />
      {/* ── END WHAT WE MAKE ────────────────────────────────────────────────── */}

      {/* ── 01 SIGNATURE FILMS ──────────────────────────────────────────────── */}
      <ServiceSection
        id="signature-films"
        index={1}
        num="01"
        label="Signature Films"
        heading="The hero film your brand is remembered by."
        description="Full cinematic production, built shot by shot for launches and flagship campaigns."
        price="$350"
        service="Signature Films">
        <MediaSlider items={aiFilmsData} kind="vertical" label="Signature Films" />
      </ServiceSection>

      {/* ── 02 REALISM STORYTELLING ─────────────────────────────────────────── */}
      <ServiceSection
        id="realism-storytelling"
        index={2}
        num="02"
        label="Realism Storytelling"
        heading="Real stories. Footage that feels lived in."
        description="Documentary-style films that tell the human story behind a brand, built from real people, real history and real places."
        price="$950"
        buttonLabel="Enquire for pricing"
        service="Realism Storytelling">
        <MediaSlider items={realismData} kind="vertical" label="Realism Storytelling" />
      </ServiceSection>

      {/* ── 03 LUXURY PROPERTY FILMS ────────────────────────────────────────── */}
      <ServiceSection
        id="luxury-property-films"
        index={3}
        num="03"
        label="Luxury Property Films"
        heading="Sell it before it's built."
        description="Cinematic villa and resort films made from your renders and plans. No shoot day, no waiting for construction."
        price="$350"
        service="Luxury Property Films">
        <MediaSlider items={luxuryData} kind="wide" label="Luxury Property Films" />
      </ServiceSection>

      {/* ── 04 CHARACTERS & LOCATIONS ───────────────────────────────────────── */}
      <ServiceSection
        id="characters-locations"
        index={4}
        num="04"
        label="Characters & Locations"
        heading="Consistent by design."
        description="A face and a world you own: custom characters and locations that stay consistent across every film."
        price="$250"
        buttonLabel="Enquire for pricing"
        service="Characters & Locations">
        <CharactersLocations />
      </ServiceSection>
      {/* ── END CHARACTERS & LOCATIONS ──────────────────────────────────────── */}

      {/* ── 05 TALKING HEAD & VSL ───────────────────────────────────────────── */}
      <ServiceSection
        id="talking-head-vsl"
        index={5}
        num="05"
        label="Talking Head & VSL"
        heading="A face that sells, every week."
        description="Presenter-led video sales letters and talking-head content, with no filming. Use your own presenter, or add a custom AI character as a consistent on-screen host."
        price="$250"
        service="Talking Head & VSL">
        <MediaSlider items={talkingHeadData} kind="vertical" label="Talking Head and VSL" />
      </ServiceSection>

      {/* ── 06 RENDER TO REALITY ────────────────────────────────────────────── */}
      <ServiceSection
        id="render-to-reality"
        index={6}
        num="06"
        label="Render to Reality"
        heading="From CGI to photograph."
        description="Send us your renders. We turn them into images that look like they were shot on location. Drag the slider to compare."
        price="$25"
        buttonLabel="$25 / render · Min. 10"
        service="Render to Reality">
        <RenderToReality />
      </ServiceSection>

      {/* ── 07 PERFORMANCE ADS ──────────────────────────────────────────────── */}
      <ServiceSection
        id="performance-ads"
        index={7}
        num="07"
        label="Performance Ads"
        heading="Ads built for volume."
        description="Short vertical ads made fast and in batches, so you can test hooks and keep your feed fresh."
        price="$150"
        service="Performance Ads">
        <MediaSlider items={adsData} kind="vertical" label="Performance Ads" />
      </ServiceSection>
      {/* ── END SERVICES ────────────────────────────────────────────────────── */}

      {/* Stats row */}
      <div className="max-w-7xl mx-auto py-12 md:py-16 lg:py-24">
        <span className="type-body block">
          Every video is built from a full production toolkit: <br />
          script, voiceover, AI photo, AI video, editing, sound design, original music, and captions. <br />
          Tailored to what each project needs.
        </span>
      </div>
    </div>
  );
}