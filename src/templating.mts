import { Eta } from 'eta'

export const eta = new Eta({
    views: 'script_templates',
    useWith: true,
    rmWhitespace: true,
    autoTrim: [false, false]
})