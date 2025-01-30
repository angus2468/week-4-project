CREATE TABLE messages (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author TEXT,
    message TEXT
);

INSERT INTO messages (author, message) VALUES
('Angus', 'Woah cool hotel'),
('Joseph','Cant wait to some back'),
('Baker','I will not be coming back');