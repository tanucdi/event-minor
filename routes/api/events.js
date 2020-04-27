const express=require('express'),
           fs=require('fs'),
       router=express.Router();

//import event model      
const Event=require('../../models/EventModel');
//multer middleware
const path=require('path');
const multer=require('multer');
const storage=multer.diskStorage({
    destination:'./public/uploads',
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload=multer({
    storage:storage,
    limits:{fileSize:200*1024*1024},
    fileFilter:(req,file,cb)=>{
        checkFileType(file,cb)
    }
})
// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }
  

//route   GET  api/events  get all items

router.get('/', (req, res) => {
    Event.find()
    .then(events=>res.json(events))
    .catch(err=>res.json(err))
});

//route POST  api/events  save a  newevent 
router.post('/',upload.single('event_image'),(req,res)=>{
       console.log(req.file.filename); 
       
    const newEvent=new Event(
        {
            name:req.body.name,
            description:req.body.description,
            event_image:req.file.filename,
            event_date:req.body.event_date,
            event_time:req.body.event_time,
            tag:req.body.tag,
            venue:req.body.venue,
            price:req.body.price
        }
    )
    newEvent.save().then(event=>res.json(event)).catch((err)=>res.json(err));
})


//route delete api/event/:id  delete a event
router.delete('/:id',(req,res)=>{
    Event.findById(req.params.id).then((event)=>{
        imgpath=event.event_image;
        try {
            fs.unlinkSync(imgpath)
            //file removed
          } catch(err) {
            console.error(err)
          }
        event.remove().then(()=>res.json({success:true})).catch((err)=>res.json({success:false,err}))
         
    
    })
})

//route PUT api/event/:id   update a event
router.put('/:id',upload.single('event_image'),(req,res)=>{
    
    Event.findById(req.params.id).then((event)=>{
        event.name=req.body.name;
        event.description=req.body.description;
        event.event_image=req.file.path;
        event.event_date=req.body.event_date;
        event.event_time=req.body.event_time,
        event.tag=req.body.tag,
        event.venue=req.body.venue,
        event.price=req.body.price

        event.save().then(event=>res.json(event)).catch((err)=>res.json(err))
    })
}) 
module.exports=router;      