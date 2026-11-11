import type { Registration, RegistrationStatus, RegistrationType } from '@/types'
import { ApiError, USE_MOCK, http, mockDelay } from '@/api/client'
import { endpoints } from '@/api/endpoints'
import { collection } from './storage'
import { seedRegistrations } from '@/mocks/registrations'
import { refNo, uid } from '@/utils/format'

const store = collection<Registration>('registrations', seedRegistrations)
const prefix: Record<RegistrationType, string> = { FARMER: 'FRM', FPO: 'FPO', SHG: 'SHG', DAIRY: 'DRY' }

export type RegistrationInput = Pick<Registration, 'type' | 'name' | 'phone' | 'email' | 'state' | 'district' | 'village' | 'details'>

export const registrationService = {
  /** Saves a DEMO application in this browser only. */
  async submit(input: RegistrationInput): Promise<Registration> {
    if (!USE_MOCK) return http.post(endpoints.registrations.create, input)
    await mockDelay(800)
    const r: Registration = {
      ...input,
      id: uid('r'),
      refNo: refNo(prefix[input.type]),
      status: 'PENDING',
      isDemo: true,
      createdAt: new Date().toISOString(),
    }
    store.save([r, ...store.all()])
    return r
  },

  async track(ref: string): Promise<Registration> {
    if (!USE_MOCK) return http.get(endpoints.registrations.track(ref))
    await mockDelay(400)
    const r = store.all().find((x) => x.refNo.toUpperCase() === ref.trim().toUpperCase())
    if (!r) throw new ApiError('No application found with this reference number in this demo.', 404)
    return r
  },

  async adminList(): Promise<Registration[]> {
    if (!USE_MOCK) return http.get(endpoints.registrations.adminList)
    await mockDelay(250)
    return store.all()
  },

  async updateStatus(id: string, status: RegistrationStatus, notes?: string): Promise<Registration> {
    if (!USE_MOCK) return http.patch(endpoints.registrations.updateStatus(id), { status, notes })
    await mockDelay()
    const all = store.all()
    const r = all.find((x) => x.id === id)
    if (!r) throw new ApiError('Not found', 404)
    r.status = status
    if (notes !== undefined) r.notes = notes
    store.save(all)
    return r
  },
}
