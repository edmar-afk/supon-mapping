import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "admin123") {
			setError("");
			navigate("/admin");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<div className="h-screen w-screen flex justify-center items-center font-[Poppins]">
			<div className="grid gap-8">
				<div className="bg-gradient-to-r from-orange-500 to-purple-500 rounded-[26px] m-4">
					<div className="border-[20px] border-transparent rounded-[20px] bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
						<h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center">Log in</h1>
						<form
							onSubmit={handleLogin}
							className="space-y-4">
							<div>
								<label
									htmlFor="email"
									className="mb-2 dark:text-gray-400 text-lg">
									Email
								</label>
								<input
									id="email"
									type="text"
									placeholder="Email"
									className="border p-3 dark:bg-orange-700 dark:text-gray-300 dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 duration-300 border-gray-300 rounded-lg w-full"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="mb-2 dark:text-gray-400 text-lg">
									Password
								</label>
								<input
									id="password"
									type="password"
									placeholder="Password"
									className="border p-3 shadow-md dark:bg-orange-700 dark:text-gray-300 dark:border-gray-700 placeholder:text-base focus:scale-105 duration-300 border-gray-300 rounded-lg w-full"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>

							{error && <p className="text-red-500 text-sm mt-1">{error}</p>}

							<button
								type="submit"
								className="bg-gradient-to-r dark:text-gray-300 from-orange-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-orange-500 transition duration-300 ease-in-out">
								LOG IN
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
