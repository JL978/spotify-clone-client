import React, { useContext } from "react";
import Icon from "../icons";
import msTimeFormat from "../../utilities/utils";
import { PlayContext } from "../../utilities/context";

const TrackListItem = React.forwardRef(
	({ track, styleName, highlight, playContextTrack }, ref) => {
		const { album, artists, name, explicit, duration_ms, uri } = track;
		const updatePlayer = useContext(PlayContext);

		let thumbNail;
		if (styleName === "simplify" && album.images.length > 0) {
			thumbNail = album.images[album.images.length - 1].url;
		}
		const formattedTime = msTimeFormat(duration_ms);
		return (
			<li
				ref={ref}
				className={`trackListItem ${highlight ? "highlight" : null}`}
			>
				<div
					className="trackItemPlay"
					style={styleName === "simplify" ? simplyStyle : null}
				>
					<button
						className={
							styleName === "simplify"
								? "hoverIcon no-outline"
								: "hoverIcon trackTopAlign no-outline"
						}
						onClick={() => {
							playContextTrack(uri);
							updatePlayer();
						}}
					>
						<Icon name="Play" height="20" width="20" />
					</button>
					<div
						className={
							styleName === "simplify" ? "itemIcon" : "itemIcon trackTopAlign"
						}
						style={{ marginTop: styleName === "simplify" ? "0" : null }}
					>
						<Icon name="Music" />
					</div>
				</div>

				{styleName === "simplify" && (
					<div className="trackMidAlign">
						<div className="trackItemThumb">
							{thumbNail ? (
								<img
									loading="lazy"
									src={thumbNail}
									style={{ width: "100%", height: "100%" }}
									alt=""
								/>
							) : (
								<div
									style={{
										position: "absolute",
										top: "35%",
										bottom: "35%",
										left: "35%",
										right: "35%",
									}}
								>
									<Icon name="Music2" />
								</div>
							)}
						</div>
					</div>
				)}

				<div className="trackItemInfo">
					<div
						className={
							styleName === "simplify" ? "trackMidAlign" : "trackTopAlign"
						}
					>
						<div className="trackName ellipsis-one-line">{name}</div>

						{styleName !== "simplify" && (
							<div className="trackInfo">
								<span
									className="explicit-label"
									style={explicit ? { display: "flex" } : { display: "none" }}
								>
									E
								</span>
								<span className="trackArtists ellipsis-one-line">
									{artists.map((artist) => (
										<a href={`/artist/${artist.id}`} key={artist.id}>
											{artist.name}
										</a>
									))}
								</span>
								{album && (
									<>
										<span className="trackInfoSep">•</span>
										<span className="trackAlbum ellipsis-one-line">
											<a href={`/ablum/${album.id}`}>{album.name}</a>
										</span>
									</>
								)}
							</div>
						)}
					</div>
				</div>

				<div className="trackItemDuration">
					<div
						className={`duration ${
							styleName === "simplify" ? "trackMidAlign" : "trackTopAlign"
						}`}
					>
						<span>{formattedTime}</span>
					</div>
				</div>
			</li>
		);
	}
);

const simplyStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
};

export default TrackListItem;
