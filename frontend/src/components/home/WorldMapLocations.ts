export type MapLocation = {
  name: string;
  lat: number;
  lng: number;
  kind: 'hub' | 'presence';
  arcAltitude: number;
};

// Coordinates are [latitude, longitude]. This array is the source of every real dot and arc.
export const mapLocations: MapLocation[] = [
  { name: 'Delhi, India', lat: 28.614, lng: 77.209, kind: 'hub', arcAltitude: 0 },
  { name: 'Ahmedabad, Gujarat', lat: 23.023, lng: 72.572, kind: 'presence', arcAltitude: 0.08 },
  { name: 'Hyderabad, India', lat: 17.385, lng: 78.487, kind: 'presence', arcAltitude: 0.11 },
  { name: 'Lucknow, Uttar Pradesh', lat: 26.847, lng: 80.947, kind: 'presence', arcAltitude: 0.07 },
  { name: 'Bangalore, India', lat: 12.972, lng: 77.594, kind: 'presence', arcAltitude: 0.12 },
  { name: 'Mumbai, India', lat: 19.076, lng: 72.878, kind: 'presence', arcAltitude: 0.08 },
  { name: 'Kolkata, India', lat: 22.572, lng: 88.364, kind: 'presence', arcAltitude: 0.13 },
  { name: 'California, USA', lat: 34.052, lng: -118.244, kind: 'presence', arcAltitude: 0.72 },
  { name: 'Atlanta, USA', lat: 33.749, lng: -84.388, kind: 'presence', arcAltitude: 0.66 },
  { name: 'Georgia, USA', lat: 32.081, lng: -81.091, kind: 'presence', arcAltitude: 0.6 },
  { name: 'Florida, USA', lat: 25.761, lng: -80.192, kind: 'presence', arcAltitude: 0.54 },
  { name: 'Kuwait', lat: 29.376, lng: 47.977, kind: 'presence', arcAltitude: 0.2 },
  { name: 'Dubai, UAE', lat: 25.205, lng: 55.271, kind: 'presence', arcAltitude: 0.22 },
  { name: 'Kuala Lumpur, Malaysia', lat: 3.139, lng: 101.687, kind: 'presence', arcAltitude: 0.25 },
  { name: 'Jakarta, Indonesia', lat: -6.2, lng: 106.845, kind: 'presence', arcAltitude: 0.29 },
];
