import { useState, useEffect } from "react";import api from "../../assets/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

function FeedbackChart() {
	const [data, setData] = useState([]);

	const fetchFeedback = async () => {
		try {
			const response = await api.get(`/api/feedbacks/`);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching feedbacks:", error);
			setData([]);
		}
	};

	useEffect(() => {
		fetchFeedback();
	}, []);

	return (
		<>
			<div className="space-y-6 pt-4">
				<div
					className="text-right flex justify-end items-center space-x-1 text-blue-600 hover:underline cursor-pointer"
					onClick={fetchFeedback}>
					<RefreshIcon fontSize="small" />
					<p>Refresh</p>
				</div>

				{data.length > 0 ? (
					data.map((item, index) => (
						<div
							key={index}
							className="bg-gray-200 rounded-lg p-8 text-left">
							<p className="font-bold uppercase">{item.name}</p>
							<p className="text-xl font-light italic text-gray-700">"{item.feedback}"</p>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 italic">No feedbacks found.</p>
				)}
			</div>
		</>
	);
}

export default FeedbackChart;
