--
-- PostgreSQL database dump
--

\restrict pyxDax2o8WowzHLzu59yVHbKoc7XgRaE2XLcPOrfUrky5Iq4jbeDLPzAFOvKV76

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: course_prerequisites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_prerequisites (
    course_id integer NOT NULL,
    prerequisite_course_id integer NOT NULL
);


ALTER TABLE public.course_prerequisites OWNER TO postgres;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    teacher_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.courses_id_seq OWNER TO postgres;

--
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- Name: enrollments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollments (
    id integer NOT NULL,
    student_id integer,
    course_id integer,
    enrolled_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.enrollments OWNER TO postgres;

--
-- Name: enrollments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enrollments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enrollments_id_seq OWNER TO postgres;

--
-- Name: enrollments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enrollments_id_seq OWNED BY public.enrollments.id;


--
-- Name: learning_activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.learning_activity (
    id integer NOT NULL,
    student_id integer,
    course_id integer,
    lesson_id integer,
    activity_type character varying(50) NOT NULL,
    duration_minutes integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.learning_activity OWNER TO postgres;

--
-- Name: learning_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.learning_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.learning_activity_id_seq OWNER TO postgres;

--
-- Name: learning_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.learning_activity_id_seq OWNED BY public.learning_activity.id;


--
-- Name: lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons (
    id integer NOT NULL,
    course_id integer,
    title character varying(255) NOT NULL,
    content text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.lessons OWNER TO postgres;

--
-- Name: lessons_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lessons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lessons_id_seq OWNER TO postgres;

--
-- Name: lessons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lessons_id_seq OWNED BY public.lessons.id;


--
-- Name: question_attempts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question_attempts (
    id integer NOT NULL,
    student_id integer,
    quiz_id integer,
    question_id integer,
    selected_option character(1),
    is_correct boolean,
    attempted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.question_attempts OWNER TO postgres;

--
-- Name: question_attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_attempts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_attempts_id_seq OWNER TO postgres;

--
-- Name: question_attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_attempts_id_seq OWNED BY public.question_attempts.id;


--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id integer NOT NULL,
    quiz_id integer,
    question_text text NOT NULL,
    option_a text NOT NULL,
    option_b text NOT NULL,
    option_c text NOT NULL,
    option_d text NOT NULL,
    correct_option character(1) NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO postgres;

--
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- Name: quiz_attempts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_attempts (
    id integer NOT NULL,
    student_id integer,
    quiz_id integer,
    score integer,
    attempted_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total_questions integer,
    correct_answers integer,
    percentage numeric(5,2)
);


ALTER TABLE public.quiz_attempts OWNER TO postgres;

--
-- Name: quiz_attempts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_attempts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_attempts_id_seq OWNER TO postgres;

--
-- Name: quiz_attempts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_attempts_id_seq OWNED BY public.quiz_attempts.id;


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quizzes (
    id integer NOT NULL,
    course_id integer,
    title character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    lesson_id integer
);


ALTER TABLE public.quizzes OWNER TO postgres;

--
-- Name: quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quizzes_id_seq OWNER TO postgres;

--
-- Name: quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quizzes_id_seq OWNED BY public.quizzes.id;


--
-- Name: student_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_preferences (
    student_id integer NOT NULL,
    preferred_domain character varying(100) DEFAULT 'Programming'::character varying,
    preferred_difficulty character varying(20) DEFAULT 'Intermediate'::character varying
);


ALTER TABLE public.student_preferences OWNER TO postgres;

--
-- Name: student_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_progress (
    id integer NOT NULL,
    student_id integer,
    lesson_id integer,
    completed boolean DEFAULT false,
    completed_at timestamp without time zone
);


ALTER TABLE public.student_progress OWNER TO postgres;

--
-- Name: student_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.student_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.student_progress_id_seq OWNER TO postgres;

--
-- Name: student_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.student_progress_id_seq OWNED BY public.student_progress.id;


--
-- Name: student_statistics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_statistics (
    student_id integer NOT NULL,
    completion_rate numeric(5,2) DEFAULT 0,
    average_quiz_score numeric(5,2) DEFAULT 0,
    total_study_time integer DEFAULT 0,
    weekly_sessions integer DEFAULT 0,
    learning_streak integer DEFAULT 0,
    quiz_attempts integer DEFAULT 0,
    lessons_completed integer DEFAULT 0,
    courses_enrolled integer DEFAULT 0,
    engagement_score numeric(5,2) DEFAULT 0,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.student_statistics OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    role character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- Name: enrollments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments ALTER COLUMN id SET DEFAULT nextval('public.enrollments_id_seq'::regclass);


--
-- Name: learning_activity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_activity ALTER COLUMN id SET DEFAULT nextval('public.learning_activity_id_seq'::regclass);


--
-- Name: lessons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons ALTER COLUMN id SET DEFAULT nextval('public.lessons_id_seq'::regclass);


--
-- Name: question_attempts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_attempts ALTER COLUMN id SET DEFAULT nextval('public.question_attempts_id_seq'::regclass);


--
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- Name: quiz_attempts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts ALTER COLUMN id SET DEFAULT nextval('public.quiz_attempts_id_seq'::regclass);


--
-- Name: quizzes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes ALTER COLUMN id SET DEFAULT nextval('public.quizzes_id_seq'::regclass);


--
-- Name: student_progress id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress ALTER COLUMN id SET DEFAULT nextval('public.student_progress_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: course_prerequisites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_prerequisites (course_id, prerequisite_course_id) FROM stdin;
1	2
4	1
9	4
10	9
11	6
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, title, description, teacher_id, created_at) FROM stdin;
1	Data Structures	Complete DSA Course	2	2026-06-15 18:23:11.777449
2	Programming Fundamentals	Learn programming from scratch using C++.	2	2026-06-29 18:17:51.313114
4	Algorithms	Sorting, searching, greedy, dynamic programming and graph algorithms.	2	2026-06-29 18:17:51.313114
5	Database Systems	Learn SQL, normalization, transactions and indexing.	2	2026-06-29 18:17:51.313114
6	Web Development	HTML, CSS, JavaScript, Node.js and Express.	2	2026-06-29 18:17:51.313114
7	Operating Systems	Processes, threads, scheduling and memory management.	2	2026-06-29 18:17:51.313114
8	Computer Networks	OSI model, TCP/IP, routing and switching.	2	2026-06-29 18:17:51.313114
9	Machine Learning	Regression, classification and clustering algorithms.	2	2026-06-29 18:17:51.313114
10	Deep Learning	Neural networks, CNNs, RNNs and transformers.	2	2026-06-29 18:17:51.313114
11	System Design	Scalable backend architecture and distributed systems.	2	2026-06-29 18:17:51.313114
12	Jest Course 1782971243440	\N	9	2026-07-02 11:17:23.44404
13	Integration Testing Course	Course created by integration test	12	2026-07-02 11:36:15.835726
14	Jest Course 1782972375903	\N	11	2026-07-02 11:36:15.906557
15	Integration Testing Course	Course created by integration test	15	2026-07-02 11:36:39.134472
16	Jest Course 1782972399322	\N	16	2026-07-02 11:36:39.330275
17	Integration Testing Course	Course created by integration test	19	2026-07-02 11:42:37.848494
18	Jest Course 1782972758025	\N	20	2026-07-02 11:42:38.028775
19	Integration Testing Course	Course created by integration test	23	2026-07-02 11:45:56.771323
20	Jest Course 1782972956962	\N	24	2026-07-02 11:45:56.967529
21	Jest Course 1782973089480	\N	27	2026-07-02 11:48:09.485516
22	Integration Testing Course	Course created by integration test	28	2026-07-02 11:48:09.507738
23	Integration Testing Course	Course created by integration test	32	2026-07-02 11:56:07.663953
24	Jest Course 1782973567674	\N	31	2026-07-02 11:56:07.680644
\.


--
-- Data for Name: enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollments (id, student_id, course_id, enrolled_at) FROM stdin;
1	1	1	2026-06-16 11:28:46.72507
3	3	1	2026-06-22 16:32:28.515053
4	13	13	2026-07-02 11:36:16.039569
5	17	15	2026-07-02 11:36:39.325932
6	21	17	2026-07-02 11:42:38.040099
7	25	19	2026-07-02 11:45:56.966788
8	29	22	2026-07-02 11:48:09.710758
9	33	23	2026-07-02 11:56:07.863947
\.


--
-- Data for Name: learning_activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.learning_activity (id, student_id, course_id, lesson_id, activity_type, duration_minutes, created_at) FROM stdin;
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons (id, course_id, title, content, created_at) FROM stdin;
1	2	Variables and Data Types	Introduction to variables, integers, floats and strings.	2026-06-29 19:42:57.09574
2	2	Input and Output	Reading input and printing output in C++.	2026-06-29 19:42:57.09574
3	2	Operators	Arithmetic, logical and relational operators.	2026-06-29 19:42:57.09574
4	2	Conditional Statements	if, else and switch statements.	2026-06-29 19:42:57.09574
5	2	Loops	for, while and do while loops.	2026-06-29 19:42:57.09574
6	2	Functions	Function declaration and definition.	2026-06-29 19:42:57.09574
7	2	Arrays	One dimensional arrays.	2026-06-29 19:42:57.09574
8	2	Strings	Working with strings.	2026-06-29 19:42:57.09574
9	2	Pointers	Pointer basics.	2026-06-29 19:42:57.09574
10	2	Mini Project	Build a simple console application.	2026-06-29 19:42:57.09574
11	1	Introduction to Arrays	Understanding contiguous memory allocation and array operations.	2026-06-29 19:42:57.09574
12	1	Searching in Arrays	Linear search and binary search techniques.	2026-06-29 19:42:57.09574
13	1	Linked Lists	Singly and doubly linked lists implementation.	2026-06-29 19:42:57.09574
14	1	Stacks	Stack operations and applications.	2026-06-29 19:42:57.09574
15	1	Queues	Queue, circular queue and deque.	2026-06-29 19:42:57.09574
16	1	Trees	Tree terminology and traversals.	2026-06-29 19:42:57.09574
17	1	Binary Search Trees	Insertion, deletion and searching in BST.	2026-06-29 19:42:57.09574
18	1	Heaps	Min Heap, Max Heap and Priority Queue.	2026-06-29 19:42:57.09574
19	1	Graphs	Graph representation and traversal algorithms.	2026-06-29 19:42:57.09574
20	1	Hash Tables	Hashing concepts and collision handling.	2026-06-29 19:42:57.09574
21	4	Time Complexity	Big O, Big Omega and Big Theta analysis.	2026-06-29 19:42:57.09574
22	4	Sorting Algorithms	Bubble, Selection, Insertion and Merge Sort.	2026-06-29 19:42:57.09574
23	4	Quick Sort	Divide and conquer sorting algorithm.	2026-06-29 19:42:57.09574
24	4	Binary Search	Searching efficiently in sorted arrays.	2026-06-29 19:42:57.09574
25	4	Greedy Algorithms	Greedy strategy and applications.	2026-06-29 19:42:57.09574
26	4	Dynamic Programming	Memoization and tabulation techniques.	2026-06-29 19:42:57.09574
27	4	Backtracking	N Queens, Sudoku and recursion trees.	2026-06-29 19:42:57.09574
28	4	Graph Algorithms	BFS, DFS and shortest paths.	2026-06-29 19:42:57.09574
29	4	Minimum Spanning Tree	Prim and Kruskal algorithms.	2026-06-29 19:42:57.09574
30	4	Advanced Algorithms	Segment Tree, Fenwick Tree and Union Find.	2026-06-29 19:42:57.09574
31	5	Introduction to Databases	Understanding database systems and DBMS.	2026-06-29 19:42:57.09574
32	5	ER Model	Entity Relationship diagrams and modeling.	2026-06-29 19:42:57.09574
33	5	Relational Model	Tables, rows and relationships.	2026-06-29 19:42:57.09574
34	5	SQL Basics	SELECT, INSERT, UPDATE and DELETE queries.	2026-06-29 19:42:57.09574
35	5	Joins	Inner, Left, Right and Full joins.	2026-06-29 19:42:57.09574
36	5	Normalization	1NF, 2NF, 3NF and BCNF.	2026-06-29 19:42:57.09574
37	5	Indexes	Clustered and non-clustered indexes.	2026-06-29 19:42:57.09574
38	5	Transactions	ACID properties and transaction management.	2026-06-29 19:42:57.09574
39	5	Concurrency Control	Locks and isolation levels.	2026-06-29 19:42:57.09574
40	5	Database Design Project	Designing a complete relational database.	2026-06-29 19:42:57.09574
41	6	HTML Basics	Structure of a web page.	2026-06-29 19:42:57.09574
42	6	CSS Fundamentals	Styling web pages.	2026-06-29 19:42:57.09574
43	6	Responsive Design	Media queries and Flexbox.	2026-06-29 19:42:57.09574
44	6	JavaScript Basics	Variables, functions and DOM.	2026-06-29 19:42:57.09574
45	6	ES6 Features	Modern JavaScript syntax.	2026-06-29 19:42:57.09574
46	6	Node.js	Server-side JavaScript.	2026-06-29 19:42:57.09574
47	6	Express.js	Building REST APIs.	2026-06-29 19:42:57.09574
48	6	Authentication	JWT authentication and authorization.	2026-06-29 19:42:57.09574
49	6	MongoDB Integration	Connecting backend with database.	2026-06-29 19:42:57.09574
50	6	Deploying Applications	Deploying full-stack applications.	2026-06-29 19:42:57.09574
51	7	Introduction to Operating Systems	Functions of an OS.	2026-06-29 19:42:57.09574
52	7	Processes	Process lifecycle and PCB.	2026-06-29 19:42:57.09574
53	7	Threads	Multithreading concepts.	2026-06-29 19:42:57.09574
54	7	CPU Scheduling	FCFS, SJF and Round Robin.	2026-06-29 19:42:57.09574
55	7	Deadlocks	Deadlock prevention and avoidance.	2026-06-29 19:42:57.09574
56	7	Memory Management	Paging and segmentation.	2026-06-29 19:42:57.09574
57	7	Virtual Memory	Demand paging and swapping.	2026-06-29 19:42:57.09574
58	7	File Systems	Directory structures and storage.	2026-06-29 19:42:57.09574
59	7	Synchronization	Semaphores and mutexes.	2026-06-29 19:42:57.09574
60	7	Case Studies	Linux and Windows architecture.	2026-06-29 19:42:57.09574
61	8	Introduction to Networking	Computer network basics.	2026-06-29 19:42:57.09574
62	8	OSI Model	Seven-layer architecture.	2026-06-29 19:42:57.09574
63	8	TCP/IP	Internet protocol suite.	2026-06-29 19:42:57.09574
64	8	IP Addressing	IPv4 and IPv6 addressing.	2026-06-29 19:42:57.09574
65	8	Subnetting	Subnet calculations.	2026-06-29 19:42:57.09574
66	8	Routing	Static and dynamic routing.	2026-06-29 19:42:57.09574
67	8	Switching	LAN switching concepts.	2026-06-29 19:42:57.09574
68	8	Transport Layer	TCP and UDP.	2026-06-29 19:42:57.09574
69	8	Application Layer	HTTP, DNS and FTP.	2026-06-29 19:42:57.09574
70	8	Network Security	Firewalls and VPNs.	2026-06-29 19:42:57.09574
71	9	Introduction to Machine Learning	ML overview and applications.	2026-06-29 19:42:57.09574
72	9	Data Preprocessing	Cleaning and preparing datasets.	2026-06-29 19:42:57.09574
73	9	Linear Regression	Regression fundamentals.	2026-06-29 19:42:57.09574
74	9	Logistic Regression	Classification using logistic regression.	2026-06-29 19:42:57.09574
75	9	Decision Trees	Tree-based models.	2026-06-29 19:42:57.09574
76	9	Random Forest	Ensemble learning.	2026-06-29 19:42:57.09574
77	9	Support Vector Machines	Margin-based classification.	2026-06-29 19:42:57.09574
78	9	Clustering	K-Means clustering.	2026-06-29 19:42:57.09574
79	9	Model Evaluation	Accuracy, precision and recall.	2026-06-29 19:42:57.09574
80	9	ML Project	End-to-end machine learning workflow.	2026-06-29 19:42:57.09574
81	10	Introduction to Deep Learning	Neural network fundamentals.	2026-06-29 19:42:57.09574
82	10	Perceptrons	Single-layer neural networks.	2026-06-29 19:42:57.09574
83	10	Backpropagation	Training neural networks.	2026-06-29 19:42:57.09574
84	10	TensorFlow Basics	Building models with TensorFlow.	2026-06-29 19:42:57.09574
85	10	Convolutional Neural Networks	CNN architecture.	2026-06-29 19:42:57.09574
86	10	Recurrent Neural Networks	RNN and LSTM.	2026-06-29 19:42:57.09574
87	10	Transfer Learning	Using pretrained models.	2026-06-29 19:42:57.09574
88	10	Transformers	Attention mechanism and transformers.	2026-06-29 19:42:57.09574
89	10	Model Deployment	Serving deep learning models.	2026-06-29 19:42:57.09574
90	10	Capstone Project	Build a deep learning application.	2026-06-29 19:42:57.09574
91	11	Introduction to System Design	Scalable system fundamentals.	2026-06-29 19:42:57.09574
92	11	Load Balancing	Traffic distribution strategies.	2026-06-29 19:42:57.09574
93	11	Caching	Redis and caching techniques.	2026-06-29 19:42:57.09574
94	11	Databases at Scale	SQL vs NoSQL.	2026-06-29 19:42:57.09574
95	11	Message Queues	Kafka and RabbitMQ.	2026-06-29 19:42:57.09574
96	11	Microservices	Microservice architecture.	2026-06-29 19:42:57.09574
97	11	Distributed Systems	CAP theorem and consistency.	2026-06-29 19:42:57.09574
98	11	Monitoring	Logging and observability.	2026-06-29 19:42:57.09574
99	11	Cloud Deployment	Deploying on AWS and Azure.	2026-06-29 19:42:57.09574
100	11	System Design Interview	Designing real-world systems.	2026-06-29 19:42:57.09574
101	13	Lesson 1	Introduction to Integration Testing	2026-07-02 11:36:15.845517
102	15	Lesson 1	Introduction to Integration Testing	2026-07-02 11:36:39.143326
103	17	Lesson 1	Introduction to Integration Testing	2026-07-02 11:42:37.857306
104	19	Lesson 1	Introduction to Integration Testing	2026-07-02 11:45:56.781398
105	22	Lesson 1	Introduction to Integration Testing	2026-07-02 11:48:09.519206
106	23	Lesson 1	Introduction to Integration Testing	2026-07-02 11:56:07.67291
\.


--
-- Data for Name: question_attempts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_attempts (id, student_id, quiz_id, question_id, selected_option, is_correct, attempted_at) FROM stdin;
1	1	1	1	B	t	2026-07-01 12:50:37.287326
2	1	1	2	C	t	2026-07-01 12:50:37.292868
3	1	1	3	C	t	2026-07-01 12:50:37.294836
4	1	1	4	C	t	2026-07-01 12:50:37.296706
5	1	1	1	A	f	2026-07-01 13:36:27.161584
6	1	1	2	\N	\N	2026-07-01 13:36:27.161584
7	1	1	3	\N	\N	2026-07-01 13:36:27.161584
8	1	1	4	\N	\N	2026-07-01 13:36:27.161584
9	1	1	1	B	t	2026-07-01 13:38:35.183783
10	1	1	2	C	t	2026-07-01 13:38:35.183783
11	1	1	3	C	t	2026-07-01 13:38:35.183783
12	1	1	4	C	t	2026-07-01 13:38:35.183783
13	13	101	5	B	t	2026-07-02 11:36:16.051655
14	17	102	6	B	t	2026-07-02 11:36:39.337249
15	21	103	7	B	t	2026-07-02 11:42:38.049081
16	25	104	8	B	t	2026-07-02 11:45:56.97943
17	29	105	9	B	t	2026-07-02 11:48:09.721033
18	33	106	10	B	t	2026-07-02 11:56:07.872592
\.


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (id, quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option) FROM stdin;
1	1	Which of the following best describes a 'variable' in programming?	A fixed value that cannot be changed during program execution.	A named storage location in computer memory used to hold data that can change.	A specific type of data, such as a number or text.	An operation or command performed by the program.	B
2	1	Which of the following is an example of an 'integer' data type?	"Hello World"	3.14159	100	True	C
3	1	Which of the following values represents a 'float' data type?	42	'A'	9.81	"2023"	C
4	1	In programming, what is the data type typically used to store textual information, such as names or sentences?	Integer	Float	String	Boolean	C
5	101	What is 2 + 2?	3	4	5	6	B
6	102	What is 2 + 2?	3	4	5	6	B
7	103	What is 2 + 2?	3	4	5	6	B
8	104	What is 2 + 2?	3	4	5	6	B
9	105	What is 2 + 2?	3	4	5	6	B
10	106	What is 2 + 2?	3	4	5	6	B
\.


--
-- Data for Name: quiz_attempts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_attempts (id, student_id, quiz_id, score, attempted_at, total_questions, correct_answers, percentage) FROM stdin;
1	1	1	100	2026-07-01 12:46:51.572139	4	4	100.00
2	1	1	100	2026-07-01 12:50:37.299683	4	4	100.00
3	1	1	0	2026-07-01 13:36:27.161584	4	0	0.00
4	1	1	100	2026-07-01 13:38:35.183783	4	4	100.00
5	13	101	100	2026-07-02 11:36:16.051655	1	1	100.00
6	17	102	100	2026-07-02 11:36:39.337249	1	1	100.00
7	21	103	100	2026-07-02 11:42:38.049081	1	1	100.00
8	25	104	100	2026-07-02 11:45:56.97943	1	1	100.00
9	29	105	100	2026-07-02 11:48:09.721033	1	1	100.00
10	33	106	100	2026-07-02 11:56:07.872592	1	1	100.00
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quizzes (id, course_id, title, created_at, lesson_id) FROM stdin;
1	2	Variables and Data Types Quiz	2026-06-29 19:42:57.09574	1
2	2	Input and Output Quiz	2026-06-29 19:42:57.09574	2
3	2	Operators Quiz	2026-06-29 19:42:57.09574	3
4	2	Conditional Statements Quiz	2026-06-29 19:42:57.09574	4
5	2	Loops Quiz	2026-06-29 19:42:57.09574	5
6	2	Functions Quiz	2026-06-29 19:42:57.09574	6
7	2	Arrays Quiz	2026-06-29 19:42:57.09574	7
8	2	Strings Quiz	2026-06-29 19:42:57.09574	8
9	2	Pointers Quiz	2026-06-29 19:42:57.09574	9
10	2	Mini Project Quiz	2026-06-29 19:42:57.09574	10
11	1	Introduction to Arrays Quiz	2026-06-29 19:42:57.09574	11
12	1	Searching in Arrays Quiz	2026-06-29 19:42:57.09574	12
13	1	Linked Lists Quiz	2026-06-29 19:42:57.09574	13
14	1	Stacks Quiz	2026-06-29 19:42:57.09574	14
15	1	Queues Quiz	2026-06-29 19:42:57.09574	15
16	1	Trees Quiz	2026-06-29 19:42:57.09574	16
17	1	Binary Search Trees Quiz	2026-06-29 19:42:57.09574	17
18	1	Heaps Quiz	2026-06-29 19:42:57.09574	18
19	1	Graphs Quiz	2026-06-29 19:42:57.09574	19
20	1	Hash Tables Quiz	2026-06-29 19:42:57.09574	20
21	4	Time Complexity Quiz	2026-06-29 19:42:57.09574	21
22	4	Sorting Algorithms Quiz	2026-06-29 19:42:57.09574	22
23	4	Quick Sort Quiz	2026-06-29 19:42:57.09574	23
24	4	Binary Search Quiz	2026-06-29 19:42:57.09574	24
25	4	Greedy Algorithms Quiz	2026-06-29 19:42:57.09574	25
26	4	Dynamic Programming Quiz	2026-06-29 19:42:57.09574	26
27	4	Backtracking Quiz	2026-06-29 19:42:57.09574	27
28	4	Graph Algorithms Quiz	2026-06-29 19:42:57.09574	28
29	4	Minimum Spanning Tree Quiz	2026-06-29 19:42:57.09574	29
30	4	Advanced Algorithms Quiz	2026-06-29 19:42:57.09574	30
31	5	Introduction to Databases Quiz	2026-06-29 19:42:57.09574	31
32	5	ER Model Quiz	2026-06-29 19:42:57.09574	32
33	5	Relational Model Quiz	2026-06-29 19:42:57.09574	33
34	5	SQL Basics Quiz	2026-06-29 19:42:57.09574	34
35	5	Joins Quiz	2026-06-29 19:42:57.09574	35
36	5	Normalization Quiz	2026-06-29 19:42:57.09574	36
37	5	Indexes Quiz	2026-06-29 19:42:57.09574	37
38	5	Transactions Quiz	2026-06-29 19:42:57.09574	38
39	5	Concurrency Control Quiz	2026-06-29 19:42:57.09574	39
40	5	Database Design Project Quiz	2026-06-29 19:42:57.09574	40
41	6	HTML Basics Quiz	2026-06-29 19:42:57.09574	41
42	6	CSS Fundamentals Quiz	2026-06-29 19:42:57.09574	42
43	6	Responsive Design Quiz	2026-06-29 19:42:57.09574	43
44	6	JavaScript Basics Quiz	2026-06-29 19:42:57.09574	44
45	6	ES6 Features Quiz	2026-06-29 19:42:57.09574	45
46	6	Node.js Quiz	2026-06-29 19:42:57.09574	46
47	6	Express.js Quiz	2026-06-29 19:42:57.09574	47
48	6	Authentication Quiz	2026-06-29 19:42:57.09574	48
49	6	MongoDB Integration Quiz	2026-06-29 19:42:57.09574	49
50	6	Deploying Applications Quiz	2026-06-29 19:42:57.09574	50
51	7	Introduction to Operating Systems Quiz	2026-06-29 19:42:57.09574	51
52	7	Processes Quiz	2026-06-29 19:42:57.09574	52
53	7	Threads Quiz	2026-06-29 19:42:57.09574	53
54	7	CPU Scheduling Quiz	2026-06-29 19:42:57.09574	54
55	7	Deadlocks Quiz	2026-06-29 19:42:57.09574	55
56	7	Memory Management Quiz	2026-06-29 19:42:57.09574	56
57	7	Virtual Memory Quiz	2026-06-29 19:42:57.09574	57
58	7	File Systems Quiz	2026-06-29 19:42:57.09574	58
59	7	Synchronization Quiz	2026-06-29 19:42:57.09574	59
60	7	Case Studies Quiz	2026-06-29 19:42:57.09574	60
61	8	Introduction to Networking Quiz	2026-06-29 19:42:57.09574	61
62	8	OSI Model Quiz	2026-06-29 19:42:57.09574	62
63	8	TCP/IP Quiz	2026-06-29 19:42:57.09574	63
64	8	IP Addressing Quiz	2026-06-29 19:42:57.09574	64
65	8	Subnetting Quiz	2026-06-29 19:42:57.09574	65
66	8	Routing Quiz	2026-06-29 19:42:57.09574	66
67	8	Switching Quiz	2026-06-29 19:42:57.09574	67
68	8	Transport Layer Quiz	2026-06-29 19:42:57.09574	68
69	8	Application Layer Quiz	2026-06-29 19:42:57.09574	69
70	8	Network Security Quiz	2026-06-29 19:42:57.09574	70
71	9	Introduction to Machine Learning Quiz	2026-06-29 19:42:57.09574	71
72	9	Data Preprocessing Quiz	2026-06-29 19:42:57.09574	72
73	9	Linear Regression Quiz	2026-06-29 19:42:57.09574	73
74	9	Logistic Regression Quiz	2026-06-29 19:42:57.09574	74
75	9	Decision Trees Quiz	2026-06-29 19:42:57.09574	75
76	9	Random Forest Quiz	2026-06-29 19:42:57.09574	76
77	9	Support Vector Machines Quiz	2026-06-29 19:42:57.09574	77
78	9	Clustering Quiz	2026-06-29 19:42:57.09574	78
79	9	Model Evaluation Quiz	2026-06-29 19:42:57.09574	79
80	9	ML Project Quiz	2026-06-29 19:42:57.09574	80
81	10	Introduction to Deep Learning Quiz	2026-06-29 19:42:57.09574	81
82	10	Perceptrons Quiz	2026-06-29 19:42:57.09574	82
83	10	Backpropagation Quiz	2026-06-29 19:42:57.09574	83
84	10	TensorFlow Basics Quiz	2026-06-29 19:42:57.09574	84
85	10	Convolutional Neural Networks Quiz	2026-06-29 19:42:57.09574	85
86	10	Recurrent Neural Networks Quiz	2026-06-29 19:42:57.09574	86
87	10	Transfer Learning Quiz	2026-06-29 19:42:57.09574	87
88	10	Transformers Quiz	2026-06-29 19:42:57.09574	88
89	10	Model Deployment Quiz	2026-06-29 19:42:57.09574	89
90	10	Capstone Project Quiz	2026-06-29 19:42:57.09574	90
91	11	Introduction to System Design Quiz	2026-06-29 19:42:57.09574	91
92	11	Load Balancing Quiz	2026-06-29 19:42:57.09574	92
93	11	Caching Quiz	2026-06-29 19:42:57.09574	93
94	11	Databases at Scale Quiz	2026-06-29 19:42:57.09574	94
95	11	Message Queues Quiz	2026-06-29 19:42:57.09574	95
96	11	Microservices Quiz	2026-06-29 19:42:57.09574	96
97	11	Distributed Systems Quiz	2026-06-29 19:42:57.09574	97
98	11	Monitoring Quiz	2026-06-29 19:42:57.09574	98
99	11	Cloud Deployment Quiz	2026-06-29 19:42:57.09574	99
100	11	System Design Interview Quiz	2026-06-29 19:42:57.09574	100
101	13	Integration Quiz	2026-07-02 11:36:15.857102	\N
102	15	Integration Quiz	2026-07-02 11:36:39.152662	\N
103	17	Integration Quiz	2026-07-02 11:42:37.865162	\N
104	19	Integration Quiz	2026-07-02 11:45:56.791627	\N
105	22	Integration Quiz	2026-07-02 11:48:09.530064	\N
106	23	Integration Quiz	2026-07-02 11:56:07.682488	\N
\.


--
-- Data for Name: student_preferences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_preferences (student_id, preferred_domain, preferred_difficulty) FROM stdin;
1	Machine Learning	Intermediate
3	Database	Intermediate
25	Programming	Intermediate
29	Programming	Intermediate
33	Programming	Intermediate
\.


--
-- Data for Name: student_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_progress (id, student_id, lesson_id, completed, completed_at) FROM stdin;
1	1	1	t	\N
\.


--
-- Data for Name: student_statistics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_statistics (student_id, completion_rate, average_quiz_score, total_study_time, weekly_sessions, learning_streak, quiz_attempts, lessons_completed, courses_enrolled, engagement_score, updated_at) FROM stdin;
3	0.00	0.00	0	0	0	1	0	1	0.75	2026-06-29 17:12:27.922894
1	10.00	75.00	0	0	0	4	1	1	32.75	2026-07-01 14:01:02.198143
21	0.00	100.00	0	0	0	1	0	1	35.75	2026-07-02 11:42:38.078767
25	0.00	100.00	0	0	0	1	0	1	35.75	2026-07-02 11:45:57.010464
29	0.00	100.00	0	0	0	1	0	1	35.75	2026-07-02 11:48:09.746284
33	0.00	100.00	0	0	0	1	0	1	35.75	2026-07-02 11:56:07.894343
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role, created_at) FROM stdin;
2	Professor	prof@gmail.com	$2b$10$wo.YYN268CFirX/OaEcZC.ZqoJAtKpaL2RCallFjkc3fxijtMs9NG	teacher	2026-06-15 18:16:13.687703
3	Student2	student2@gmail.com	$2b$10$ulEV7eEdenh96TkQNZWNMeE/5ftoNJmolMMIvxbvOtoOVqidN1B4.	student	2026-06-22 16:29:52.871231
1	Kanishka	kanishka@gmail.com	$2b$10$7cC/tWPzbw7s3Pj/uOVwGOu8tJ/Q/4Kqovqc371Cb8BPpxZaIL4/6	student	2026-06-15 16:27:39.324205
4	Jest Student	jest1782970635492@mail.com	$2b$10$sbOKX4TYH2Jef9Nyo3/6TuUSNYqHyY0IX3po5LvZUTRpFSUdVhC7.	student	2026-07-02 11:07:15.706244
5	Jest Student	jest1782970694938@mail.com	$2b$10$yQ2BY78mXlq/962ZH8a4ZuY40wVXDsU1lqDKjYOqbCHow1LCKf5rm	student	2026-07-02 11:08:15.122415
6	Jest Student	jest1782970722498@mail.com	$2b$10$ZtgIR3gCxscowEJbA4/kOeCNun22jN0IVdQxfb/DLfzYVOP52.ZeO	student	2026-07-02 11:08:42.679746
7	Jest Student	jest1782970834752@mail.com	$2b$10$41MpTCbBCM13rYv9pvY6M.SRKRbuoTaDCE2Q3H6sXed8Qcp8i8key	student	2026-07-02 11:10:34.931746
8	Jest Student	student1782971242949@mail.com	$2b$10$.d28QAbpp2HVAOsGZMrfYefXyH.b/sbjJPdRZdhlqLzaymvf.BhpW	student	2026-07-02 11:17:23.138297
9	Jest Teacher	teacher1782971242949@mail.com	$2b$10$GE72qJphcgfDx3HjIe4QYu.vkJh7JGOKAex89xl79BumfnriBQoHC	teacher	2026-07-02 11:17:23.234075
10	Jest Student	student1782972375433@mail.com	$2b$10$npV7sgKYZHs6DLDuojFYd.gybtNVrfxMysnbtqvLy7PaY/IScyTUC	student	2026-07-02 11:36:15.616273
11	Jest Teacher	teacher1782972375433@mail.com	$2b$10$jaIdwlwOKJ4LEMz9LcTeaeAOr7triSG8JcD4jmge6q6iipa0E1YQK	teacher	2026-07-02 11:36:15.707315
12	Integration Teacher	teacher1782972375548@mail.com	$2b$10$AfcXfQ6.aWCeXPZCfUnvsudDvqVfmvToutlo3hAIWmTDT1WAUZVEq	teacher	2026-07-02 11:36:15.735996
13	Integration Student	student1782972375548@mail.com	$2b$10$rlr29dDD7mUZjLeymum8LO6CxUz13w6LPYBhLLPjhk/JRUFyYO1Wi	student	2026-07-02 11:36:15.952004
14	Jest Student	student1782972398861@mail.com	$2b$10$MnzRUHQz4KztHQpGu3Tnw.7JJMqlSTDWiFeKdPPPHQ7DBiigted4K	student	2026-07-02 11:36:39.032072
15	Integration Teacher	teacher1782972398863@mail.com	$2b$10$xBZUcj1oUUC6nNTc6JNw6uyx2KdQqpqZ/BZXntmVvx09MZBdhHIZq	teacher	2026-07-02 11:36:39.035977
16	Jest Teacher	teacher1782972398861@mail.com	$2b$10$p905GV.KoX3EKn8nUE1mKOZNgLX/38KGPpTEzfAf/zc2sQDDOFtmC	teacher	2026-07-02 11:36:39.121143
17	Integration Student	student1782972398863@mail.com	$2b$10$.XS9TmEhiZbkggYgRuM.1eMUGXhG9few2LRs.M2/.rqJv.Ac2BUQa	student	2026-07-02 11:36:39.238175
18	Jest Student	student1782972757550@mail.com	$2b$10$hKhvOjf.yqYrRJTD/6/ZkO71MU.BEUA1mmzxpKbbJPsCFhR2H7TWG	student	2026-07-02 11:42:37.741786
19	Integration Teacher	teacher1782972757548@mail.com	$2b$10$O004zGNyZ60O0DlKaM7lZ.kVNJVRAoylcA0JZ0geexafbKO5lpZ5a	teacher	2026-07-02 11:42:37.751029
20	Jest Teacher	teacher1782972757550@mail.com	$2b$10$mvZz8evJ6uK1OCvBPzQliOxuL89a42HVUPH6dzk/aaAAILayiBIFm	teacher	2026-07-02 11:42:37.828989
21	Integration Student	student1782972757548@mail.com	$2b$10$eBVczeobiQW75KYs6EbNbuJ8MdCtwwY/rRSMauH4qCXQuMSfr7IJe	student	2026-07-02 11:42:37.95168
22	Jest Student	student1782972956480@mail.com	$2b$10$Evq67XT/JIYjj5ip/pD5xuekTSq2DBYg53ZrfUQPwrDfTaPvXmxu6	student	2026-07-02 11:45:56.666284
23	Integration Teacher	teacher1782972956485@mail.com	$2b$10$fu71F1.Qj.ZdK7/da1t8FevYcoNZiFljdyB9NhHBi81.DbHiEosS6	teacher	2026-07-02 11:45:56.670689
24	Jest Teacher	teacher1782972956480@mail.com	$2b$10$5.tYXUb2tay3aPRZX0A/u.8Ff7Jch81j8vMpqGyB5ZyXuV0rN7ZAm	teacher	2026-07-02 11:45:56.76078
25	Integration Student	student1782972956485@mail.com	$2b$10$rlrEgbya8wQGhKrdscFgkOFqyGVqSNl9ErHvOiMGAGndwW1.ebEQu	student	2026-07-02 11:45:56.877101
26	Jest Student	student1782973088979@mail.com	$2b$10$TcSt8XG8/0GjLgQQNYg8geY8LcTJFzmdw9U9LLOo/Npl9Ad7JplSq	student	2026-07-02 11:48:09.160467
27	Jest Teacher	teacher1782973088979@mail.com	$2b$10$u1N.sttjRp6D9vevCaSZOebp6A35b757tHq2B5PCeInJdJhinxpva	teacher	2026-07-02 11:48:09.269746
28	Integration Teacher	teacher1782973089196@mail.com	$2b$10$BQrCsMJW.tkRsZ/VHDEYr.MRstgdyLIrg3FjSQXTm/MytrC7JKGfa	teacher	2026-07-02 11:48:09.39314
29	Integration Student	student1782973089196@mail.com	$2b$10$1EbmBSoKfICc7.1nD8oG9u.GdczLHykV.y5MPVDQn8w5F7oiIwHCK	student	2026-07-02 11:48:09.621874
30	Jest Student	student1782973567189@mail.com	$2b$10$eeUxOJGoGo5hBlM2/tpX/u170B86RLeGNsXEplUB0yX79j1J.B3mW	student	2026-07-02 11:56:07.372314
31	Jest Teacher	teacher1782973567189@mail.com	$2b$10$kGstmCUGuNiKdAuG1HBAO.8W2zRYeQJn6OYLHUtMs5KyVX3v53zaq	teacher	2026-07-02 11:56:07.476046
32	Integration Teacher	teacher1782973567376@mail.com	$2b$10$Iol4Ii8rDDDcAd8GBLWeyeiJAFJaE/E5DnCDFIPHk7TFEgBaH9Fhi	teacher	2026-07-02 11:56:07.564907
33	Integration Student	student1782973567376@mail.com	$2b$10$wSIRnaf6SK7ho05nu/POU.o1BS3qyKVOfQ25NYnXKTfhdKcIUZVNi	student	2026-07-02 11:56:07.775177
\.


--
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.courses_id_seq', 24, true);


--
-- Name: enrollments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrollments_id_seq', 9, true);


--
-- Name: learning_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.learning_activity_id_seq', 1, false);


--
-- Name: lessons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_id_seq', 106, true);


--
-- Name: question_attempts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_attempts_id_seq', 18, true);


--
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 10, true);


--
-- Name: quiz_attempts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_attempts_id_seq', 10, true);


--
-- Name: quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quizzes_id_seq', 106, true);


--
-- Name: student_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.student_progress_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 33, true);


--
-- Name: course_prerequisites course_prerequisites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_prerequisites
    ADD CONSTRAINT course_prerequisites_pkey PRIMARY KEY (course_id, prerequisite_course_id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- Name: enrollments enrollments_student_id_course_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_course_id_key UNIQUE (student_id, course_id);


--
-- Name: learning_activity learning_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_activity
    ADD CONSTRAINT learning_activity_pkey PRIMARY KEY (id);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: question_attempts question_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_attempts
    ADD CONSTRAINT question_attempts_pkey PRIMARY KEY (id);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- Name: quiz_attempts quiz_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_pkey PRIMARY KEY (id);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);


--
-- Name: student_preferences student_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_preferences
    ADD CONSTRAINT student_preferences_pkey PRIMARY KEY (student_id);


--
-- Name: student_progress student_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_pkey PRIMARY KEY (id);


--
-- Name: student_progress student_progress_student_id_lesson_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_student_id_lesson_id_key UNIQUE (student_id, lesson_id);


--
-- Name: student_statistics student_statistics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_statistics
    ADD CONSTRAINT student_statistics_pkey PRIMARY KEY (student_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: course_prerequisites course_prerequisites_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_prerequisites
    ADD CONSTRAINT course_prerequisites_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: course_prerequisites course_prerequisites_prerequisite_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_prerequisites
    ADD CONSTRAINT course_prerequisites_prerequisite_course_id_fkey FOREIGN KEY (prerequisite_course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: courses courses_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.users(id);


--
-- Name: enrollments enrollments_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- Name: enrollments enrollments_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id);


--
-- Name: learning_activity learning_activity_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_activity
    ADD CONSTRAINT learning_activity_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- Name: learning_activity learning_activity_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_activity
    ADD CONSTRAINT learning_activity_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


--
-- Name: learning_activity learning_activity_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.learning_activity
    ADD CONSTRAINT learning_activity_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id);


--
-- Name: lessons lessons_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- Name: question_attempts question_attempts_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_attempts
    ADD CONSTRAINT question_attempts_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.questions(id);


--
-- Name: question_attempts question_attempts_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_attempts
    ADD CONSTRAINT question_attempts_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id);


--
-- Name: question_attempts question_attempts_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_attempts
    ADD CONSTRAINT question_attempts_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id);


--
-- Name: questions questions_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id);


--
-- Name: quiz_attempts quiz_attempts_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id);


--
-- Name: quiz_attempts quiz_attempts_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id);


--
-- Name: quizzes quizzes_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- Name: quizzes quizzes_lesson_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_lesson_fk FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


--
-- Name: student_preferences student_preferences_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_preferences
    ADD CONSTRAINT student_preferences_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: student_progress student_progress_lesson_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES public.lessons(id);


--
-- Name: student_progress student_progress_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_progress
    ADD CONSTRAINT student_progress_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id);


--
-- Name: student_statistics student_statistics_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_statistics
    ADD CONSTRAINT student_statistics_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict pyxDax2o8WowzHLzu59yVHbKoc7XgRaE2XLcPOrfUrky5Iq4jbeDLPzAFOvKV76

