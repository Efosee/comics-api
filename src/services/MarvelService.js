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
				throw new Error(`Could ${res.status}`);
			}

			return await res.json();

		} catch (error){
			console.error(error);
		}

	}

	getApiAllResources = (limit, offset, res="characters") => {

		limit = limit ? `limit=${limit}&` : ""; 
		offset = offset ? `offset=${offset}&` : ""; 

		const url = this._baseUrl + `${res}?${limit}${offset}` + this.createAPIUrl()
		return this.getResources(url);
	}

	getApiResource = (id, res="characters") => {
		const url = this._baseUrl + `${res}/${id}?` + this.createAPIUrl()
		return this.getResources(url);
	}

	getAllCharacters = (limit, offset) => {
		const resources="characters";
		return this.getApiAllResources(limit, offset, resources);
	}
	getCharacter = (id) => {
		const resource = "characters";
		return this.getApiResource(id, resource);
	}

}
export default MarvelService