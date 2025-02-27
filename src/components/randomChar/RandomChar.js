import { Component, useEffect, useState } from 'react';
import './randomChar.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';

const RandomChar = () => {
	useEffect(() => {
		updateChar();
	});

	const [char, setChar] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);


	const marvelService = new MarvelService();

	const onCharLoaded = (char) => {
		setChar(char);
		setLoading(false);
	}

	const onError = () => {
		setLoading(false);
		setError(true);
	}
	const updateChar = () => {
		const max = 1011400,
			min = 1011000;
		const id = Math.floor(Math.random() * (max - min + 1) + min)
		marvelService
			.getCharacter(id)
			.then(onCharLoaded)
			.catch(onError)
	}

	const onUpdateChar = () => {
		setLoading(true);
		setError(false);
		updateChar();
	}
	// const { char, loading, error } = this.state;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? <View char={char} /> : null
	return (
		<div className="randomchar">
			{/* {loading ? <Spinner /> : error ? <ErrorMessage/> : <View char={char} />} */}
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">
					Or choose another one
				</p>
				<button onClick={onUpdateChar} className="button button__main">
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;


	const checkImage = (thumbnail) => {
		if (thumbnail.includes("image_not_available")) {
			return (<img src={thumbnail} alt="Random character" className="randomchar__img"
				style={{ objectFit: "contain" }} />);
		} else {
			return <img src={thumbnail} alt="Random character" className="randomchar__img" />
		}
	}

	return (
		<div className="randomchar__block">
			{checkImage(thumbnail)}
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