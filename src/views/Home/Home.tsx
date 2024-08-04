import React from "react";

function Home() {
	const linkData = [
		{ href: "budget-50-30-20", text: "Budget 50/30/20" },
		{ href: "saving-to-goal", text: "Tempo per Target" },
		{ href: "irr", text: "Internal Rate of Return" },
		{ href: "compound-interest", text: "Interesse Composto" },
		{ href: "mortgage", text: "Simulatore Mutuo" },
		{ href: "net-salary", text: "Calcola Stipendio Netto" },
		{ href: "rental", text: "Rendimento da Affitto" },
		{ href: "conversion/length", text: "Convertitore Lunghezza" },
	];
	return (
		<>
			<div className="home-title">
				<h1>Money Manager</h1>
			</div>
			<div className="home-body">
				<div className="home-menu">
					{linkData.map((data) => (
						<a href={data.href} key={"home-" + data.href} className="home-link">
							<h3>{data.text}</h3>
						</a>
					))}
				</div>
				<div className="home-menu">
					<div className="home-welcome">
						<strong>Benvenuto!</strong>
						<br />
						Qui puoi trovare una serie di calcolari per gestire al meglio le tue
						finanze! Seleziona uno dei calcolatori a disposizione.
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
