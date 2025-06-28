import { useState, useEffect } from "react";import Chart from "react-apexcharts";
import api from "../../assets/api";

function PwdCharts() {
	const [, setData] = useState([]);
	const [ageSeries, setAgeSeries] = useState([]);
	const [genderSeries, setGenderSeries] = useState([]);
	const [ageLabels, setAgeLabels] = useState([]);

	useEffect(() => {
		const fetchPwds = async () => {
			try {
				const response = await api.get(`/api/pwds/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const ageMap = {};
				const genderAgeMap = {};

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (!isNaN(age)) {
						ageMap[age] = (ageMap[age] || 0) + 1;

						if (!genderAgeMap[age]) {
							genderAgeMap[age] = { Male: 0, Female: 0 };
						}
						if (gender === "Male" || gender === "Female") {
							genderAgeMap[age][gender]++;
						}
					}
				});

				const sortedAges = Object.keys(ageMap)
					.map(Number)
					.sort((a, b) => a - b);

				setAgeLabels(sortedAges.map(String)); // for x-axis categories

				setAgeSeries([
					{
						name: "Total PWDs",
						data: sortedAges.map((age) => ageMap[age]),
					},
				]);

				setGenderSeries([
					{
						name: "Male",
						data: sortedAges.map((age) => genderAgeMap[age]?.Male || 0),
					},
					{
						name: "Female",
						data: sortedAges.map((age) => genderAgeMap[age]?.Female || 0),
					},
				]);
			} catch (error) {
				console.error("Error fetching data:", error);
				setData([]);
				setAgeSeries([]);
				setGenderSeries([]);
				setAgeLabels([]);
			}
		};

		fetchPwds();
	}, []);

	const baseLineOptions = (title) => ({
		chart: {
			height: 350,
			type: "line",
			zoom: { enabled: false },
			toolbar: {
				show: true,
				tools: {
					download: true,
					selection: false,
					zoomin: false,
					zoomout: false,
					pan: false,
					reset: false,
				},
				export: {
					csv: { filename: title.replace(/\s+/g, "_") },
					svg: { filename: title.replace(/\s+/g, "_") },
					png: { filename: title.replace(/\s+/g, "_") },
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: "straight",
		},
		grid: {
			row: {
				colors: ["#f3f3f3", "transparent"],
				opacity: 0.5,
			},
		},
		xaxis: {
			categories: ageLabels,
			title: { text: "Age" },
		},
		yaxis: {
			title: { text: "PWD Count" },
		},
		title: {
			text: title,
			align: "left",
		},
	});

	return (
		<>
			<div className="pt-4 min-h-[400px]">
				<Chart
					options={baseLineOptions("PWD Count per Age")}
					series={ageSeries}
					type="line"
					height={390}
				/>
			</div>

			<div className="min-h-[400px] mt-16">
				<Chart
					options={baseLineOptions("PWD Gender per Age")}
					series={genderSeries}
					type="line"
					height={390}
				/>
			</div>
		</>
	);
}

export default PwdCharts;
