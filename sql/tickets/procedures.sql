use ticket;

-- show all products.
DROP PROCEDURE IF EXISTS show_all_tickets;

DELIMITER ;;

CREATE PROCEDURE show_all_tickets()
BEGIN

    SELECT 
    *
    FROM tickets
    ORDER BY 
        update_date DESC;

END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS insert_ticket;

DELIMITER ;;


CREATE PROCEDURE insert_ticket (
    t_title char(50),
    t_category char(20),
    t_description Text,
    t_user char(40),
    t_agent char(20),
    t_status char(20)
)
BEGIN
    INSERT INTO tickets (title, kategori, beskrivning, create_date,update_date, user, agent, status)
    VALUES(t_title, t_category, t_description, NOW(),NOW(), t_user, t_agent, t_status);

END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS show_one_ticket;

DELIMITER ;;

CREATE PROCEDURE show_one_ticket (
    t_id char(10)
)
BEGIN

    SELECT 
     
    *
    FROM tickets
    WHERE id = t_id;

END;;

DELIMITER ;



DROP PROCEDURE IF EXISTS delete_ticket;
DELIMITER ;;

CREATE PROCEDURE delete_ticket (
    t_id CHAR(10)
)
BEGIN

    DELETE 
    FROM tickets
    WHERE id = t_id
    ;

END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS ticket_info_sok;

DELIMITER ;;

CREATE PROCEDURE ticket_info_sok (
    IN search_criteria VARCHAR(255)
)
BEGIN
    SELECT
        title, 
        id,
        kategori,
        beskrivning,
        user,
        agent,
        status
    FROM 
        tickets
    WHERE
        title LIKE CONCAT('%', search_criteria, '%')
        OR id LIKE CONCAT('%', search_criteria, '%')
        OR kategori LIKE CONCAT('%', search_criteria, '%')
        OR beskrivning LIKE CONCAT('%', search_criteria, '%')
        OR user LIKE CONCAT('%', search_criteria, '%')
        OR agent LIKE CONCAT('%', search_criteria, '%')
        OR status LIKE CONCAT('%', search_criteria, '%')
    ORDER BY 
    update_date DESC;
END;;

DELIMITER ;

DROP PROCEDURE IF EXISTS insert_file;

DELIMITER ;;


CREATE PROCEDURE insert_file (
    id INT,
    file_name VARCHAR(255), 
    file_path VARCHAR(255) 
)
BEGIN
    INSERT INTO files (id, file_name, file_path)
    VALUES(id, file_name, file_path);
END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS show_files_for_ticket;

DELIMITER ;;


CREATE PROCEDURE show_files_for_ticket (
   t_id char(10)
)
BEGIN

    SELECT 
     
    *
    FROM files
    WHERE id = t_id;
END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS show_all_categories;

DELIMITER ;;

CREATE PROCEDURE show_all_categories()
BEGIN

    SELECT 
    *
    FROM categories;

END;;


DELIMITER ;


DROP PROCEDURE IF EXISTS create_category;

DELIMITER ;;

CREATE PROCEDURE create_category(
    category_name VARCHAR(255)
)
BEGIN
    INSERT INTO categories (category_name)
    VALUES (category_name);

END;;

DELIMITER ;




DROP PROCEDURE IF EXISTS show_role_for_user;

DELIMITER ;;

CREATE PROCEDURE show_role_for_user (
   u_email varchar(255)
)
BEGIN

    SELECT 

    user_role
    
    FROM users
    WHERE email = u_email;
END;;

DELIMITER ;



DROP PROCEDURE IF EXISTS update_ticket;

DELIMITER ;;

CREATE PROCEDURE update_ticket (
    t_description Text,
    t_status char(20),
    t_id char(10),
    t_category char(40)

)
BEGIN
    UPDATE
        tickets
        SET beskrivning = t_description,
        update_date = NOW(),
        status = t_status,
        kategori = t_category
    
    WHERE id = t_id;
END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS show_all_tickets_user;

DELIMITER ;;

