import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddHousehold() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		family_name: "",
		location: "",
	});
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setFormData({ family_name: "", location: "" });
		setError("");
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async () => {
		try {
			const payload = {
				...formData,
				members: [],
			};
			const response = await api.post("/api/households/", payload);
			console.log("Added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add failed:", error);
			setError("Failed to add household");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-orange-600 text-white px-4 py-2 rounded">
				Add Household
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				sx={style}
				BackdropProps={{
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.4)",
					},
				}}>
				<section className="flex flex-col items-center pt-6 z-[999999]">
					<div className="w-[500px] bg-white rounded-lg shadow dark:border xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
								Add Household
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit();
								}}>
								<div>
									<label
										htmlFor="family_name"
										className="block mb-2 text-sm font-medium text-gray-900">
										Family Name
									</label>
									<input
										type="text"
										name="family_name"
										id="family_name"
										value={formData.family_name}
										onChange={handleChange}
										placeholder="Family Name"
										required
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
									/>
								</div>
								<div>
									<label
										htmlFor="location"
										className="block mb-2 text-sm font-medium text-gray-900">
										Location
									</label>
									<input
										type="text"
										name="location"
										id="location"
										value={formData.location}
										onChange={handleChange}
										placeholder="Location"
										required
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
									/>
								</div>
								{error && <p className="text-sm text-red-500 mt-2">{error}</p>}
								<button
									type="submit"
									className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
									Submit
								</button>
							</form>
						</div>
					</div>
				</section>
			</Modal>
		</>
	);
}

export default AddHousehold;
