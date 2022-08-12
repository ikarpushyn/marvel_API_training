import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
	const [char, setChar] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const marvelService = new MarvelService();

	// componentDidMount() {
	// 	this.updateChar();
	// }

	// componentDidUpdate(prevProps) {
	// 	if (this.props.charId !== prevProps.charId) this.updateChar();
	// }

	useEffect(() => {
		updateChar();
	}, [props.charId]);

	const updateChar = () => {
		const { charId } = props;
		if (!charId) {
			return;
		}

		onCharLoadeding();

		marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
	};

	const onError = () => {
		setLoading((loading) => false);
		setError((error) => true);
	};

	const onCharLoaded = (char) => {
		setChar(char);
		setLoading((loading) => false);
	};

	const onCharLoadeding = () => {
		setLoading((loading) => true);
	};

	const skeleton = char || loading || error ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;

	let imgStyle = { objectFit: 'cover' };
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { objectFit: 'contain' };
	}

	// if (comics.lenght > 5) {
	// 	comics.lenght = 5;
	// }

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">{description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : 'No comics with this character'}
				{
					comics.map((item, i) => {
						if (i > 9) return;

						return (
							<li key={i} className="char__comics-item">
								{item.name}
							</li>
						);
					})
					/* .slice(0, 9) */
				}
			</ul>
		</>
	);
};

CharInfo.propTypes = {
	charId: PropTypes.number,
};

export default CharInfo;
