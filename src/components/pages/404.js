import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
	return(
		<div>
			<ErrorMessage/>
			<p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Такой страницы не существует</p>
			<Link to="/" style={{
				'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px',
				'color': '#9f0013'
			}}>На главную страницу</Link>
		</div>
	)
}

export default Page404;