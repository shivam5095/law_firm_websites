export const contact = {
  phones: ['+91 79859 33594', '+91 87961 81252'],
  email: 'contact.mauryaandco@gmail.com',
  addresses: [
    'C-51, Sector-33, Noida, Uttar Pradesh, 201301',
    'House No. 181, Aragananand Colony, Yadav Bypass Road, Varanasi, Uttar Pradesh – 221011',
  ],
} as const;

export function getMapSearchUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
