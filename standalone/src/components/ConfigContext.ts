import { createContext } from 'react';

export interface Config {
	enableSpaceStatus: boolean;
	enableCluesCompletion: boolean;
	showGrid: boolean;
}

export const defaultConfig: Config = {
	enableSpaceStatus: false,
	enableCluesCompletion: false,
	showGrid: true,
};

export const ConfigContext = createContext< Config >( defaultConfig );
