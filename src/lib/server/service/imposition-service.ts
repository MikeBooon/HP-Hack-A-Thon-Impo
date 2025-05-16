import type { SiteFlowClient } from '../siteflow-client';

export type ImpositionMark = {
	type: string;
	length: number;
	offset: number;
	style: string;
	colour: string;
	adjustX: number;
	adjustY: number;
};

export type ImpositionSlot = {
	offset: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	bleed: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	marks: {
		centerTop: ImpositionMark;
		leftCenter: ImpositionMark;
		rightCenter: ImpositionMark;
		centerBottom: ImpositionMark;
		leftTop: ImpositionMark;
		rightTop: ImpositionMark;
		rightBottom: ImpositionMark;
		leftBottom: ImpositionMark;
	};
	index: number;
	number: number;
	ref: string;
	rotation: number;
	placement: string;
	top: number;
	left: number;
	width: number;
	height: number;
	scaleX: number;
	scaleY: number;
	bindingMargin: string;
	_id?: string;
};

export type ImpositionSide = {
	slots: ImpositionSlot[];
	gutters: {
		horizontal: number[];
		vertical: number[];
	};
	_id?: string;
};

export type Imposition = {
	name: string;
	_id: string;
	description: string;
	sheet: {
		width: number;
		height: number;
		margin: {
			top: number;
			right: number;
			bottom: number;
			left: number;
		};
		gutter: {
			horizontal: number;
			vertical: number;
		};
		distribute: string;
		tumble: string;
		duplex: boolean;
		rows: number;
		cols: number;
		bleed: number;
		cropSlots: boolean;
		placement: string;
		slotSizeType: string;
		automaticTrimMarks: boolean;
		automaticBleed: boolean;
		maxHeight: boolean;
		addBleed: boolean;
		rotation: number;
		honorPdfPageRotation: boolean;
	};
	sides: ImpositionSide[];
};

export class ImpositionService {
	private client: SiteFlowClient;
	constructor(client: SiteFlowClient) {
		this.client = client;
	}

	public async getImpositions() {
		return this.client.call<Imposition[]>('GET', '/api/imposition');
	}

	public async updateImposition(id: string, imposition: Imposition) {
		return this.client.call<Imposition>('PUT', `/api/imposition/${id}`, {
			body: imposition
		});
	}

	public async copyImposition(id: string, name: string) {
		return this.client.call<Imposition>('POST', `/api/imposition/${id}/copy`, {
			body: {
				updateFields: {
					name
				}
			}
		});
	}
}
