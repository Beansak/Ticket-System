//Isak Klaesson - iskl21
const express = require("express");
const multer = require("multer");
const router = express.Router();
const ticket = require("../src/tickets.js");
const path = require("path");
const mysql = require("promise-mysql");
const config_sql = require("../config/ticket.json");
const nodemailer = require('nodemailer');
const config_email = require("../config/email.json");
const config_file = require("../config/file_upload.json");

const transporter = nodemailer.createTransport(config_email);

const email_sender=config_email.auth.user;
  

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'Images');
    },
    filename: (req, file, cb) =>{
        //console.log(file);
        const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, Date.now() + path.extname(fileName) + fileName);
    }
    
})

const upload = multer({
    storage: storage,
 });


const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');


// config for auth0 - the secret is random and can be resused,
// the rest will have to be changed in auth0 or here, follow auth0 guide
const config_SSO = require("../config/SSO.json");


router.use(auth(config_SSO));


router.get('/', async (req, res) => {
  isLoggedIn = req.oidc.isAuthenticated();
    let data = {};
    
    data.title = "Start";
    if(isLoggedIn){
        
        user_role = await ticket.show_role_for_user(req.oidc.user.email);
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
            
            return res.render("pages/noUser.ejs",data);
            
        }
        else{
            data.user_role = user_role[0].user_role;
        }
        
    };

    data.isLoggedIn = isLoggedIn;
    
    res.render("pages/index.ejs", data);
});
  
router.get("/index", async (req, res) => {
    isLoggedIn = req.oidc.isAuthenticated();
    let data = {};
    
    data.title = "Start";
     
    if(isLoggedIn){
        
        user_role = await ticket.show_role_for_user(req.oidc.user.email);
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
            
            return res.render("pages/noUser.ejs",data);
            
        }
        else{
            data.user_role = user_role[0].user_role;
        }
        
    
    };
   
    
    data.isLoggedIn = isLoggedIn;
    
    res.render("pages/index.ejs", data);
});


router.get("/createTicket", requiresAuth(), async (req, res) => {
    let data = {};
    
    data.title = "Create ticket";
    isLoggedIn = req.oidc.isAuthenticated();

    if(isLoggedIn){
        
        user_role = await ticket.show_role_for_user(req.oidc.user.email)
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
            
            return res.render("pages/noUser.ejs",data);
            
        }
        else{
            data.user_role = user_role[0].user_role;
        }
    };

    data.config_file = config_file;
    data.allCategories = await ticket.show_all_categories();
    data.isLoggedIn = isLoggedIn;
    
    
    res.render("pages/createTicket.ejs", data);
});

router.post("/createTicket", upload.array("images", config_file.file_amout), async (req, res) => {    
    req.body.email = req.oidc.user.email;
    
    await ticket.insert_ticket(req.body);

    const db = await mysql.createConnection(config_sql);

    const ticketIdQuery = `SELECT * from tickets ORDER BY id DESC LIMIT 1`;
    const chosen_ticket = await db.query(ticketIdQuery);

    const ticket_id = chosen_ticket[0].id;

        if(req.files){
            for (const file of req.files) {
                const file_name = Buffer.from(file.originalname, 'latin1').toString('utf8');
                
                const file_path = file.path;
                
                await ticket.insert_file(ticket_id, file_name, file_path);
            }
        }
    res.redirect("/allTickets");
});

router.post("/allTickets", async (req, res) => {
    const searchQuery = req.body.s_c;

    res.redirect(`/allTickets?query=${encodeURIComponent(searchQuery)}`);
});


router.get("/allTickets",requiresAuth(), async (req, res) => {
    let data = {};
    
    data.title = "search";
    isLoggedIn = req.oidc.isAuthenticated();

    if(isLoggedIn){
        
        user_role = await ticket.show_role_for_user(req.oidc.user.email)
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
           
            return res.render("pages/noUser.ejs",data);
            
        }
        else{
            data.user_role = user_role[0].user_role;
        }
    };

    data.isLoggedIn = isLoggedIn;
    const searchQuery = req.query.query;
    if(searchQuery)
    {
        if(data.user_role == 'User'){
            
            data.allTickets = await ticket.ticket_info_sok_user(searchQuery, req.oidc.user.email);
        }
        else{
            data.allTickets = await ticket.ticket_info_sok(searchQuery);
        }
        
    }
    else
    {
        if(data.user_role == 'User'){
            data.allTickets = await ticket.show_all_tickets_user(req.oidc.user.email);
        }
        else{
            data.allTickets = await ticket.show_all_tickets();
        }
        
    }

    
    
    res.render("pages/allTickets.ejs", data);
});

