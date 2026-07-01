const {
    getNextCourse
} = require("../services/curriculumService");

const test = async (req, res,next) => {

    const course =
        await getNextCourse(req.user.id);

    res.json(course);

};

module.exports = {
    test
};