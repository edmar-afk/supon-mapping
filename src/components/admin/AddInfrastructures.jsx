import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddInfrastructures() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		description: "",
		location: "",
	});
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setFormData({
			name: "",
			type: "",
			description: "",
			location: "",
		});
		setImage(null);
		setError("");
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async () => {
		const infraData = new FormData();
		infraData.append("name", formData.name);
		infraData.append("type", formData.type);
		infraData.append("description", formData.description);
		infraData.append("location", formData.location);
		if (image) {
			infraData.append("image", image);
		}

		try {
			await api.post("/api/infras/create/", infraData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			handleClose();
		} catch (error) {
			console.error("Add infrastructure failed:", error);
			setError("Failed to add infrastructure");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-orange-600 text-white px-4 py-2 rounded">
				Add Infrastructure
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
								Add Infrastructure
							</h1>
							<form
								className="space-y-4 md:space-y-6"
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit();
								}}>
								<div>
									<label
										htmlFor="name"
										className="block mb-2 text-sm font-medium text-gray-900">
										Name
									</label>
									<input
										type="text"
										name="name"
										id="name"
										value={formData.name}
										onChange={handleChange}
										placeholder="Name"
										required
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
									/>
								</div>
								<div>
									<label
										htmlFor="type"
										className="block mb-2 text-sm font-medium text-gray-900">
										Type
									</label>
									<input
										type="text"
										name="type"
										id="type"
										value={formData.type}
										onChange={handleChange}
										placeholder="Type"
										required
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
									/>
								</div>
								<div>
									<label
										htmlFor="description"
										className="block mb-2 text-sm font-medium text-gray-900">
										Description
									</label>
									<textarea
										name="description"
										id="description"
										value={formData.description}
										onChange={handleChange}
										rows="3"
										placeholder="Description"
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
								<div>
									<label
										htmlFor="image"
										className="block mb-2 text-sm font-medium text-gray-900">
										Image
									</label>
									<input
										type="file"
										accept="image/png, image/jpeg, image/jpg"
										onChange={handleImageChange}
										className="block w-full text-sm text-gray-600"
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

export default AddInfrastructures;