CREATE PROCEDURE show_all_tickets_user(
    u_email varchar(255)
)
BEGIN

    SELECT 
    *
    FROM tickets
    WHERE user = u_email;

END;;

DELIMITER ;



DROP PROCEDURE IF EXISTS ticket_info_sok_user;

DELIMITER ;;

CREATE PROCEDURE ticket_info_sok_user (
    IN search_criteria VARCHAR(255),
    IN u_email varchar(255)
)
BEGIN
    SELECT
        title, 
        id,
        kategori,
        beskrivning,
        user,
        agent,
        status
    FROM 
        tickets
    WHERE
        (
            title LIKE CONCAT('%', search_criteria, '%')
            OR id LIKE CONCAT('%', search_criteria, '%')
            OR kategori LIKE CONCAT('%', search_criteria, '%')
            OR beskrivning LIKE CONCAT('%', search_criteria, '%')
            OR user LIKE CONCAT('%', search_criteria, '%')
            OR agent LIKE CONCAT('%', search_criteria, '%')
            OR status LIKE CONCAT('%', search_criteria, '%')
        )
        AND user = u_email;
END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS delete_category;

DELIMITER ;;

CREATE PROCEDURE delete_category (
    t_id CHAR(10)
)
BEGIN

    DELETE 
    FROM categories
    WHERE id = t_id
    ;

END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS create_user;

DELIMITER ;;

CREATE PROCEDURE create_user(
    email VARCHAR(255),
    user_role VARCHAR(255)
)
BEGIN
    INSERT INTO users (email, user_role)
    VALUES (email, user_role);

END;;


DELIMITER ;


DROP PROCEDURE IF EXISTS claim_ticket;

DELIMITER ;;

CREATE PROCEDURE claim_ticket (
    u_email VARCHAR(255),
    t_id char(10)
)
BEGIN
    UPDATE
        tickets
        SET agent = u_email
    
    WHERE id = t_id;
END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS unclaim_ticket;

DELIMITER ;;

CREATE PROCEDURE unclaim_ticket (
    u_email VARCHAR(255),
    t_id char(10)
)
BEGIN
    UPDATE
        tickets
        SET agent = "unassigned"
    
    WHERE id = t_id;
END;;

DELIMITER ;


DROP PROCEDURE IF EXISTS create_comment;

DELIMITER ;;

CREATE PROCEDURE create_comment(
    t_description Text,
    t_id char(20),
    u_email VARCHAR(255)
)
BEGIN
    INSERT INTO comments (id, beskrivning, email)
    VALUES (t_id, t_description, u_email);

END;;

DELIMITER ;





DROP PROCEDURE IF EXISTS show_all_comments_for_ticket;

DELIMITER ;;

CREATE PROCEDURE show_all_comments_for_ticket(
    t_id varchar(255)
)
BEGIN

    SELECT 
    *
    FROM comments
    WHERE id = t_id;

END;;

DELIMITER ;



DROP PROCEDURE IF EXISTS create_knowledge;

DELIMITER ;;

CREATE PROCEDURE create_knowledge(
    title char(50),
    u_email VARCHAR(255),
    t_category char(20),
    problem TEXT,
    solution TEXT
)
BEGIN
    INSERT INTO knowledge (title, email, kategori, problem, solution)
    VALUES (title, u_email, t_category, problem, solution);

END;;

DELIMITER ;



DROP PROCEDURE IF EXISTS show_knowledge;

DELIMITER ;;

CREATE PROCEDURE show_knowledge()
BEGIN

    SELECT 
    *
    FROM knowledge;

END;;

DELIMITER ;




DROP PROCEDURE IF EXISTS show_knowledge_search;

DELIMITER ;;

CREATE PROCEDURE show_knowledge_search (
    IN search_criteria VARCHAR(255)
)
BEGIN
    SELECT
        *
    FROM 
        knowledge
    WHERE
        kategori LIKE CONCAT('%', search_criteria, '%');
END;;

DELIMITER ;
