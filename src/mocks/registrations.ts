import type { Registration, Enquiry } from '@/types'

const ago = (d: number) => new Date(Date.now() - d * 864e5).toISOString()

/** DEMO applications to populate the admin console. */
export const seedRegistrations = (): Registration[] => [
  {
    id: 'r1', refNo: 'FRM-2541203', type: 'FARMER', name: 'Ramesh Choudhary (Demo)', phone: '9000001101', state: 'Rajasthan', district: 'Nagaur', village: 'Kuchera',
    details: { landAcres: 6, crops: ['Moong', 'Bajra'], farmingType: 'Natural / Organic', interests: ['Organic fertilizer', 'Market linkage'] },
    status: 'APPROVED', isDemo: true, createdAt: ago(12),
  },
  {
    id: 'r2', refNo: 'FPO-2539871', type: 'FPO', name: 'Dinesh Sharma (Demo)', phone: '9000001102', email: 'ceo@demo-fpo.in', state: 'Madhya Pradesh', district: 'Sehore',
    details: { fpoName: 'Sehore Kisan Producer Co. (Demo)', cin: 'U01400MP2020PTC000000', members: 640, commodities: ['Wheat', 'Soybean'], needs: ['Market linkage', 'Compliance support'] },
    status: 'UNDER_REVIEW', isDemo: true, createdAt: ago(6),
  },
  {
    id: 'r3', refNo: 'SHG-2540112', type: 'SHG', name: 'Sunita Devi (Demo)', phone: '9000001103', state: 'Rajasthan', district: 'Kota', village: 'Sangod',
    details: { shgName: 'Sakhi Mahila SHG (Demo)', members: 12, activity: 'Jute bags & handicrafts', bankLinked: true },
    status: 'PENDING', isDemo: true, createdAt: ago(2),
  },
  {
    id: 'r4', refNo: 'DRY-2538554', type: 'DAIRY', name: 'Bhagwan Singh (Demo)', phone: '9000001104', state: 'Gujarat', district: 'Banaskantha', village: 'Deesa',
    details: { unitType: 'Individual dairy farmer', cattle: 14, dailyMilkLitres: 85, breeds: ['Gir', 'Kankrej'], interests: ['Enzybiotic Power Pro', 'Fair pricing'] },
    status: 'PENDING', isDemo: true, createdAt: ago(1),
  },
  {
    id: 'r5', refNo: 'FRM-2537760', type: 'FARMER', name: 'Lakshmi Bai (Demo)', phone: '9000001105', state: 'Maharashtra', district: 'Nashik',
    details: { landAcres: 3, crops: ['Onion', 'Grapes'], farmingType: 'Conventional', interests: ['Polyhouse (PPP)'] },
    status: 'REJECTED', isDemo: true, createdAt: ago(20), notes: 'Duplicate application (demo).',
  },
]

export const seedEnquiries = (): Enquiry[] => [
  {
    id: 'e1', refNo: 'ENQ-2541880', type: 'CBG_INVESTMENT', name: 'Arvind Mehta (Demo)', organisation: 'Demo Green Energy LLP', email: 'arvind@example.com', phone: '9000002201', city: 'Ahmedabad',
    message: 'Interested in investing in a 5 TPD CBG plant under the PPP model in Gujarat. Please share the project structure.', status: 'NEW', isDemo: true, createdAt: ago(1),
  },
  {
    id: 'e2', refNo: 'ENQ-2540310', type: 'BULK_PURCHASE', name: 'Priya Nair (Demo)', organisation: 'Demo Organic Stores', email: 'priya@example.com', phone: '9000002202', city: 'Mumbai',
    message: 'Looking for monthly supply of A2 ghee and cold-pressed oils for 8 retail outlets.', status: 'IN_PROGRESS', isDemo: true, createdAt: ago(4),
  },
  {
    id: 'e3', refNo: 'ENQ-2539002', type: 'CSR', name: 'Vikram Rao (Demo)', organisation: 'Demo Industries CSR Cell', email: 'csr@example.com', phone: '9000002203', city: 'Jaipur',
    message: 'Our CSR wing would like to fund women SHG skill training in two districts.', status: 'CLOSED', isDemo: true, createdAt: ago(15),
  },
]
