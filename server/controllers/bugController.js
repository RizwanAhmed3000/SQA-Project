import Bug from "../models/Bug.js";

export const createBug = async (req, res) => {
  try {
    const bug = new Bug({ ...req.body, createdBy: req.userId });
    await bug.save();
    res.status(201).json([]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().populate("createdBy", "name");

    res.json(bugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBug = async (req, res) => {
  try {
    const { id } = req.params;
    const bug = await Bug.findById(id)
      .populate("createdBy", "name")
      .populate("comments.commentedBy", "name");
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json(bug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const updateBug = async (req, res) => {

//   try {
//     const bug = await Bug.findOneAndUpdate({ _id: req.params.id }, req.body, {
//       new: true,
//     });
//     if (!bug) return res.status(404).json({ message: "Bug not found" });
//     res.json(bug);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
        updatedAt: new Date(),
      },
      { new: true }
    );
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json(bug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findOneAndDelete({
      _id: req.params.id,
    });
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json({ message: "Bug deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const commentOnBug = async (req, res) => {
  try {
    const { id } = req.params;
    const { commentText } = req.body; // Ensure commentText is destructured correctly.

    // console.log("Bug ID:", id);
    // console.log("Comment Text:", commentText);

    if (!commentText) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const bug = await Bug.findById(id);
    if (!bug) return res.status(404).json({ message: "Bug not found" });

    const comment = {
      commentText, // Use the correct field name.
      commentedBy: req.userId,
    };

    bug.comments.push(comment);
    await bug.save();

    res.status(201).json({ message: "Comment added successfully", comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
