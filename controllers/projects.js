import express from "express";
import mongoose from "mongoose";

import UserModal from "../models/user.js";
import Project from "../models/project.js";

const router = express.Router();

export const getProjects = async (req, res) => { 

	try {
		
		const { id } = req.body;
		const user = await UserModal.findById(id);
		if (!user) return res.status(401).send({ message: "Invalid user id." });

		const projectsInfo = new Array();

		for (let i = 0; i < user.projects.length; i++)
		{
			const project = await Project.findById(user.projects[i]);
			if (!project) continue;
			projectsInfo.push({ pid: project._id, title: project.title });
		}

		return res.status(200).send({ projects: projectsInfo });

	} catch (error) {
		
		console.log(error);
		return res.status(500).send({ message: error.message });
	}
}

export const getProject = async (req, res) => { 

	try {

		const { pid } = req.body;
		const project = await Project.findById(pid);
		if (!project) return res.status(401).send({ message: "Invalid project id." });

		return res.status(200).json(project);
	
	} catch (error) {
		
		console.log(error);
		return res.status(500).send({ message: error.message });
	}
}

export const searchProjects = async (req, res) => {

	try {
		
		const { id, title, key, mode } = req.body;
		const criteria = { title, key, mode };

		const user = await UserModal.findById(id);
		if (!user) return res.status(401).send({ message: "Invalid user id." });
		const projects = new Array();

		for (let i = 0; i < user.projects.length; i++)
		{
			const project = await Project.findById(user.projects[i]);
			if (!project) continue;

			for (let x in criteria)
			{
				var addToList = true;
				let criterianRegex = new RegExp(criteria[x], "gi");
				if (!criterianRegex.test(project[x]))
				{
					addToList = false;
					break;
				}
			}

			if (addToList) projects.push({ pid: project._id, title: project.title });
		}
		
		return res.status(200).send({ projects: projects });

	} catch (error) {
		
		console.log(error);
		return res.status(500).send({ message: error.message });
	}
}

export const createProject = async (req, res) => {

	try {

		const { id, title, key, mode, loops } = req.body;
		const project = { title, key, mode, loops };

		const user = await UserModal.findById(id);
		if (!user) return res.status(401).send({ message: "Invalid user id." });

		const newProject = new Project({ ...project });
		await newProject.save();
		
		user.projects.push(newProject._id);
		await user.save();
		
		return res.status(200).json(newProject);

	} catch (error) {

		console.log(error);
		return res.status(500).send({ message: error.message });
	}
}

export const updateProject = async (req, res) => {

	try {

		const project = req.body;

		if (!mongoose.Types.ObjectId.isValid(project.pid)) return res.status(403).send({ message: `Project id: ${project.pid} is not valid.` });
		await Project.findByIdAndUpdate(project.pid, { ...project, lastUpdate: new Date().toISOString() }, { new: true });

		return res.status(200).send({ message: "Project updated successfully." });

	} catch (error) {

		console.log(error);
		return res.status(500).send({ message: error.message });
	}
}

export const deleteProject = async (req, res) => {

	try {
		
		const { id, pid } = req.body;

		if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(403).send({ messge: `Project id: ${pid} is not valid.` });
		await Project.findByIdAndRemove(pid);

		const user = await UserModal.findById(id);
		if (!user) return res.status(401).send({ message: "Invalid user id." });

		const index = user.projects.indexOf(mongoose.Types.ObjectId(pid));
		if (index > -1) user.projects.splice(index, 1);
		await user.save();

		return res.status(200).send({ message: "Project deleted successfully." });
	
	} catch (error) {
		
		console.log(error);
		return res.status(500).send({ message: error.message });
	}
}

export default router;