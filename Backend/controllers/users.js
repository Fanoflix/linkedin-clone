import User from "../models/user.js";

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
        "Unexpeted Error Encountered, User was not found!"
      );
      error.statusCode = 404;
      throw error;
    }

    currentUser.connections.push(toConnect._id);
    toConnect.connections.push(currentUser._id);

    await currentUser.save();
    await toConnect.save();

    res.status(200).json({
      message: "Connections established",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export let getConnections = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate(
      "connections",
      "name"
    );

    if (!user) {
      const error = new Error(
        "Unexpeted Error Encountered, User was not found!"
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
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error(
        "Unexpeted Error Encountered, User was not found!"
      );
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      user,
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
        "Unexpeted Error Encountered, User was not found!"
      );
      error.statusCode = 404;
      throw error;
    }

    user.bio = bio;
    await user.save();
    res.status(200).json({
      message: "Successfully updated bio",
    });
  } catch (err) {
    console.log(err);
  }
};

export let getBio = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error(
        "Unexpeted Error Encountered, User was not found!"
      );
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      bio: user.bio
    })
  } catch (err) {
    console.log(err);
    next(err);
  }
};
