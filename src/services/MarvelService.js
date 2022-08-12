class MarvelService {
	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	_apiKey = 'apikey=119ad87e9e5b5bc9529e4438bf9c28de';
	_baseOffset = 210;

	getResource = async (url) => {
		let res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getAllCharacters = async (offset = this._baseOffset) => {
		const res = await this.getResource(
			`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
		);
		
		return res.data.results.map(this._transformCharacter);
	};

	getCharacter = async (id) => {
		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
		return this._transformCharacter(res.data.results[0]);
	};

	_transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: 'There is no description for this character',
			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};
}

export default MarvelService;

// class MarvelService {
// 	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
// 	_apiKey = 'apikey=119ad87e9e5b5bc9529e4438bf9c28de';
// 	_baseOffset = 210;

// 	getResource = async (url) => {
// 		let res = await fetch(url);

// 		if (!res.ok) {
// 			throw new Error(` Could not fetch ${url}, status ${res.status}`);
// 		}

// 		return await res.json();
// 	};

// 	getAllCharacters = async (offset = this._baseOffset) => {
// 		const res = await this.getResource(
// 			`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
// 		);

// 		console.log('res', res)
// 		return res.data.results.map((el) => {
// 			return this._transformCharacter(el)}
// 		);
// 	};

// 	getCharacter = async (id) => {
// 		const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
// 		return this._transformCharacter(res.data.results[0]);
// 	};

// 	_transformCharacter = (char) => {
// 		console.log('char', char)
// 		return {
// 			id: char.id,
// 			name: char.name,
// 			description: char.description
// 				? `${char.description.slice(0, 210)}...`
// 				: 'There is no description for this character',
// 			thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
// 			homepage: char.urls[0].url,
// 			wiki: char.urls[1].url,
// 			comics: char.comics.items,
// 		}}
// }

// export default MarvelService;

//_apiKey = 'apikey=119ad87e9e5b5bc9529e4438bf9c28de';
