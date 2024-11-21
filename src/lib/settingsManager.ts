import type { Selected } from 'bits-ui';

export interface Settings {
	theme: string;
	allowRotation: boolean;
}

const DEFAULT_SETTINGS: Settings = {
	theme: 'system',
	allowRotation: false
};

class SettingsManager {
	private readonly STORAGE_KEY: string;

	constructor(key = 'settings') {
		this.STORAGE_KEY = key;
	}

	getSettings(): Settings {
		try {
			const storedSettings = localStorage.getItem(this.STORAGE_KEY);

			if (storedSettings) {
				const parsed = JSON.parse(storedSettings);

				// Merge with original, incase we add new settings, etc
				return { ...DEFAULT_SETTINGS, ...parsed };
			}

			// Default settings if we don't have any settings yet
			return { ...DEFAULT_SETTINGS };
		} catch (error) {
			console.error(`Error trying to load settings: ${error}`);
			// Fallback to defaults
			return { ...DEFAULT_SETTINGS };
		}
	}

	get<K extends keyof Settings>(key?: K): Settings | Settings[K] {
		// If no key, return all settings
		const settings = this.getSettings();

		if (!key) {
			return { ...settings };
		}

		// Otherwise return specific setting
		return settings[key];
	}

	set(settingsOrKey: Partial<Settings> | keyof Settings, value?: any) {
		let settings = this.getSettings();
		try {
			// If it's an object, we know to update multiple settings
			if (typeof settingsOrKey === 'object') {
				settings = {
					...settings,
					...settingsOrKey
				};
			} else if (value !== undefined) {
				settings = {
					...settings,
					[settingsOrKey]: value
				};
			}

			// Save
			localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
		} catch (error) {
			console.error(`Error saving settings ${error}`);
		}
	}
}

export const settingsManager = new SettingsManager();
