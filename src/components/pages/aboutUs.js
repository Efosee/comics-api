import { useEffect } from "react";
import "./aboutUs.scss";
const YandexMap = () => {
	
	useEffect(() => {
		const div = document.createElement('div');
		const script = document.createElement('script');
		const span = document.createElement('span');
		script.src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Af84f97e0d043837029cb6b5b630d2afdf8e1eb71830602f051b1323ba8a5d6e1&amp;width=500&amp;height=800&amp;lang=ru_RU&amp;scroll=true";

		span.textContent = "ИЛИ МОЖЕТЕ НАЙТИ НАС НА КАРТЕ:";
		div.append(span, script);
		div.style.cssText = "width: 95vw; height: 70vh; margin: 0 auto; text-align: center";
		div.classList.add("yandexmap");
		document.querySelector('#root').append(div);

		return () => {
			div.remove();
		}
	}, [])

	return(
		<div className="contacts">
			<ul>
				<li>Телефон: <a href="tel:+79451234875">+7(945)123-48-75</a></li>
				<li>Email: <a href="mailto:ruscomics@yandex.ru">ruscomics@yandex.ru</a></li>
				<li>Адрес: <span>г. Москва, 2-ой Вышеславце переулок, дом 17</span></li>
			</ul>
			<div className="yandexmap"></div>
		</div>
	)
}

export default YandexMap;