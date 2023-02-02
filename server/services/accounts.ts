// import koaSession from 'koa-session';

import User from '../models/user';

const registerUser = async (userData: {
    username: string;
    email: string;
    password: string;
}) => {
    // Check if username and email (must be unique values) are not in use
    const usernameOrEmailInUseResult = await User.findOne({
        $or: [{ username: userData.username }, { email: userData.email }],
    });

    if (usernameOrEmailInUseResult !== null) return 'in-use';

    // Generate a user ID, TODO: Check if the id is in use, which would be pretty imposible, but it could crash the app in given case
    const userID = Math.round(Math.random() * 1000000000000);

    // Create the user with the required values, the rest of values are automatically set by the schema
    const user = new User({
        userID: userID,
        createdAt: Date.now(),

        username: userData.username,
        email: {
            value: userData.email,
        },

        password: userData.password,
    });

    await user.save();
    return user;
};

const serviceMethods = {
    registerUser,
};

export default serviceMethods;
