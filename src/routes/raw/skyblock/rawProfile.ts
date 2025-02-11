import hypixelApi from '../../../utils/hypixelApi'
import Res from '../../../../index'
import Cache from '../../../utils/Cache'

export default {
    path: '/rawPlayer',
    params: ['uuid'],
    async run(req: Request, params: URLSearchParams) {
        const UUID = params.get('uuid')
        if (!UUID) {
            throw new Error('uuid is required but not provided')
        }
        let HypixelData = Cache[UUID]
        let previouslyCached = HypixelData ? true : false

        if (!previouslyCached) {
            await hypixelApi.get(`/v2/skyblock/profiles?uuid=${params.get('uuid')}`).then((promise) =>
                promise.json().then((result) => {
                    HypixelData = result
                }),
            )
        }

        // Return raw response if unsuccessful
        if (!HypixelData.success || !HypixelData)
            return Res(
                HypixelData || {
                    success: false,
                    code: 404,
                    error: 'Could not retrieve profile data from cache or API',
                },
            )

        Cache[UUID] = HypixelData

        // Remove from cache after time
        if (!previouslyCached) {
            setTimeout(() => {
                delete Cache[UUID]
            }, 600 * 1000)
        }

        return Res(
            {
                success: true,
                cached: previouslyCached,
                profiles: HypixelData.profiles
            }
        )
    },
}
