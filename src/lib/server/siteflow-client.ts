import crypto from 'crypto';

export type SiteFlowOptions = {
	url: string;
	submitOrderUrl: string;
	token: string;
	secret: string;
	organization: string;
};

type ClientCallOptions = {
	query?: Record<string, string>;
	body?: any;
	useSubmitOrderUrl?: boolean;
};

export class SiteFlowClient {
	private opts: SiteFlowOptions;
	constructor(opts: SiteFlowOptions) {
		this.opts = opts;
	}

	public getOrganization() {
		return this.opts.organization;
	}

	public async call<T>(
		method: 'GET' | 'POST' | 'DELETE' | 'PUT',
		path: string,
		opts?: ClientCallOptions
	): Promise<T> {
		const baseUrl = opts?.useSubmitOrderUrl ? this.opts.submitOrderUrl : this.opts.url;

		const url = new URL(path, baseUrl);
		if (opts?.query) {
			for await (const [k, v] of Object.entries(opts.query)) {
				url.searchParams.append(k, v);
			}
		}
		const res = await fetch(url.toString(), {
			body: JSON.stringify(opts?.body),
			method: method,
			headers: this.getHeaders(path, method)
		});

		if (!res.ok) {
			throw new Error(await res.text());
		}

		const resJson = await res.json();

		if (resJson.data) {
			return resJson.data;
		} else {
			return resJson;
		}
	}

	private getHeaders(path: string, method: string) {
		const algo = 'SHA256' as const;
		const timestamp = new Date().toISOString();
		const headers = {
			'x-oneflow-authorization': this.generateToken(method, path, timestamp, algo),
			'x-oneflow-date': timestamp,
			'x-oneflow-algorithm': algo,
			'content-type': 'application/json'
		};
		return headers;
	}

	private generateToken(method: string, path: string, timestamp: string, algorithm: string) {
		const StringToSign = `${method.toUpperCase()} ${decodeURIComponent(path)} ${timestamp}`;
		const hmac = crypto.createHmac(algorithm, this.opts.secret);
		hmac.update(StringToSign);
		const Signature = hmac.digest('hex');
		const localAuthorization = `${this.opts.token}:${Signature}`;
		return localAuthorization;
	}
}
