//Isak Klaesson - iskl21
"use strict";

const mysql = require("promise-mysql");
const config = require("../config/ticket.json");

async function show_all_tickets() {
    const db = await mysql.createConnection(config);
    let sql = `CALL show_all_tickets();`;

    let res = await db.query(sql);
    db.end();
    return res[0];
}

async function show_all_categories() {
    const db = await mysql.createConnection(config);
    let sql = `CALL show_all_categories();`;

    let res = await db.query(sql);
    db.end();
    return res[0];
}

async function insert_ticket(data) {
    const db = await mysql.createConnection(config);
    let sql = `CALL insert_ticket(?, ?, ?, ?, ?, ?);`;
    //console.log(data.email);
    await db.query(sql, [data.t_title, data.t_category, data.t_description, data.email, "unassigned", "open"]);
    db.end();
}

async function show_one_ticket(id) {
    const db = await mysql.createConnection(config);
    let sql = `CALL show_one_ticket(?);`;
    //console.log(id);

    let res = await db.query(sql, [id]);
    db.end();
    return res[0];
}

async function show_files_for_ticket(id) {
    const db = await mysql.createConnection(config);
    let sql = `CALL show_files_for_ticket(?);`;
    //console.log(id);

    let res = await db.query(sql, [id]);
    db.end();
    return res[0];
}

async function delete_ticket(id) {
    const db = await mysql.createConnection(config);
    let sql = `CALL delete_ticket(?);`;
    //console.log(id);

    let res = await db.query(sql, [id]);
    db.end();
    return res[0];
}

async function close_ticket(id) {
    const db = await mysql.createConnection(config);
    let sql = `CALL close_ticket(?);`;
    //console.log(id);

    let res = await db.query(sql, [id]);
    db.end();
    return res[0];
}

async function open_ticket(id) {
    const db = await mysql.createConnection(config);
    let sql = `CALL open_ticket(?);`;
    //console.log(id);

    let res = await db.query(sql, [id]);
    db.end();
    return res[0];
}

async function ticket_info_sok(search) {
    const db = await mysql.createConnection(config);
    let sql = `CALL ticket_info_sok(?);`;
    //console.log(search);

    let res = await db.query(sql, [search]);
    db.end();
    return res[0];
}

async function insert_file(ticket_Id, fileName, filePath) {
    const db = await mysql.createConnection(config);
    let sql = `CALL insert_file(?, ?, ?);`;
    //console.log(ticket_Id);
    await db.query(sql, [ticket_Id, fileName, filePath]);
    db.end();
}

async function create_category(category_name) {
    const db = await mysql.createConnection(config);
    let sql = `CALL create_category(?);`;

    await db.query(sql, [category_name]);
    db.end();
}

async function show_role_for_user(user_email) {
    const db = await mysql.createConnection(config);
    let sql = `CALL show_role_for_user(?);`;
    //console.log(ticket_Id);
    let res = await db.query(sql, [user_email]);
    db.end();
    return res[0];
}

async function update_ticket(t_description, status, ticket_id, category) {
    const db = await mysql.createConnection(config);
    let sql = `CALL update_ticket(?, ?, ?, ?);`;

    await db.query(sql, [t_description, status, ticket_id, category]);
    db.end();
}

async function ticket_info_sok_user(search, email) {
    const db = await mysql.createConnection(config);
    let sql = `CALL ticket_info_sok_user(?, ?);`;
    //console.log(search);

    let res = await db.query(sql, [search, email]);
    db.end();
    return res[0];
}

async function show_all_tickets_user(email) {
    const db = await mysql.createConnection(config);
    let sql = `CALL show_all_tickets_user(?);`;
    //console.log(search);

    let res = await db.query(sql, [email]);
    db.end();
    return res[0];
}

async function delete_category(id) {
    const db = await mysql.createConnection(config);
    let sql = `CALL delete_category(?);`;
    //console.log(id);

    let res = await db.query(sql, [id]);
    db.end();
    return res[0];
    
}

async function create_user(email, user_role) {
    const db = await mysql.createConnection(config);
    let sql = `CALL create_user(?, ?);`;
    
    
    await db.query(sql, [email, user_role]);
    db.end();
}

async function claim_ticket(email, ticket_id) {
    const db = await mysql.createConnection(config);
    let sql = `CALL claim_ticket(?, ?);`;

    await db.query(sql, [email, ticket_id]);
    db.end();
}

async function unclaim_ticket(email, ticket_id) {
    const db = await mysql.createConnection(config);
    let sql = `CALL unclaim_ticket(?, ?);`;

    await db.query(sql, [email, ticket_id]);
    db.end();
}


async function create_comment(body, id, email) {
    const db = await mysql.createConnection(config);
    let sql = `CALL create_comment(?, ?, ?);`;
    
    
    await db.query(sql, [body.t_description, id, email]);
    db.end();
}

async function show_all_comments_for_ticket(id) {
    const db = await mysql.createConnection(config);
    let sql = `CALL show_all_comments_for_ticket(?);`;

    let res = await db.query(sql, [id]);
    db.end();
    return res[0];
}

async function create_knowledge(title, email, category, problem, solution) {
    const db = await mysql.createConnection(config);
    let sql = `CALL create_knowledge(?, ?, ?, ?, ?);`;
    
    
    await db.query(sql, [title, email, category, problem, solution]);
    db.end();
}

async function show_knowledge() {
    const db = await mysql.createConnection(config);
    let sql = `CALL show_knowledge();`;

    let res = await db.query(sql);
    db.end();
    return res[0];
}

async function show_knowledge_search(search) {
    const db = await mysql.createConnection(config);
    let sql = `CALL show_knowledge_search(?);`;

    let res = await db.query(sql, [search]);
    db.end();
    return res[0];
}


module.exports = {
    "show_all_tickets": show_all_tickets,
    "insert_ticket" : insert_ticket,
    "show_one_ticket" : show_one_ticket,
    "delete_ticket" : delete_ticket,
    "close_ticket" : close_ticket,
    "open_ticket" : open_ticket,
    "ticket_info_sok" : ticket_info_sok,
    "insert_file" : insert_file,
    "show_files_for_ticket" : show_files_for_ticket,
    'show_all_categories':show_all_categories,
    "create_category" : create_category,
    "show_role_for_user": show_role_for_user,
    "update_ticket": update_ticket,
    "ticket_info_sok_user": ticket_info_sok_user,
    "show_all_tickets_user":show_all_tickets_user,
    "delete_category": delete_category,
    "create_user": create_user,
    "claim_ticket": claim_ticket,
    "create_comment": create_comment,
    "show_all_comments_for_ticket": show_all_comments_for_ticket,
    "unclaim_ticket" : unclaim_ticket,
    "create_knowledge": create_knowledge,
    "show_knowledge": show_knowledge,
    "show_knowledge_search" : show_knowledge_search
};