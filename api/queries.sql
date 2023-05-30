-- Create the 'projects' table
drop table profiles;
drop table projects;

-- Create the 'profiles' table
CREATE TABLE profiles (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  position VARCHAR(255),
  startDate DATE,
  skills NVARCHAR(MAX)
);

-- Create the 'projects' table
CREATE TABLE projects (
  id INT IDENTITY(1,1) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  environment VARCHAR(255)
);

-- Create the 'profile_projects' table for the many-to-many relationship
CREATE TABLE profile_projects (
  profileId INT,
  projectId INT,
  FOREIGN KEY (profileId) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE,
  PRIMARY KEY (profileId, projectId)
);


/* Insert rows*/
INSERT INTO profiles (username, password, name, position, startDate, skills)
VALUES ('johnsmith', 'password123', 'John Smith', 'Software Engineer', '2023-01-01', '{"concepts": ["Object-Oriented Programming", "Data Structures"], "languages": ["Java", "Python"], "tools": ["Eclipse", "Visual Studio Code"]}');
INSERT INTO profiles (username, password, name, position, startDate, skills)
VALUES ('janedoe', 'p@ssw0rd', 'Jane Doe', 'Full Stack Developer', '2022-08-15', '{"concepts": ["RESTful API", "Database Design"], "languages": ["JavaScript", "SQL"], "tools": ["Node.js", "Postman"]}');
INSERT INTO profiles (username, password, name, position, startDate, skills)
VALUES ('alexturner', 'pass123', 'Alex Turner', 'Frontend Developer', '2022-05-20', '{"concepts": ["Responsive Web Design", "DOM Manipulation"], "languages": ["HTML", "CSS", "JavaScript"], "tools": ["React", "Sass"]}');
INSERT INTO profiles (username, password, name, position, startDate, skills)
VALUES ('sarahbrown', 'securepass', 'Sarah Brown', 'Data Analyst', '2022-11-10', '{"concepts": ["Data Visualization", "Statistical Analysis"], "languages": ["R", "Python"], "tools": ["RStudio", "Jupyter Notebook"]}');
INSERT INTO profiles (username, password, name, position, startDate, skills)
VALUES ('michaeljones', 'mypass123', 'Michael Jones', 'Backend Developer', '2023-03-05', '{"concepts": ["API Development", "Database Management"], "languages": ["C#", "SQL"], "tools": ["Visual Studio", "SQL Server"]}');

