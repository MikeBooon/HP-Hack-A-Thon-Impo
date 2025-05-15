import { services } from '$lib/server/service/services';

export const load = async () => {
	const impositions = await services.impositionService.getImpositions();

	return {
		impositions
	};
};
