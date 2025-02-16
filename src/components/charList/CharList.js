import './charList.scss';

import PropTypes from 'prop-types';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

	marvelService = new MarvelService("ca6ebcdf506dab97c2c0256b367848c4", "f0655c29263c9aa0b053af7c9598228819172c1b");

	state = {
		listOfChars: [],
		error: false,
		loading: true,
		newItemLoading: false,
		offset: 1500,
		charEnded: false
	}
	componentDidMount() {
		this.onRequest();
	}

	onCharListLoading = () => {
		this.setState({
			newItemLoading: true
		})
	}
	onRequest = (offset) => {
		this.onCharListLoading();
		this.marvelService.getAllCharacters(9, offset)
			.then(this.onCharListLoaded)
			.catch(this.onError)
	}
	onCharListLoaded = (newListOfChars) => {
		let ended = false;
		if (newListOfChars.length < 9){
			ended = true;
		}
		this.setState(({listOfChars, offset}) => ({
			listOfChars: [...listOfChars, ...newListOfChars],
			loading: false,
			error: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended
		}))
	}
	onError = () => {
		this.setState({
			error: true,
			loading: false
		})
	}
	checkImage = (thumbnail, name) => {
		if (thumbnail.includes("image_not_available")) {
			return (<img src={thumbnail} alt={name} className="randomchar__img"
				style={{ objectFit: "contain" }} />);
		} else {
			return <img src={thumbnail} alt={name} className="randomchar__img" />
		}
	}

	renderList = (listOfChars) => {
		const items = listOfChars.map(({ thumbnail, name, id }) => {
			const img = this.checkImage(thumbnail, name);
			return (
				<li key={id} 
				className="char__item"
				onClick={() => this.props.onCharSelected(id)}>
					{/* <img src={thumbnail} alt={name} /> */}
					{img}
					<div className="char__name">{name}</div>
				</li>
			);
		});

		return (
			<ul className="char__grid">
				{items}
			</ul>
		);
	}

	render() {
		const { listOfChars, error, loading, offset, newItemLoading, charEnded } = this.state
		const list = this.renderList(listOfChars);
		const errorMessage = error ? <ErrorMessage /> : null;
		const spinner = loading ? <Spinner /> : null;
		const items = !(loading || error) ? list : null;
		return (
			<div className="char__list">
				{errorMessage}
				{spinner}
				{items}
				<button className="button button__main button__long"
				style={{'display': charEnded ? 'none' : 'block'}}
				disabled={newItemLoading}
				onClick={() => this.onRequest(offset)}>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired
}
export default CharList;