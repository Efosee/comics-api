import md5 from "md5";
import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
	const {loading, request, error} = useHttp();
	const _baseUrl = "https://gateway.marvel.com/v1/public/";
	const _PUBLICKEY = "ca6ebcdf506dab97c2c0256b367848c4";
	const _PRIVATEKEY = "f0655c29263c9aa0b053af7c9598228819172c1b";


	function createAPIUrl() {
		const ts = Date.now();
		const hash = md5(ts + _PRIVATEKEY + _PUBLICKEY);
		return `ts=${ts}&apikey=${_PUBLICKEY}&hash=${hash}`;
	}
	// getResources = async (url) => {
	// 	try {
	// 		const res = await fetch(url);

	// 		if (!res.ok) {
	// 			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	// 		}

	// 		return await res.json();

	// 	} catch (error) {
	// 		console.error(error);

	// 	}

	// }

	const getApiAllResources = (limit, offset, res = "characters") => {

		limit = limit ? `limit=${limit}&` : "";
		offset = offset ? `offset=${offset}&` : "";

		const url = _baseUrl + `${res}?${limit}${offset}` + createAPIUrl()
		return request(url);
	}

	const getApiResource = (id, res = "characters") => {
		const url = _baseUrl + `${res}/${id}?` + createAPIUrl()
		return request(url);
	}

	const getAllCharacters = async (limit, offset) => {
		const apiResource = "characters";
		const res = await getApiAllResources(limit, offset, apiResource);
		return res.data.results.map(_transformCharacter);
	}
	const getCharacter = async (id) => {
		const apiResource = "characters";
		const res = await getApiResource(id, apiResource);
		return _transformCharacter(res.data.results[0]);

	}

	const _transformCharacter = (char) => {
		const { name, description, thumbnail, urls, id, comics } = char;
		return {
			id: id,
			name: name,
			description: description ? `${description.slice(0, 210)}...` : "There is no description for this character",
			thumbnail: thumbnail.path + '.' + thumbnail.extension,
			homepage: urls[0].url,
			wiki: urls[1].url,
			comics: comics.items
		}
	}

	return {getCharacter, getAllCharacters, loading, error}
}
export default useMarvelService;