router.get("/ticket/:id", requiresAuth(), async (req, res) => {
    let data = {};
    
    data.title = "view ticket";
    isLoggedIn = req.oidc.isAuthenticated();
    data.isLoggedIn = isLoggedIn;
    
    if(isLoggedIn){
        
        user_role = await ticket.show_role_for_user(req.oidc.user.email)
        data.account_email = req.oidc.user.email;
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
           
            return res.render("pages/noUser.ejs",data);
            
        }
        else{
            data.user_role = user_role[0].user_role;
        }
    };

    data.allTickets = await ticket.show_one_ticket(req.params.id);
    data.allfiles = await ticket.show_files_for_ticket(req.params.id);
    data.allComments = await ticket.show_all_comments_for_ticket(req.params.id);
    data.allCategories = await ticket.show_all_categories();
    data.allKnowledge = await ticket.show_knowledge_search(data.allTickets[0].kategori);
    
    res.render("pages/ticket.ejs", data);
    
});


router.post("/ticket/:id", async (req, res) => {
    let data = {};
    
    isLoggedIn = req.oidc.isAuthenticated();
    data.isLoggedIn = isLoggedIn;
    if(isLoggedIn){
        
        user_role = await ticket.show_role_for_user(req.oidc.user.email)
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
          
            return res.render("pages/noUser.ejs",data);
        }
        else{
            data.user_role = user_role[0].user_role;
        }
    };
    const db = await mysql.createConnection(config_sql);

    const ticketIdQuery = `SELECT * from tickets WHERE id=?`;
    const chosen_ticket = await db.query(ticketIdQuery, [req.params.id]);

    const SendToEmail = chosen_ticket[0].user;

    db.end();
    if (req.body.action == "delete"){
        
        const mailOptions = {
            from: email_sender,
            to: SendToEmail,
            subject: 'Ticket Update Notification',
            text: `Hello, your ticket with Id:${req.params.id} has been deleted.`,
        };
        transporter.sendMail(mailOptions);

        await ticket.delete_ticket(req.params.id);
    
        res.redirect("/allTickets");
        }
        
    if (req.body.action == "update"){
        if(data.user_role == "Admin"){
            if(chosen_ticket[0].status != req.body.status){
                mailOptions = {
                    from: email_sender,
                    to: SendToEmail,
                    subject: 'Ticket Update Notification',
                    text: `Hello, your ticket with Id:${req.params.id}'s status has been changed from ${chosen_ticket[0].status} to ${req.body.status}.`,
            };
            transporter.sendMail(mailOptions);
        };
            if(chosen_ticket[0].kategori != req.body.t_category){
                mailOptions = {
                    from: email_sender,
                    to: SendToEmail,
                    subject: 'Ticket Update Notification',
                    text: `Hello, your ticket with Id:${req.params.id}'s category has been changed from ${chosen_ticket[0].kategori} to ${req.body.t_category}.`,
            }
            transporter.sendMail(mailOptions);
            };
            
        }
        

        await ticket.update_ticket(req.body.t_description, req.body.status, req.params.id, req.body.t_category);
        
        res.redirect(`/ticket/${req.params.id}`);
    }
    if (req.body.action == "claim"){
        await ticket.claim_ticket(req.oidc.user.email, req.params.id);
        
        const mailOptions = {
            from: email_sender,
            to: SendToEmail,
            subject: 'Ticket Update Notification',
            text: `Hello, your ticket with Id:${req.params.id} has been claimed by Agent: ${req.oidc.user.email}.`,
        };
        transporter.sendMail(mailOptions);

        res.redirect(`/ticket/${req.params.id}`);
    }
    if (req.body.action == "unclaim"){
        await ticket.unclaim_ticket(req.oidc.user.email, req.params.id);
        
        const mailOptions = {
            from: email_sender,
            to: SendToEmail,
            subject: 'Ticket Update Notification',
            text: `Hello, your ticket with Id:${req.params.id} has been unclaimed.`,
        };
        transporter.sendMail(mailOptions);

        res.redirect(`/ticket/${req.params.id}`);
    }
    
});


router.get("/CreateComment/:id", requiresAuth(), async (req, res) => {
    let data = {};
    
    data.title = "Create Comment";
    isLoggedIn = req.oidc.isAuthenticated();
    data.isLoggedIn = isLoggedIn;
   
    if(isLoggedIn){
        //user-role-identification process
        user_role = await ticket.show_role_for_user(req.oidc.user.email)
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
           
            return res.render("pages/noUser.ejs",data);
        }
        else{
            data.user_role = user_role[0].user_role;
        }
    };
    data.allTickets = await ticket.show_one_ticket(req.params.id);
    data.allComments = await ticket.show_all_comments_for_ticket(req.params.id);
    
    res.render("pages/CreateComment.ejs", data);
});


