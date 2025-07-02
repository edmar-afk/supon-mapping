import React, { useState } from "react";import { Modal, Box, Button, Typography, TextField } from "@mui/material";import api from "../assets/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

function FeedBack() {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [feedback, setFeedback] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/api/feedback/submit/", { name, feedback });
			setName("");
			setFeedback("");
			handleClose(); // ✅ close modal first
		} catch (err) {
			handleClose(); // ✅ close modal first
			console.error(err);
		}
	};

	return (
		<>
			<div className="fixed top-4 left-14 z-[99999] flex flex-row items-stretch">
				<button
					onClick={handleOpen}
					className="bg-orange-600 cursor-pointer hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded shadow">
					Send Feedback
				</button>
				<Link to={'/login'} className="bg-orange-600 text-white px-6 py-1.5 ml-4">Login</Link>
			</div>

			<Modal
				open={open}
				onClose={handleClose}>
				<Box sx={style}>
					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth
							label="Your Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							sx={{ mb: 2 }}
						/>
						<TextField
							fullWidth
							label="Your Feedback"
							multiline
							rows={4}
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
							required
						/>
						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 2 }}>
							Submit your Feedback
						</Button>
					</form>
				</Box>
			</Modal>
		</>
	);
}

export default FeedBack;
