import psycopg2
import pandas as pd

connection=psycopg2.connect(
    host="localhost",
    database="openlearn",
    user="postgres",
    password="flashback",
    port="5432"
)

query="""
SELECT

u.id,

u.name,

COUNT(DISTINCT e.course_id) AS courses_enrolled,

COUNT(DISTINCT sp.lesson_id) AS lessons_completed,

COUNT(DISTINCT qa.id) AS quiz_attempts,

COALESCE(AVG(qa.score),0) AS average_quiz_score

FROM users u

LEFT JOIN enrollments e
ON u.id=e.student_id

LEFT JOIN student_progress sp
ON u.id=sp.student_id

LEFT JOIN quiz_attempts qa
ON u.id=qa.student_id

WHERE u.role='student'

GROUP BY u.id,u.name;
"""

real_df=pd.read_sql(query,connection)
print(real_df)
