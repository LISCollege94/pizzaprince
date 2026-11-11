import { KarachiArea } from '../types';

export const RESTAURANT_LOCATION = {
  name: 'Pizza Prince Restaurant',
  address: 'ST 1, Sector 1 Surjani Town, Karachi, Pakistan',
  landmark: 'Near 4K Chowrangi, Surjani Town',
  mapsUrl: 'https://maps.app.goo.gl/LuKqtbjtXkaGp7en9',
  phone: '0312-2274688',
  whatsapp: '+923122274688',
  lat: 25.0252,
  lng: 67.0618,
};

// Calculate delivery fee based on user requirement:
// 4K Chowrangi (~2.0 km) is Rs. 100 base.
// Beyond 2.5 km, Rs. 20 per extra km is added automatically.
export function calculateDeliveryFee(distanceKm: number): number {
  if (distanceKm <= 2.5) {
    return 100;
  }
  const extraKm = distanceKm - 2.5;
  const extraCharge = Math.ceil(extraKm * 20 / 10) * 10; // Rounded to nearest 10
  return 100 + extraCharge;
}

export function calculateEstimatedMinutes(distanceKm: number): string {
  if (distanceKm <= 3) return '25 - 35 mins';
  if (distanceKm <= 7) return '35 - 45 mins';
  if (distanceKm <= 14) return '45 - 60 mins';
  return '55 - 75 mins';
}

// Haversine formula to compute distance in km between two GPS coordinates
export function getDistanceInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return Math.round(d * 10) / 10;
}

export const KARACHI_AREAS: KarachiArea[] = [
  {
    id: 'surjani-sec1',
    name: 'Sector 1, Surjani Town',
    sectorName: 'Surjani Town',
    distanceKm: 0.6,
    deliveryFee: 100,
    estimatedMinutes: '20 - 30 mins',
  },
  {
    id: '4k-chowrangi',
    name: '4K Chowrangi, Surjani',
    sectorName: 'Surjani / North Karachi Border',
    distanceKm: 2.0,
    deliveryFee: 100,
    estimatedMinutes: '25 - 35 mins',
  },
  {
    id: 'surjani-sec4-7',
    name: 'Sector 4, 5 & 7, Surjani Town',
    sectorName: 'Surjani Town',
    distanceKm: 2.3,
    deliveryFee: 100,
    estimatedMinutes: '25 - 35 mins',
  },
  {
    id: 'kaneez-fatima',
    name: 'Kaneez Fatima Society / Sector 9',
    sectorName: 'Surjani Town',
    distanceKm: 3.5,
    deliveryFee: 120,
    estimatedMinutes: '30 - 40 mins',
  },
  {
    id: 'powerhouse',
    name: 'Powerhouse Chowrangi, North Karachi',
    sectorName: 'North Karachi (Sector 5)',
    distanceKm: 4.6,
    deliveryFee: 150,
    estimatedMinutes: '30 - 40 mins',
  },
  {
    id: 'nagan-chowrangi',
    name: 'Nagan Chowrangi / Sector 11',
    sectorName: 'North Karachi',
    distanceKm: 7.0,
    deliveryFee: 200,
    estimatedMinutes: '35 - 45 mins',
  },
  {
    id: 'up-morr',
    name: 'UP Morr / Sakhi Hasan',
    sectorName: 'North Karachi / North Nazimabad',
    distanceKm: 8.0,
    deliveryFee: 220,
    estimatedMinutes: '35 - 50 mins',
  },
  {
    id: 'buffer-zone',
    name: 'Buffer Zone & Shadman Town',
    sectorName: 'North Karachi',
    distanceKm: 8.5,
    deliveryFee: 230,
    estimatedMinutes: '40 - 50 mins',
  },
  {
    id: 'fb-area',
    name: 'Federal B Area / Water Pump',
    sectorName: 'Central Karachi',
    distanceKm: 11.5,
    deliveryFee: 300,
    estimatedMinutes: '45 - 55 mins',
  },
  {
    id: 'north-nazimabad',
    name: 'North Nazimabad (Hyderi / Five Star)',
    sectorName: 'North Nazimabad',
    distanceKm: 13.0,
    deliveryFee: 330,
    estimatedMinutes: '45 - 60 mins',
  },
  {
    id: 'scheme-33',
    name: 'Scheme 33 / Safoora Chowrangi',
    sectorName: 'Scheme 33',
    distanceKm: 14.5,
    deliveryFee: 360,
    estimatedMinutes: '50 - 65 mins',
  },
  {
    id: 'nazimabad',
    name: 'Nazimabad (Gole Market / 1-5)',
    sectorName: 'Nazimabad',
    distanceKm: 15.5,
    deliveryFee: 380,
    estimatedMinutes: '50 - 65 mins',
  },
  {
    id: 'gulshan-iqbal',
    name: 'Gulshan-e-Iqbal (All Blocks)',
    sectorName: 'Gulshan-e-Iqbal',
    distanceKm: 17.5,
    deliveryFee: 420,
    estimatedMinutes: '55 - 70 mins',
  },
  {
    id: 'gulistan-johar',
    name: 'Gulistan-e-Johar (Blocks 1-20)',
    sectorName: 'Gulistan-e-Johar',
    distanceKm: 21.0,
    deliveryFee: 490,
    estimatedMinutes: '60 - 75 mins',
  },
  {
    id: 'saddar-pechs',
    name: 'Saddar / PECHS / Tariq Road',
    sectorName: 'Karachi South / East',
    distanceKm: 23.5,
    deliveryFee: 540,
    estimatedMinutes: '60 - 80 mins',
  },
  {
    id: 'malir-cantt',
    name: 'Malir Cantt / Model Colony',
    sectorName: 'Malir',
    distanceKm: 25.0,
    deliveryFee: 570,
    estimatedMinutes: '65 - 85 mins',
  },
  {
    id: 'clifton-dha',
    name: 'Clifton & Defence (DHA)',
    sectorName: 'Karachi South',
    distanceKm: 29.0,
    deliveryFee: 650,
    estimatedMinutes: '70 - 90 mins',
  },
  {
    id: 'bahria-town',
    name: 'Bahria Town Karachi',
    sectorName: 'Super Highway',
    distanceKm: 33.0,
    deliveryFee: 730,
    estimatedMinutes: '75 - 95 mins',
  },
];
