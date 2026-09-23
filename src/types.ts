export type TabKey = 'home' | 'media' | 'gallery' | 'hobbies';

export interface TabConfig {
  key: TabKey;
  label: string;
}

export interface SectionContent {
  title: string;
  notes: string;
}

export type CollageSlotId = 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface CollageSlotConfig {
  id: CollageSlotId;
  label: string;
  defaultUrl: string;
  rotation: string;
  pin: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'ARTIST' | 'GENRE';
}

export interface SportCard {
  id: string;
  sport: string;
  team: string;
  icon: 'baseball' | 'football';
}
