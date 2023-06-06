import myModels from '../models/users.js'

const addUser = async (req, res) => {
    const myRes = await myModels.insrtUser(req.body);
    if (myRes === 409) {
        res.status(409);
    } else {
        res.status(200).json(myRes);
    }
    res.end();
}

const returnUser = async (req, res) => {
    const myRes = await myModels.getUserInfo(req.headers.authorization.split(" ")[0], req.headers.authorization.split(" ")[1]);
    if (myRes === 401) {
        res.status(401);
    } else {
        res.status(200).json({ username: myRes.username, displayName: myRes.displayName, profilePic: myRes.profilePic });
    }
    res.end();
}

export { addUser, returnUser };