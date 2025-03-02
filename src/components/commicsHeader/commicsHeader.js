import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';
import './commicsHeader.scss';

function CommicsHeader() {
	return (
		<div className="commics-header">
			<img src={avengers} alt="avengers" className="avengers" />
			<h1 className="commics-header__title">New comics every week!<br/>
				Stay tuned!
			</h1>
			<img src={avengersLogo} alt="avengers logo" className="avengers-logo" />
		</div>
	);
}

export default CommicsHeader;