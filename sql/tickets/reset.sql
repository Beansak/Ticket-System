-- reset ticket database (use for start too) --

source setup.sql;

use ticket;

source ddl.sql;

source procedures.sql;

--Base Values for reset--


INSERT IGNORE INTO users (email, user_role)
VALUES
('isak.klaesson2002@gmail.com', 'Admin'),
('isak.klaesson2016@gmail.com', 'User');

INSERT IGNORE INTO categories (category_name)
VALUES 
('Network'),
('Screen'),
('Hardware'),
('Log-in'),
('Software'),
('Other');