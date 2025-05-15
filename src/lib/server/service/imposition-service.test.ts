import { env } from '$env/dynamic/private';
import { SiteFlowClient } from '$lib/server/siteflow-client';
import { describe, expect, test } from 'vitest';
import { ImpositionService } from './imposition-service';

const siteFlowClient = new SiteFlowClient({
	url: env.SITEFLOW_BASEURL,
	organization: env.SITEFLOW_ORG,
	secret: env.SITEFLOW_SECRET,
	submitOrderUrl: env.SITEFLOW_SUBMITORDERURL,
	token: env.SITEFLOW_TOKEN
});

describe('imposition-service', async () => {
	const impositionService = new ImpositionService(siteFlowClient);

	test('should get a list of impositions', async () => {
		const imposition = await impositionService.getImpositions();

		expect(imposition).toBeTypeOf('object');
		expect(imposition.length).toBeGreaterThan(0);
	});
});
