import { useEffect, useState } from 'react';
import './randomChar.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';

const RandomChar = () => {

	useEffect(() => {
		updateChar();
	}, []);

	const [char, setChar] = useState({});
	const {loading, error, getCharacter, clearError} = useMarvelService();

	const onCharLoaded = (char) => {
		setChar(char);
	}

	const updateChar = () => {
		clearError();
		const max = 1011400,
			min = 1011000;
		const id = Math.floor(Math.random() * (max - min + 1) + min)
			getCharacter(id)
			.then(onCharLoaded);
	}

	const onUpdateChar = () => {
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
					Случайный персонаж на сегодня!<br />
					Хочешь узнать о нем подробнее?
				</p>
				<p className="randomchar__title">
					Или выбрать другого
				</p>
				<button onClick={onUpdateChar} className="button button__main">
					<div className="inner">Попробуй</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;


	const checkImage = (thumbnail) => {
		if (thumbnail && thumbnail.includes("image_not_available")) {
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