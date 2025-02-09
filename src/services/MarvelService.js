import md5 from "md5";

class MarvelService{
	constructor(publicKey, privateKey){
		this.publicKey = publicKey;
		this.privateKey = privateKey;
	}
	createMd5() {
		const ts = 1 //Date.now();
		const hash = md5(ts + this.privateKey + this.publicKey);
		const apiUrl = `https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${this.publicKey}&hash=${hash}`
		console.log(apiUrl)
	}
	
}
export default MarvelService