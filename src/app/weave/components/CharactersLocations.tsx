'use client';
import { useState, useCallback } from 'react';
import { SlideRow, SlideCard, MediaLightbox, MediaItem } from './SlideRow';
// Layout (heading, price) is provided by ServiceSection in SectionParts.

// ─── DATA ─────────────────────────────────────────────────────────────────────
export interface CharacterImage {
  src: string;
  alt: string;
  aspectRatio: 'square' | 'wide' | 'tall';
  fullSrc?: string;
}

export interface CharacterCard {
  id: number;
  name: string;
  type: string;
  tag: 'character' | 'location';
  images: CharacterImage[];
}

export const charactersData: CharacterCard[] = [
  {
    id: 1,
    name: 'The Daughter',
    type: 'Character',
    tag: 'character',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181108/Daughter_Headshot_e3zz2z.png',
        alt: 'The Daughter — headshot portrait',
        aspectRatio: 'square',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181108/Daughter_Headshot_e3zz2z.png',
      },
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180808/Daughter_froo8x.png',
        alt: 'The Daughter — full turnaround',
        aspectRatio: 'wide',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180808/Daughter_froo8x.png',
      },
    ],
  },
  {
    id: 2,
    name: 'The Farmer',
    type: 'Character',
    tag: 'character',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181163/Farmer_Headshot_fvsdms.png',
        alt: 'The Farmer — headshot portrait',
        aspectRatio: 'square',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181163/Farmer_Headshot_fvsdms.png',
      },
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180807/Farmer_br4upt.png',
        alt: 'The Farmer — full turnaround',
        aspectRatio: 'wide',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180807/Farmer_br4upt.png',
      },
    ],
  },
  {
    id: 3,
    name: 'Casual Clothing',
    type: 'Character',
    tag: 'character',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180817/Casual_clothing_s3ao6z.png',
        alt: 'Casual Clothing — character turnaround',
        aspectRatio: 'wide',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180817/Casual_clothing_s3ao6z.png',
      },
    ],
  },
  {
    id: 4,
    name: 'Peter',
    type: 'Character',
    tag: 'character',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180854/Peter_-_Full_Character_Sheet_xr8jza.png',
        alt: 'Peter — full character reference sheet',
        aspectRatio: 'tall',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791180854/Peter_-_Full_Character_Sheet_xr8jza.png',
      },
    ],
  },
  {
    id: 5,
    name: 'Sanaya Rooftop',
    type: 'Location',
    tag: 'location',
    images: [
      {
        src: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181266/SANAYA_Location_Reference_Sheet_m4rlkr.png',
        alt: 'Sanaya Rooftop — location reference sheet',
        aspectRatio: 'tall',
        fullSrc: 'https://res.cloudinary.com/wle6dmxs/image/upload/v1791181266/SANAYA_Location_Reference_Sheet_m4rlkr.png',
      },
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

interface SheetItem {
  src: string;
  alt: string;
  cardName: string;
  cardType: string;
}

// One entry per sheet image, so the lightbox arrows move between sheets
const sheetItems: SheetItem[] = charactersData.flatMap((card) =>
  card.images.map((img) => ({
    src: img.fullSrc ?? img.src,
    alt: img.alt,
    cardName: card.name,
    cardType: card.type,
  }))
);

const lightboxItems: MediaItem[] = sheetItems.map((s) => ({
  type: 'image',
  src: s.src,
  alt: s.alt,
  title: s.cardName,
  caption: s.cardType,
}));

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CharactersLocations() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      {openIndex !== null && (
        <MediaLightbox items={lightboxItems} startIndex={openIndex} onClose={closeLightbox} />
      )}

      <SlideRow cardWidth={260} ariaLabel="Characters and locations">
        {sheetItems.map((item, i) => (
          <SlideCard
            key={`${item.cardName}-${i}`}
            kind="vertical"
            title={item.cardName}
            subtitle={item.cardType}
            ariaLabel={`Open ${item.cardName} ${item.cardType}`}
            onClick={() => setOpenIndex(i)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </SlideCard>
        ))}
      </SlideRow>
    </>
  );
}
