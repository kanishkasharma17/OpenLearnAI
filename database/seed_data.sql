BEGIN;

TRUNCATE TABLE
quiz_attempts,
quizzes,
student_progress,
learning_activity,
lessons
RESTART IDENTITY CASCADE;

-- all INSERT statements go here



INSERT INTO lessons (course_id,title,content)
VALUES

(2,'Variables and Data Types',
'Introduction to variables, integers, floats and strings.'),

(2,'Input and Output',
'Reading input and printing output in C++.'),

(2,'Operators',
'Arithmetic, logical and relational operators.'),

(2,'Conditional Statements',
'if, else and switch statements.'),

(2,'Loops',
'for, while and do while loops.'),

(2,'Functions',
'Function declaration and definition.'),

(2,'Arrays',
'One dimensional arrays.'),

(2,'Strings',
'Working with strings.'),

(2,'Pointers',
'Pointer basics.'),

(2,'Mini Project',
'Build a simple console application.');


INSERT INTO lessons (course_id,title,content)
VALUES


-- DATA STRUCTURE
(1,'Introduction to Arrays',
'Understanding contiguous memory allocation and array operations.'),

(1,'Searching in Arrays',
'Linear search and binary search techniques.'),

(1,'Linked Lists',
'Singly and doubly linked lists implementation.'),

(1,'Stacks',
'Stack operations and applications.'),

(1,'Queues',
'Queue, circular queue and deque.'),

(1,'Trees',
'Tree terminology and traversals.'),

(1,'Binary Search Trees',
'Insertion, deletion and searching in BST.'),

(1,'Heaps',
'Min Heap, Max Heap and Priority Queue.'),

(1,'Graphs',
'Graph representation and traversal algorithms.'),

(1,'Hash Tables',
'Hashing concepts and collision handling.');


--ALGORITHMS
INSERT INTO lessons (course_id,title,content)
VALUES

(4,'Time Complexity',
'Big O, Big Omega and Big Theta analysis.'),

(4,'Sorting Algorithms',
'Bubble, Selection, Insertion and Merge Sort.'),

(4,'Quick Sort',
'Divide and conquer sorting algorithm.'),

(4,'Binary Search',
'Searching efficiently in sorted arrays.'),

(4,'Greedy Algorithms',
'Greedy strategy and applications.'),

(4,'Dynamic Programming',
'Memoization and tabulation techniques.'),

(4,'Backtracking',
'N Queens, Sudoku and recursion trees.'),

(4,'Graph Algorithms',
'BFS, DFS and shortest paths.'),

(4,'Minimum Spanning Tree',
'Prim and Kruskal algorithms.'),

(4,'Advanced Algorithms',
'Segment Tree, Fenwick Tree and Union Find.');


--DATABASE SYSTEMS 
INSERT INTO lessons (course_id,title,content)
VALUES

(5,'Introduction to Databases','Understanding database systems and DBMS.'),
(5,'ER Model','Entity Relationship diagrams and modeling.'),
(5,'Relational Model','Tables, rows and relationships.'),
(5,'SQL Basics','SELECT, INSERT, UPDATE and DELETE queries.'),
(5,'Joins','Inner, Left, Right and Full joins.'),
(5,'Normalization','1NF, 2NF, 3NF and BCNF.'),
(5,'Indexes','Clustered and non-clustered indexes.'),
(5,'Transactions','ACID properties and transaction management.'),
(5,'Concurrency Control','Locks and isolation levels.'),
(5,'Database Design Project','Designing a complete relational database.');


--WEB DEVELOPMENT
INSERT INTO lessons (course_id,title,content)
VALUES

(6,'HTML Basics','Structure of a web page.'),
(6,'CSS Fundamentals','Styling web pages.'),
(6,'Responsive Design','Media queries and Flexbox.'),
(6,'JavaScript Basics','Variables, functions and DOM.'),
(6,'ES6 Features','Modern JavaScript syntax.'),
(6,'Node.js','Server-side JavaScript.'),
(6,'Express.js','Building REST APIs.'),
(6,'Authentication','JWT authentication and authorization.'),
(6,'MongoDB Integration','Connecting backend with database.'),
(6,'Deploying Applications','Deploying full-stack applications.');

