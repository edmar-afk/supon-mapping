import React, { useState } from "react";import { Modal } from "@mui/material";import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddMembers() {
	const [open, setOpen] = useState(false);
	const [households, setHouseholds] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		role: "",
		household: "",
		purok: "",
	});
	const [error, setError] = useState("");

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const handleOpen = () => {
		fetchHouseholds();
		setOpen(true);
	};

	const handleClose = () => {
		setFormData({ name: "", age: "", role: "", household: "", purok: "" });
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
			await api.post("/api/householdmembers/", formData);
			handleClose();
		} catch (err) {
			console.error("Add member failed:", err);
			setError("Failed to add member");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-orange-600 text-white px-4 py-2 rounded">
				Add Member
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
								Add Household Member
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
										htmlFor="age"
										className="block mb-2 text-sm font-medium text-gray-900">
										Age
									</label>
									<input
										type="number"
										name="age"
										id="age"
										value={formData.age}
										onChange={handleChange}
										placeholder="Age"
										required
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5"
									/>
								</div>

								<div>
									<label
										htmlFor="role"
										className="block mb-2 text-sm font-medium text-gray-900">
										Role
									</label>
									<select
										name="role"
										id="role"
										value={formData.role}
										onChange={handleChange}
										required
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5">
										<option
											value=""
											disabled>
											Select Role
										</option>
										<option value="Father">Father</option>
										<option value="Mother">Mother</option>
										<option value="Son">Son</option>
										<option value="Daughter">Daughter</option>
									</select>
								</div>

								<div>
									<label
										htmlFor="household"
										className="block mb-2 text-sm font-medium text-gray-900">
										Household
									</label>
									<select
										name="household"
										id="household"
										value={formData.household}
										onChange={handleChange}
										required
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5">
										<option
											value=""
											disabled>
											Select Household
										</option>
										{households.map((h) => (
											<option
												key={h.id}
												value={h.id}>
												{h.family_name}
											</option>
										))}
									</select>
								</div>

								<div>
									<label
										htmlFor="purok"
										className="block mb-2 text-sm font-medium text-gray-900">
										Purok
									</label>
									<input
										type="text"
										name="purok"
										id="purok"
										value={formData.purok}
										onChange={handleChange}
										placeholder="Purok"
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


export default AddMembers;
