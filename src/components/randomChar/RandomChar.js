import { Component } from 'react';
import './randomChar.scss';
import Spinner from "../spinner/Spinner";
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

class RandomChar extends Component {
	constructor(props) {
		super(props);
		this.updateChar();
	}
	state = {
		char: {},
		loading: true
	}

	marvelService = new MarvelService("ca6ebcdf506dab97c2c0256b367848c4", "f0655c29263c9aa0b053af7c9598228819172c1b");

	onCharLoaded = (char) => {
		this.setState({ char: char, loading: false });
	}
	updateChar = () => {
		const max = 1011400,
			min = 1011000;
		const id = Math.floor(Math.random() * (max - min + 1) + min)
		this.marvelService
			.getCharacter(id)
			.then(res => {
				// console.log(res);
				if (res) {
					//this.setState({char: res});
					// setTimeout(() => console.log(this.state), 0);
					this.onCharLoaded(res)
				}
			});
	}
	render() {
		const { char, loading } = this.state;
		return (
			<div className="randomchar">
				{loading ? <Spinner /> : <View char={char} />}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;

	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);


}
export default RandomChar;