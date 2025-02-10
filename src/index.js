import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.scss";

import MarvelService from "./services/MarvelService";

const marvelService = new MarvelService("ca6ebcdf506dab97c2c0256b367848c4", "f0655c29263c9aa0b053af7c9598228819172c1b");

marvelService.getAllCharacters(5, 100).then( json => console.log(json))

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
