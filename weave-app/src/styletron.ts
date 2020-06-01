import { Client, Server } from 'styletron-engine-atomic'
import { DebugEngine } from 'styletron-react'

const getHydrateClass = () => document.getElementsByClassName('_styletron_hydrate_')

export const getStyletronServerStylesheets = () => {
    const s = new Server()
    return s.getStylesheets() ?? []
}

export const styletron = typeof window === 'undefined'
    ? new Server()
    : new Client({
        hydrate: getHydrateClass(),
    } as any)

export const debug = process.env.NODE_ENV === 'production' ? void 0 : new DebugEngine()