--OPERATING SYSTEMS
INSERT INTO lessons (course_id,title,content)
VALUES

(7,'Introduction to Operating Systems','Functions of an OS.'),
(7,'Processes','Process lifecycle and PCB.'),
(7,'Threads','Multithreading concepts.'),
(7,'CPU Scheduling','FCFS, SJF and Round Robin.'),
(7,'Deadlocks','Deadlock prevention and avoidance.'),
(7,'Memory Management','Paging and segmentation.'),
(7,'Virtual Memory','Demand paging and swapping.'),
(7,'File Systems','Directory structures and storage.'),
(7,'Synchronization','Semaphores and mutexes.'),
(7,'Case Studies','Linux and Windows architecture.');

--COMPUTER NETWORKS
INSERT INTO lessons (course_id,title,content)
VALUES

(8,'Introduction to Networking','Computer network basics.'),
(8,'OSI Model','Seven-layer architecture.'),
(8,'TCP/IP','Internet protocol suite.'),
(8,'IP Addressing','IPv4 and IPv6 addressing.'),
(8,'Subnetting','Subnet calculations.'),
(8,'Routing','Static and dynamic routing.'),
(8,'Switching','LAN switching concepts.'),
(8,'Transport Layer','TCP and UDP.'),
(8,'Application Layer','HTTP, DNS and FTP.'),
(8,'Network Security','Firewalls and VPNs.');

--MACHINE LEARNING

INSERT INTO lessons (course_id,title,content)
VALUES

(9,'Introduction to Machine Learning','ML overview and applications.'),
(9,'Data Preprocessing','Cleaning and preparing datasets.'),
(9,'Linear Regression','Regression fundamentals.'),
(9,'Logistic Regression','Classification using logistic regression.'),
(9,'Decision Trees','Tree-based models.'),
(9,'Random Forest','Ensemble learning.'),
(9,'Support Vector Machines','Margin-based classification.'),
(9,'Clustering','K-Means clustering.'),
(9,'Model Evaluation','Accuracy, precision and recall.'),
(9,'ML Project','End-to-end machine learning workflow.');

--DEEP LEARNING
INSERT INTO lessons (course_id,title,content)
VALUES

(10,'Introduction to Deep Learning','Neural network fundamentals.'),
(10,'Perceptrons','Single-layer neural networks.'),
(10,'Backpropagation','Training neural networks.'),
(10,'TensorFlow Basics','Building models with TensorFlow.'),
(10,'Convolutional Neural Networks','CNN architecture.'),
(10,'Recurrent Neural Networks','RNN and LSTM.'),
(10,'Transfer Learning','Using pretrained models.'),
(10,'Transformers','Attention mechanism and transformers.'),
(10,'Model Deployment','Serving deep learning models.'),
(10,'Capstone Project','Build a deep learning application.');


--SYSTEM DESIGN
INSERT INTO lessons (course_id,title,content)
VALUES

(11,'Introduction to System Design','Scalable system fundamentals.'),
(11,'Load Balancing','Traffic distribution strategies.'),
(11,'Caching','Redis and caching techniques.'),
(11,'Databases at Scale','SQL vs NoSQL.'),
(11,'Message Queues','Kafka and RabbitMQ.'),
(11,'Microservices','Microservice architecture.'),
(11,'Distributed Systems','CAP theorem and consistency.'),
(11,'Monitoring','Logging and observability.'),
(11,'Cloud Deployment','Deploying on AWS and Azure.'),
(11,'System Design Interview','Designing real-world systems.');

INSERT INTO quizzes (course_id, lesson_id, title)
SELECT
    course_id,
    id,
    title || ' Quiz'
FROM lessons;

COMMIT;