import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  imageUrl: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: (e: React.MouseEvent, id: string) => void;
}

/**
 * EventCard Component
 * 
 * Reusable UI component for displaying an event preview card.
 * Used in event discovery, trending lists, and dashboard.
 */
export default function EventCard({
  id,
  title,
  date,
  location,
  price,
  imageUrl,
  isBookmarked = false,
  onBookmarkToggle,
}: EventCardProps) {
  return (
    <Link
      href={`/events/${id}`}
      className="min-w-[280px] bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden group transition-shadow hover:shadow-cloud"
      style={{ border: "1px solid rgba(195,198,215,0.1)" }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          alt={title}
          fill
          unoptimized={imageUrl.includes('dicebear')}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          src={imageUrl}
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-bold text-primary shadow-sm">
          {date}
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-bold text-lg mb-1 line-clamp-1">{title}</h4>
        <div className="flex items-center gap-1 text-on-surface-variant text-xs mb-3">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold">{price}</span>
          {onBookmarkToggle && (
            <button
              className={`p-2 rounded-full transition-colors ${
                isBookmarked ? "bg-primary/10 text-primary" : "text-primary-container"
              }`}
              style={!isBookmarked ? { background: "rgba(219,225,255,0.3)" } : {}}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark event"}
              onClick={(e) => onBookmarkToggle(e, id)}
            >
              <span
                className="material-symbols-outlined text-sm"
                style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                bookmark
              </span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
