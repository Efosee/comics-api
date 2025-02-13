import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {

	marvelService = new MarvelService("ca6ebcdf506dab97c2c0256b367848c4", "f0655c29263c9aa0b053af7c9598228819172c1b");
	
	state = {
		listOfChars: [],
		error: false,
		loading: true
	}
	componentDidMount(){
		this.char()
	}
	checkImage = (thumbnail, name) => {
		if (thumbnail.includes("image_not_available")){
			return (<img src={thumbnail} alt={name} className="randomchar__img" 
			style={{objectFit: "contain"}}/>);
		} else {
			return <img src={thumbnail} alt={name} className="randomchar__img"/>
		}
	}

	formerList = (listOfChars) => {
		return listOfChars.map(({thumbnail, name}) => {
			const img = this.checkImage(thumbnail, name);
			return (
				<li key={name} className="char__item">
					{/* <img src={thumbnail} alt={name} /> */}
					{img}
					<div className="char__name">{name}</div>
				</li>
			);
		});
	}

	char = () => {
		this.marvelService.getAllCharacters(9)
				.then((listOfChars) => this.setState({listOfChars}))
	}

	render() {
		const list = this.formerList(this.state.listOfChars);
		return (
			<div className="char__list">
				<ul className="char__grid">
					{list}
					{/* <li className="char__item">
						<img src={abyss} alt="abyss" />
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item char__item_selected">
						<img src={abyss} alt="abyss" />
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss" />
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss" />
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss" />
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss" />
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss" />
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss" />
						<div className="char__name">Abyss</div>
					</li>
					<li className="char__item">
						<img src={abyss} alt="abyss" />
						<div className="char__name">Abyss</div>
					</li> */}
				</ul>
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;