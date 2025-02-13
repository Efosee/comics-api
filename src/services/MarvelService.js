import md5 from "md5";

class MarvelService {
	constructor(publicKey, privateKey) {
		this.publicKey = publicKey;
		this.privateKey = privateKey;
	}
	_baseUrl = "https://gateway.marvel.com/v1/public/";
	createAPIUrl() {
		const ts = Date.now();
		const hash = md5(ts + this.privateKey + this.publicKey);
		return `ts=${ts}&apikey=${this.publicKey}&hash=${hash}`;
	}
	getResources = async (url) => {
		try {
			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(`Could not fetch ${url}, status: ${res.status}`);
			}

			return await res.json();

		} catch (error) {
			console.error(error);
			
		}

	}

	getApiAllResources = (limit, offset, res = "characters") => {

		limit = limit ? `limit=${limit}&` : "";
		offset = offset ? `offset=${offset}&` : "";

		const url = this._baseUrl + `${res}?${limit}${offset}` + this.createAPIUrl()
		return this.getResources(url);
	}

	getApiResource = (id, res = "characters") => {
		const url = this._baseUrl + `${res}/${id}?` + this.createAPIUrl()
		return this.getResources(url);
	}

	getAllCharacters = async (limit, offset) => {
		const apiResource = "characters";
		const res = await this.getApiAllResources(limit, offset, apiResource);
		return res.data.results.map(this._transformCharacter);
	}
	getCharacter = async (id) => {
		const apiResource = "characters";
		const res = await this.getApiResource(id, apiResource);
		return this._transformCharacter(res.data.results[0]);

	}

	_transformCharacter = (char) => {
		const {name, description, thumbnail, urls} = char;
		return {
			name: name,
			description: description ? `${description.slice(0,210)}...`: "There is no description for this character",
			thumbnail: thumbnail.path + '.' + thumbnail.extension,
			homepage: urls[0].url,
			wiki: urls[1].url
		}
	}

}
export default MarvelService