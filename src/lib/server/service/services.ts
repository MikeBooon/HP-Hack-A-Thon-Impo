import { env } from '$env/dynamic/private';
import { SiteFlowClient } from '../siteflow-client';
import { ImpositionService } from './imposition-service';

const client = new SiteFlowClient({
	url: env.SITEFLOW_BASEURL,
	organization: env.SITEFLOW_ORG,
	secret: env.SITEFLOW_SECRET,
	submitOrderUrl: env.SITEFLOW_SUBMITORDERURL,
	token: env.SITEFLOW_TOKEN
});

export const services = {
	impositionService: new ImpositionService(client)
} as const;
client;
