import { zip, initial, tail, uniqBy } from 'lodash'
import { Pin, WeaveLine, WeaveSolution } from '@/types'

type FactoryOptions = {
    radius: number
}

export function factory(text: string, options: FactoryOptions): WeaveSolution {
    const ns = text
        .split(',')
        .map(Number)
    const min = Math.min(...ns)
    const max = Math.max(...ns)

    const r = options.radius
    const angleStep = Math.PI * 2 / (max + 1)
    const ps = ns.map<Pin>(n => {
        const angle = n * angleStep
        return {
            id: n,
            x: Math.cos(angle) * r,
            y: Math.sin(angle) * r,
            label: `${n}`.padStart(3, '0'),
            angle,
        }
    })
    const lines = pairs(ps).map<WeaveLine>(([start, end]) => ({
        start,
        end,
    }))
    const pins = uniqBy(ps, x => x.id)

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
