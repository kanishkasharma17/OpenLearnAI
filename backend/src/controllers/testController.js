const {
    getNextCourse
} = require("../services/curriculumService");

const test = async (req, res) => {

    const course =
        await getNextCourse(req.user.id);

    res.json(course);

};

module.exports = {
    test
};