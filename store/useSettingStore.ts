import { create } from 'zustand'
import dbData from '@/lib/data'

type SettingState = {
  setting: AlignSetting;
  setSetting: (newSetting: AlignSetting) => void;
};

const defaultSetting = dbData && dbData.settings && dbData.settings.length > 0
  ? {
      ...dbData.settings[0],
      currency: dbData.settings[0].defaultCurrency,
    }
  : { currency: '', headerMenus: [], site: {} }

const useSettingStore = create<SettingState>((set, get) => ({
  setting: defaultSetting as unknown as AlignSetting,
  setSetting: (newSetting: AlignSetting) => set({ setting: newSetting }),
}))

export default useSettingStore