export function addTextToBody(text) {
    const div = document.createElement('div');
    div.textContent = text;
    document.body.appendChild(div);

	(async function () {
		let response = await fetch('test.json');
		let json = await response.json();

		const div = document.createElement('div');
		div.textContent = json.text;
		document.body.appendChild(div)
	})();
}
