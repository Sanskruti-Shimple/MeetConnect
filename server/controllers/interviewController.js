import Interview from "../models/Interview.js";

export const createInterview = async (req, res) => {
  try {
    const interview = await Interview.create({
      ...req.body,
      user: req.user.id,
    });
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user.id,
    });
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interview.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );
    
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    
    res.json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};