import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage } from "../pages";


const App = () => {

	return (
		<Router basename="/marvel">
			<div className="app">
				<AppHeader />
				<main>
					<Switch>
						<Route exact path="/">
							<MainPage />
						</Route>
						<Route path="/comics">
							<ComicsPage />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	)
}

export default App;