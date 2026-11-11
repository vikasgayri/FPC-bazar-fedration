import type { Enquiry } from '@/types'
import { ApiError, USE_MOCK, http, mockDelay } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { collection } from './storage'
import { seedEnquiries } from '@/mocks/registrations'
import { refNo, uid } from '@/utils/format'

const store = collection<Enquiry>('enquiries', seedEnquiries)

export type EnquiryInput = Pick<Enquiry, 'type' | 'name' | 'organisation' | 'email' | 'phone' | 'city' | 'message'>

export const enquiryService = {
  /** Stores a DEMO enquiry locally — no email/SMS is sent in Phase 1. */
  async submit(input: EnquiryInput): Promise<Enquiry> {
    if (!USE_MOCK) return http.post(endpoints.enquiries.create, input)
    await mockDelay(700)
    const e: Enquiry = { ...input, id: uid('e'), refNo: refNo('ENQ'), status: 'NEW', isDemo: true, createdAt: new Date().toISOString() }
    store.save([e, ...store.all()])
    return e
  },
  async adminList(): Promise<Enquiry[]> {
    if (!USE_MOCK) return http.get(endpoints.enquiries.adminList)
    await mockDelay(250)
    return store.all()
  },
  async updateStatus(id: string, status: Enquiry['status']): Promise<Enquiry> {
    if (!USE_MOCK) return http.patch(endpoints.enquiries.updateStatus(id), { status })
    await mockDelay()
    const all = store.all()
    const e = all.find((x) => x.id === id)
    if (!e) throw new ApiError('Not found', 404)
    e.status = status
    store.save(all)
    return e
  },
}
