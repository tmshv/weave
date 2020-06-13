import { zip, initial, tail } from 'lodash'
import { Pin, WeaveLine, WeaveSolution } from '@/types'

type Task = {
    pinOrder: number[]
    min: number,
    max: number,
    lines: [number, number][],
}

export function factory(text: string): WeaveSolution {
    const coords = text
        .split(',')
        .map(Number)
    const min = Math.min(...coords)
    const max = Math.max(...coords)

    const r = 240
    const angleStep = Math.PI * 2 / max
    const pins = coords.map<Pin>(n => {
        const angle = n * angleStep
        return {
            id: n,
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r,
            label: `${n}`
        }
    })
    const lines = pairs(pins).map<WeaveLine>(([start, end]) => ({
        start,
        end,
    }))

    return {
        lines,
        pins
    }

    // return {
    //     pinOrder: coords,
    //     min,
    //     max,
    //     lines: pairs(coords)
    // }
}

function pairs<T>(xs: T[]): [T, T][] {
    return zip<T, T>(initial(xs), tail(xs))
        .map(([a, b]) => [a!, b!])
}
