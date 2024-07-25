import React from "react";

type SponsorElement = {
	name: string;
	link: string;
};

function SponsorBlock(props: SponsorElement) {
	return (
		<a href={props.link} target="_blank" rel="nofollow noreferrer" className="sponsor-banner">
			<div className="sponsor-single-box">
				<img src={"/images/" + props.name + "-logo.png"} alt={props.name + "-banner"} />
			</div>
		</a>
	);
}

const sponsorList: SponsorElement[] = [
	{
		name: "degiro",
		link: "http://bit.ly/DEGIRO_LP",
	},
	{
		name: "xtb",
		link: "https://bit.ly/XTB_Leo",
	},
	{
		name: "ib",
		link: "https://bit.ly/InteractiveBrokers-LeoP",
	},
	{
		name: "trading212",
		link: "https://bit.ly/Trading212_LP",
	},
];

function Sponsor() {
	return (
		<div className="sponsor">
			<div className="sponsor-title">
				<h4>Sponsor del sito web</h4>
			</div>
			<div className="sponsor-div">{sponsorList.map((sponsor) => SponsorBlock(sponsor))}</div>
		</div>
	);
}

export default Sponsor;
