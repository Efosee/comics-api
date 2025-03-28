import { lazy, Suspense } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const YandexMap = lazy(() => import('../pages/aboutUs'));


const App = () => {

	return (
		<Router basename="/Rus-Comics">
			<div className="app">
				<AppHeader />
				<main>
					<Suspense fallback={<Spinner/>}>
						<Switch>
							<Route exact path="/">
								<MainPage />
							</Route>
							<Route exact path="/comics">
								<ComicsPage />
							</Route>
							<Route exact path="/comics/:comicId">
								<SingleComicPage />
							</Route>
							<Route exact path="/about-us">
								<YandexMap />
							</Route>
							<Route path="*">
								<Page404 />
							</Route>
						</Switch>
					</Suspense>
				</main>
			</div>
		</Router>
	)
}

export default App;