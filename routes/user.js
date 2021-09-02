import express from "express";

import {
	signin,
	signup,
	resetPassword,
	changePassword,
	verifyEmail,
	resendVerificationEmail,
	shutdownAccount
} from "../controllers/user.js";

import {
	getProjects,
	getProject,
	searchProjects,
	createProject,
	updateProject,
	deleteProject
} from "../controllers/projects.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/reset-password", resetPassword);
router.patch("/change-password", changePassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/shutdown-account", shutdownAccount);

router.post("/get-projects", getProjects);
router.post("/get-project", getProject);
router.post("/search-projects", searchProjects);
router.post("/new-project", createProject);
router.patch("/update-project", updateProject);
router.post("/delete-project", deleteProject);

export default router;