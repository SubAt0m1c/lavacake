import { RankPriority } from '../../types/priority'

type HousingMeta = {
    packages?: Array<string>
    purchasedSlots?: number
    plotSize?: string
}

export default function parseHousing(rank: keyof typeof RankPriority, housingMeta: HousingMeta) {
    const rankPriority = RankPriority[rank] || 0

    let slots = 0
    let slotsDefault = 1
    let slotsPurchased = housingMeta.purchasedSlots || 0

    if (rankPriority >= 1) defaultSlots++
    if (rankPriority >= 3) defaultSlots++

    slots += defaultSlots
    slots += purchasedSlots

    return {
        housingPlus: housingMeta.packages?.includes('housing_plus'),

        housingSlots: slots,
        slotsPurchased,
        slotsDefault,

        plotSize: housingMeta.plotSize || 'TINY',
    }
}
