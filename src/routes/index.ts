// @ts-nocheck
import { Endpoint } from '../types/endpoint.ts'
import root from './.ts'

import player from './wrapped/player.ts'

// Player Data
import rawPlayer from './raw/player/rawPlayer.ts'

// SkyBlock - HAS PARAMETERS
import rawProfile from './raw/skyblock/rawProfile.ts'

export const endpoints: Record<string, Endpoint> = {
    root,

    // Wrapped data
    player,

    // Raw data
    rawPlayer,

    rawProfile
}
