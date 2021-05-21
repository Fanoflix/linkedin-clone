import User from "../models/user.js";

// GET ALL USERS
export let getUsers = async (req, res, next) => {
    const users = await User.find({})
    res.json({
        users
    })
}