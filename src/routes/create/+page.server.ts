import type { Imposition } from '$lib/server/service/imposition-service.js';
import { services } from '$lib/server/service/services';

export const load = async () => {
	const impositions = await services.impositionService.getImpositions();

	return {
		impositions
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();

		const data = form.get('data');

		if (!data) {
			throw new Error('No data provided');
		}

		const parsedData = JSON.parse(data.toString()) as Imposition;

		await services.impositionService.updateImposition(parsedData._id, parsedData);
	}
};
