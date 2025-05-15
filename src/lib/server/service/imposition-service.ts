import type { SiteFlowClient } from '../siteflow-client';

export type Imposition = {
	name: string;
	_id: string;
	description: string;
	sheet: {
		width: number;
		height: number;
		margin: {
			top: 0.25;
			right: 0.25;
			bottom: 0.25;
			left: 0.25;
		};
	};
};

export class ImpositionService {
	private client: SiteFlowClient;
	constructor(client: SiteFlowClient) {
		this.client = client;
	}

	public async getImpositions() {
		return this.client.call<Imposition[]>('GET', '/api/imposition');
	}
}
