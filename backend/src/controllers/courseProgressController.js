const {
    getCourseStates
} = require("../services/courseProgressService");

const getProgress = async (req, res) => {

    const progress =
        await getCourseStates(req.user.id);

    res.json(progress);

};

module.exports = {
    getProgress
};