router.post("/CreateComment/:id", async (req, res) => {
    let data = {};
    const db = await mysql.createConnection(config_sql);

    const ticketIdQuery = `SELECT * from tickets WHERE id=?`;
    const chosen_ticket = await db.query(ticketIdQuery, [req.params.id]);

    const SendToEmailUser = chosen_ticket[0].user;
    const SendToEmailAdmin = chosen_ticket[0].agent;
    db.end();

    if(isLoggedIn){
        //user-role-identification process
        user_role = await ticket.show_role_for_user(req.oidc.user.email)
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
           
            return res.render("pages/noUser.ejs",data);
        }
        else{
            data.user_role = user_role[0].user_role;
        }
    };
    if(data.user_role == "Admin"){
        const mailOptions = {
            from: email_sender,
            to: SendToEmailUser,
            subject: 'Ticket Update Notification',
            text: `Hello, a comment has been made on your ticket with Id:${req.params.id}.`,
            
        };
        transporter.sendMail(mailOptions);
    }
    if(data.user_role == "User" && SendToEmailAdmin != "unassigned"){
        const mailOptions = {
            from: email_sender,
            to: SendToEmailAdmin,
            subject: 'Ticket Update Notification',
            text: `Hello, a comment has been made on a ticket with Id:${req.params.id}.`,
        };
        transporter.sendMail(mailOptions);   
    }

    await ticket.create_comment(req.body, req.params.id, req.oidc.user.email);

    
    res.redirect(`/ticket/${req.params.id}`);
});



router.get("/adminTools", requiresAuth(), async (req, res) => {
    let data = {};
   
    data.title = "adminTools";
    

    isLoggedIn = req.oidc.isAuthenticated();

    if(isLoggedIn){
        //user-role-identification process
        user_role = await ticket.show_role_for_user(req.oidc.user.email)
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
           
            return res.render("pages/noUser.ejs",data);
        }
        else{
            data.user_role = user_role[0].user_role;
        }
    };

    data.isLoggedIn = isLoggedIn;
    
    data.allCategories = await ticket.show_all_categories();
    if(data.user_role == 'User')
    {
        
        res.render("pages/index.ejs", data);
    }
    else
    {
        
        res.render("pages/adminTools.ejs", data);
    }
    
});


router.post("/adminTools", async (req, res) => {
    let data = {};
    
    data.title = "adminTools";
    if(isLoggedIn){
        //user-role-identification process
        user_role = await ticket.show_role_for_user(req.oidc.user.email)
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
            
            return res.render("pages/noUser.ejs",data);
        }
        else{
            data.user_role = user_role[0].user_role;
        }
    };

    
    if(req.body.action == "delete"){
        //console.log(req.body.t_category);
        await ticket.delete_category(req.body.t_category);
    }
    
    if(req.body.action == "create"){
        await ticket.create_category(req.body.n_category);
    }
    if(req.body.action == "create_user"){
        await ticket.create_user(req.body.u_email, req.body.u_role);

    }
    
    data.allCategories = await ticket.show_all_categories();
    
    res.render("pages/adminTools.ejs", data);
});

router.get("/knowledgeBase", async (req, res) => {
    isLoggedIn = req.oidc.isAuthenticated();
    let data = {};
    
    data.title = "knowledgeBase";
     
    if(isLoggedIn){
        //user-role-identification process
        user_role = await ticket.show_role_for_user(req.oidc.user.email);
        if(user_role.length === 0){
            data.isLoggedIn = isLoggedIn;
            
            return res.render("pages/noUser.ejs",data);
            
        }
        else{
            data.user_role = user_role[0].user_role;
        }
        
    
    };
   
    data.isLoggedIn = isLoggedIn;
    data.allCategories = await ticket.show_all_categories();

    const searchQuery = req.query.query;
    if(searchQuery){
        data.allKnowledge = await ticket.show_knowledge_search(searchQuery);
        
    }
    else{
        data.allKnowledge = await ticket.show_knowledge();
    }
    if(data.user_role == 'User')
        {
            
            res.render("pages/index.ejs", data);
        }
        else
        {
            
            res.render("pages/knowledgeBase.ejs", data);
        }
        
    

});


router.post("/knowledgeBase", async (req, res) => {    
    await ticket.create_knowledge(req.body.t_title, req.oidc.user.email, req.body.t_category, req.body.problem, req.body.solution);
            
    res.redirect("knowledgeBase");
});

router.post("/knowledgeBaseSearch", async (req, res) => {
    
    const searchQuery = req.body.search;

    if(searchQuery){
        res.redirect(`/knowledgeBase?query=${encodeURIComponent(searchQuery)}`);
    } 
    else{
        res.redirect("knowledgeBase");
    }
});



module.exports=router;
