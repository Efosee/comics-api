import { createRoot } from "react-dom/client";
import App from "./components/app/App";
import "./style/style.scss";

import MarvelService from "./services/MarvelService";

const marvelService = new MarvelService("1234", "abcd");

marvelService.createMd5()

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
