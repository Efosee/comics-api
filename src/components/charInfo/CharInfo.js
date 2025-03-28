import { useState, useEffect } from 'react';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {

	const [char, setChar] = useState(null);
	const { loading, error, getCharacter, clearError } = useMarvelService();

	useEffect(() => {
		updateChar()
	}, []);

	useEffect(() => {
		updateChar()
	}, [props.charId])


	const updateChar = () => {
		clearError();
		const { charId } = props;
		if (!charId) {
			return
		}
		getCharacter(charId)
			.then(onCharLoaded);
	}

	const onCharLoaded = (char) => {
		setChar(char);
	}


	// const { char, loading, error } = this.state;
	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{skeleton}
			{spinner}
			{errorMessage}
			{content}
		</div>
	)
}


const View = ({ char }) => {
	const { thumbnail, name, homepage, wiki, description, comics } = char;

	const checkImage = (thumbnail, name) => {
		if (thumbnail.includes("image_not_available")) {
			return (<img src={thumbnail} alt={name} className="randomchar__img"
				style={{ objectFit: "contain" }} />);
		} else {
			return <img src={thumbnail} alt={name} className="randomchar__img" />
		}
	}

	return (
		<>
			<div className="char__basics">
				{checkImage(thumbnail, name)}
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Комиксы:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : "There is no comics with this character"}
				{comics.map((item, i) => {
					return (
						<li key={i} className="char__comics-item">
							{item.name}
						</li>
					)
				}).slice(0, 10)}
			</ul>
		</>
	);
}

export default CharInfo;