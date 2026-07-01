const { faker } = require("@faker-js/faker");
const pool = require("../src/config/db");

async function generateQuestions() {

    try {

        const quizzes = await pool.query(`
            SELECT id,title
            FROM quizzes
            ORDER BY id
        `);

        console.log(`Found ${quizzes.rows.length} quizzes`);

        let inserted = 0;

        for (const quiz of quizzes.rows) {

            for (let i = 1; i <= 4; i++) {

                const optionA = faker.word.noun();
                const optionB = faker.word.noun();
                const optionC = faker.word.noun();
                const optionD = faker.word.noun();

                await pool.query(
                    `
                    INSERT INTO questions
                    (
                        quiz_id,
                        question_text,
                        option_a,
                        option_b,
                        option_c,
                        option_d,
                        correct_option
                    )
                    VALUES
                    (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6,
                        'A'
                    )
                    `,
                    [
                        quiz.id,
                        `Question ${i} for ${quiz.title}`,
                        optionA,
                        optionB,
                        optionC,
                        optionD
                    ]
                );

                inserted++;
            }
        }

        console.log(`Inserted ${inserted} questions`);

        process.exit();

    }
    catch (err) {

        console.error(err);

        process.exit(1);

    }

}

generateQuestions();