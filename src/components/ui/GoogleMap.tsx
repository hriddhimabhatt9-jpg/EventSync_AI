"use client";

/**
 * GoogleMap — Reusable Google Maps Embed Component
 *
 * Renders a Google Maps iframe using the Maps Embed API.
 * Reads the API key from NEXT_PUBLIC_GOOGLE_MAPS_API_KEY env var.
 *
 * @see https://developers.google.com/maps/documentation/embed/get-started
 */

import React from "react";

interface GoogleMapProps {
  /** The search query or place name (e.g. "Moscone Center, San Francisco") */
  query: string;
  /** Optional title for the iframe (accessibility) */
  title?: string;
  /** Optional width — defaults to 100% */
  width?: string;
  /** Optional height — defaults to 100% */
  height?: string;
  /** Optional CSS class for the container */
  className?: string;
  /** Optional inline styles for the iframe */
  style?: React.CSSProperties;
}

/**
 * Embeds a Google Map centered on the given query location.
 * Falls back to a static placeholder if no API key is configured.
 */
export default function GoogleMap({
  query,
  title = "Google Maps",
  width = "100%",
  height = "100%",
  className = "",
  style,
}: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const encodedQuery = encodeURIComponent(query);

  // Construct the Maps Embed API URL
  const mapSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedQuery}`
    : `https://www.google.com/maps?q=${encodedQuery}&output=embed`;

  return (
    <iframe
      title={title}
      src={mapSrc}
      width={width}
      height={height}
      className={className}
      style={{ border: 0, ...style }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      aria-label={`Google Map showing ${query}`}
    />
  );
}
