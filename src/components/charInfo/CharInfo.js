import { Component, useState, useEffect } from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
	state = {
		char: null,
		loading: false,
		error: false
	}

	const [char, setChar] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		updateChar()
	}, []);

	useEffect(() => {
		updateChar()
	}, [props.charId])

	const marvelService = new MarvelService();

	const updateChar = () => {
		const { charId } = this.props;
		if (!charId) {
			return
		}

		onCharLoading();

		marvelService
			.getCharacter(charId)
			.then(onCharLoaded)
			.catch(onError);
	}

	const onCharLoaded = (char) => {
		setChar(char);
		setLoading(false);
	}

	const onCharLoading = () => {
		setLoading(true);
		setError(false);
	}
	const onError = () => {
		setLoading(false);
		setError(true);
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
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : "There is no comics with this character"}
				{comics.map((item, i) => {
					return (
						<li key={i} className="char__comics-item">
							{item.name}
						</li>
					)
				}).slice(0, 10)}
				{/* <li className="char__comics-item">
					All-Winners Squad: Band of Heroes (2011) #3
				</li>
				<li className="char__comics-item">
					Alpha Flight (1983) #50
				</li>
				<li className="char__comics-item">
					Amazing Spider-Man (1999) #503
				</li>
				<li className="char__comics-item">
					Amazing Spider-Man (1999) #504
				</li>
				<li className="char__comics-item">
					AMAZING SPIDER-MAN VOL. 7: BOOK OF EZEKIEL TPB (Trade Paperback)
				</li>
				<li className="char__comics-item">
					Amazing-Spider-Man: Worldwide Vol. 8 (Trade Paperback)
				</li>
				<li className="char__comics-item">
					Asgardians Of The Galaxy Vol. 2: War Of The Realms (Trade Paperback)
				</li>
				<li className="char__comics-item">
					Vengeance (2011) #4
				</li>
				<li className="char__comics-item">
					Avengers (1963) #1
				</li>
				<li className="char__comics-item">
					Avengers (1996) #1
				</li> */}
			</ul>
		</>
	);
}

export default CharInfo;