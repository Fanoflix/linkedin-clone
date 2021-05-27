import fs from 'fs';
import path from 'path';

import User from '../models/user.js';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// GET ALL USERS
export let getUsers = async (req, res, next) => {
  const users = await User.find({});
  res.json({
    users,
  });
};

// Connect a user
export let connect = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.userId);
    const toConnect = await User.findById(req.body.connectId);

    if (!currentUser || !toConnect) {
      const error = new Error(
        'Unexpeted Error Encountered, User was not found!'
      );
      error.statusCode = 404;
      throw error;
    }

    currentUser.connections.push(toConnect._id);
    toConnect.connections.push(currentUser._id);

    await currentUser.save();
    await toConnect.save();

    res.status(200).json({
      message: 'Connections established',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let getConnections = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      'connections',
      'name'
    );

    if (!user) {
      const error = new Error(
        'Unexpeted Error Encountered, User was not found!'
      );
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      user: user,
      connections: user.connections,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let getUserFromId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      const error = new Error(
        'Unexpeted Error Encountered, User was not found!'
      );
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      user: user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let addBio = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const bio = req.body.bio;

    if (!user) {
      const error = new Error(
        'Unexpeted Error Encountered, User was not found!'
      );
      error.statusCode = 404;
      throw error;
    }

    user.bio = bio;
    await user.save();
    res.status(200).json({
      message: 'Successfully updated bio',
      bio: user.bio,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let getBio = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error(
        'Unexpeted Error Encountered, User was not found!'
      );
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      bio: user.bio,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let resetSkills = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error(
        'Unexpeted Error Encountered, User was not found!'
      );
      error.statusCode = 404;
      throw error;
    }

    user.skills = [];
    await user.save();

    res.status(200).json({
      message: 'All skills have been reset.',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let addSkill = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const skill = {
      name: req.body.name,
      endoresements: req.body.endoresements,
    };

    if (!user) {
      const error = new Error(
        'Unexpeted Error Encountered, User was not found!'
      );
      error.statusCode = 404;
      throw error;
    }

    if (user.skills !== []) {
      for (let item of user.skills) {
        if (skill.name === item.name) {
          const error = new Error('Skill already exists!');
          error.statusCode = 409;
          throw error;
        }
      }
    }
    user.skills.push(skill);
    await user.save();
    res.status(200).json({
      message: 'Successfully added skill',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let getSkills = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.profileId);

    if (!user) {
      const error = new Error(
        'Unexpeted Error Encountered, User was not found!'
      );
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      skills: user.skills,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let endorseSkill = async (req, res, next) => {
  try {
    const targetUser = await User.findById(req.body.userId);
    const skillId = req.body.skillId;

    if (!targetUser) {
      const error = new Error(
        'Unexpeted Error Encountered, User was not found!'
      );
      error.statusCode = 404;
      throw error;
    }

    if (targetUser.skills !== []) {
      for (let item of targetUser.skills) {
        if (skillId == item._id) {
          item.endorsements += 1;
        }
      }
    } else {
      const error = new Error('Unexpected Error: skill not found.');
      error.statusCode = 404;
      throw error;
    }

    await targetUser.save();
    res.status(200).json({
      message: 'Successfully endorsed skill',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let uploadResume = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('No document provided.');
    error.statusCode = 422;
    throw error;
  }
  try {
  const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }

    user.resumeUrl = req.file.path;
    const result = await user.save();

    res.status(201).json({ message: 'Resume Uploaded', filename: result.resumeUrl});
  } catch (err) {
    next(err);
  }
};

export let deleteResume = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }

    clearResume(user.resumeUrl);
    user.resumeUrl = null;
    await user.save();

    res.status(200).json({ message: 'Resume Removed' });
  } catch (err) {
    next(err);
  }
};

export let updateResume = async (req, res, next) => {
  if (!req.file) {
    const error = new Error('No document provided.');
    error.statusCode = 422;
    throw error;
  }

  let resumeUrl = req.file.path;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }

    if (resumeUrl !== user.resumeUrl) {
      clearResume(user.resumeUrl);
    }

    user.resumeUrl = resumeUrl;
    await user.save();

    res.status(200).json({ message: 'Resume Updated' });
  } catch (err) {
    next(err);
  }
};

const clearResume = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
