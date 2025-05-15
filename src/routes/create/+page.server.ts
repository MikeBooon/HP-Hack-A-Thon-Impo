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
		console.log('request', request);

		const form = await request.formData();

		const data = form.get('data');

		if (!data) {
			throw new Error('No data provided');
		}

		console.log('data', data);

		const parsedData = JSON.parse(data.toString()) as Imposition;

		console.log(parsedData);
	}
};
