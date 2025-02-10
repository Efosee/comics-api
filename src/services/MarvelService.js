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

	getAllCharacters = (limit, offset) => {
		limit = limit ? `limit=${limit}&` : ""; 
		offset = offset ? `offset=${offset}&` : ""; 
		const url = this._baseUrl + `comics?${limit}${offset}` + this.createAPIUrl()
		return this.getResources(url);
	}
	getCharacter = (id) => {
		const url = this._baseUrl + `comics/${id}?` + this.createAPIUrl()
		return this.getResources(url);
	}

}
export default MarvelService