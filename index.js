   const { v4: uuidv4 } = require('uuid');
   // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
// Generates a random UUID
   
   const express=require('express');
   const methodOveeride=require('method-override');    
   const app=express();
   const path=require('path');
       
   const port=3000;

   app.use(express.json());
   app.use(express.urlencoded({extended:true}));
   app.use(methodOveeride('_method')); // for method override


   app.set('view engine','ejs');
   app.set('views',path.join(__dirname,'views'));
   app.use(express.static(path.join(__dirname,'public')));
   
   let posts=[
      {
         //id:"1a",
         id:uuidv4(),
         username :"John",
         content :"Hello, this is my first post",
         date :"2023-10-01"
      },
      {
        // id:"2b",
         id:uuidv4(),
         username :"mitesh",
         content :"Hello, this is my Second post",
         date :"2023-10-01"
      },
      {  
         //id:"3c",
         id:uuidv4(),
         username :"Soumya",
         content :"Hello, this is my Third post",
         date :"2023-10-02"
      },
   ];

   app.get('/posts',(req,res)=>{
      res.render("index.ejs",{posts:posts});
   });
   app.post('/posts', (req, res) => {
   let { username, content, date } = req.body;
   let id = uuidv4(); // assign uuid to 'id'
   posts.push({ id, username, content, date });
   res.redirect('/posts');
});

app.get('/posts/new', (req, res) => {
  res.render('form.ejs'); // this will render the form to create a new post
});
   app.get('/posts/:id', (req, res) => {
   const { id } = req.params;
   const post = posts.find((p) => p.id === id);

   if (!post) {
      return res.status(404).send("Post not found");
   }
   res.render("Showform.ejs", { post });  // ✅ Fix: pass post to EJS
});

app.patch('/posts/:id',(req,res)=>{
   let {id}=req.params;
   let newcontent=req.body.content;
   const post = posts.find((p) => p.id === id);
   post.content=newcontent;
   console.log(post);
   res.redirect('/posts');
 
});
app.get("/posts/:id/edit",(req,res)=>{
   let { id }=req.params;
   const post = posts.find((p) => p.id === id);
   res.render("edit.ejs",{post:post});
})
app.delete('/posts/:id',(req,res)=>{
   let {id}=req.params;
   posts =posts.filter((p)=>p.id!==id);
   res.redirect('/posts');
})

   app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
   });
