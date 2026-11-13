import { contact } from '@/config/contact';

export interface OfficeHub {
    name: string;
    designation: 'Principal HQ' | 'Additional HQ';
    address: string;
    courtsTribunals: string;
    regionTag: string;
}

export const officeHubs: OfficeHub[] = [
    {
        name: 'Noida',
        designation: 'Principal HQ',
        address: contact.addresses[0],
        courtsTribunals: 'Supreme Court of India, Delhi High Court, NCLT, DRT, Commercial Courts and DIAC',
        regionTag: 'Delhi NCR',
    },
    {
        name: 'Varanasi',
        designation: 'Additional HQ',
        address: contact.addresses[1],
        courtsTribunals: 'Varanasi District & Sessions Courts, Commercial Courts, Allahabad High Court, and relevant DRT/NCLT forums across Uttar Pradesh',
        regionTag: 'Eastern Uttar Pradesh',
    },
];