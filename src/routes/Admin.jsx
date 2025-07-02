import { useState } from "react";import Dashboard from "./Dashboard";
import Pwd from "./Pwd";
import Seniors from "./Seniors";
import Infrastructure from "./Infrastructures";
import Household from "./Household";
import HouseholdMembers from "./HouseholdMembers";
import { Link } from "react-router-dom";

function Admin() {
	const [activeTab, setActiveTab] = useState("dashboard");

	return (
		<>
			<header className="fixed top-0 left-0 w-full z-50 bg-orange-800 text-white shadow-md">
				<div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
					<h1 className="text-lg font-bold">Admin Panel</h1>
					<nav className="flex flex-wrap gap-4 text-sm sm:text-base">
						<button
							onClick={() => setActiveTab("dashboard")}
							className="hover:text-gray-300">
							Dashboard
						</button>
						<button
							onClick={() => setActiveTab("pwd")}
							className="hover:text-gray-300">
							PWD
						</button>
						<button
							onClick={() => setActiveTab("seniors")}
							className="hover:text-gray-300">
							Seniors
						</button>
						<button
							onClick={() => setActiveTab("infras")}
							className="hover:text-gray-300">
							Infrastructure
						</button>
						<button
							onClick={() => setActiveTab("household")}
							className="hover:text-gray-300">
							Household
						</button>
						<button
							onClick={() => setActiveTab("householdMembers")}
							className="hover:text-gray-300">
							Household Members
						</button>
						<Link
							to={"/"}
							className="hover:text-red-300 font-bold">
							Logout
						</Link>
					</nav>
				</div>
			</header>

			<main className="pt-24 px-4 bg-gray-50 min-h-screen">
				{activeTab === "dashboard" && <Dashboard />}
				{activeTab === "pwd" && <Pwd />}
				{activeTab === "seniors" && <Seniors />}
				{activeTab === "infras" && <Infrastructure />}
				{activeTab === "household" && <Household />}
				{activeTab === "householdMembers" && <HouseholdMembers />}
			</main>
		</>
	);
}

export default Admin;
