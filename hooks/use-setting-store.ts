/* eslint-disable no-unused-vars */

import data from '@/lib/data'
import { ClientSetting, SiteCurrency } from '@/types'
import { create } from 'zustand'

interface SettingState {
  setting: ClientSetting
  setSetting: (newSetting: ClientSetting) => void
  getCurrency: () => SiteCurrency
  setCurrency: (currency: string) => void
}

const settings: Partial<ClientSetting> =
  data && data.settings && data.settings.length > 0
    ? data.settings[0]
    : {
        defaultCurrency: '',
        availableCurrencies: [],
        site: {
          name: '',
          logo: '',
          slogan: '',
          description: '',
          keywords: '',
          url: '',
          email: '',
          phone: '',
          author: '',
          copyright: '',
          address: '',
        },
      }

const useSettingStore = create<SettingState>((set, get) => ({
  setting: {
    ...settings,
    currency: settings.defaultCurrency,
  } as ClientSetting,
  setSetting: (newSetting: ClientSetting) => {
    set({
      setting: {
        ...newSetting,
        currency: newSetting.currency || get().setting.currency,
      },
    })
  },
  getCurrency: () => {
    const found =
      get().setting.availableCurrencies?.find(
        (c) => c.code === get().setting.currency
      ) || settings.availableCurrencies?.[0];
    // Fallback to a default object if still undefined
    return (
      found ||
      {
        symbol: '',
        code: '',
        name: '',
        convertRate: 1,
      }
    );
  },
  setCurrency: async (currency: string) => {
    set({ setting: { ...get().setting, currency } })
  },
}))

export default useSettingStore
