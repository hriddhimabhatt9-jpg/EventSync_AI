// ============================================
// EventSync AI — TypeScript Type Definitions
// ============================================

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: number | null;
  priceLabel: string;
  category: string;
  tags: string[];
  imageUrl: string;
  isFeatured: boolean;
  capacity: number;
  registered: number;
  speakers: Speaker[];
  schedule: ScheduleItem[];
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  location?: string;
  speaker?: string;
  isActive?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "attendee" | "organizer" | "admin" | "speaker";
  avatar: string;
  title: string;
  company: string;
  interests: string[];
  bio?: string;
  points?: number;
  balance?: number;
}

export interface NetworkingMatch {
  id: string;
  user: User;
  matchScore: number;
  reason: string;
}

export interface SafetyAlert {
  id: string;
  type: "sos" | "incident" | "info";
  status: "active" | "resolved";
  message: string;
  location: string;
  timestamp: string;
}

export interface HelpDesk {
  id: string;
  name: string;
  distance: string;
  walkTime: string;
  imageUrl: string;
}

export interface VenueLocation {
  id: string;
  name: string;
  type: "hall" | "booth" | "food" | "restroom" | "helpdesk" | "exit" | "parking";
  x: number;
  y: number;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  cta?: string;
  ctaLink?: string;
  type: "info" | "warning" | "promo";
  timestamp: string;
}

export interface Badge {
  id: string;
  userId: string;
  eventName: string;
  eventId: string;
  role: string;
  validFrom: string;
  validTo: string;
  qrCodeData: string;
}
