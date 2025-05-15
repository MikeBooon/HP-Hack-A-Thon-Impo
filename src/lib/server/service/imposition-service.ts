import type { SiteFlowClient } from '../siteflow-client';

export class ImpositionService {
	private client: SiteFlowClient;
	constructor(client: SiteFlowClient) {
		this.client = client;
	}

	public async getImpositions() {
		return this.client.call<{ name: string; _id: string }[]>('GET', '/api/imposition');
	}
}
