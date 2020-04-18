const express=require('express'),
      router=express.Router();

//import event model      
const Event=require('../../models/EventModel');

//route   GET  api/events  get all items

router.get('/', (req, res) => {
    Event.find()
    .then(events=>res.json(events))
    .catch(err=>console.log(err))
});

//route POST  api/events  save a  newevent 
router.post('/',(req,res)=>{
    const newEvent=new Event(
        {
            name:req.body.name,
            event_date:req.body.event_date,
            event_time:req.body.event_time,
            tag:req.body.tag,
            venue:req.body.venue,
            price:req.body.price
        }
    )
    newEvent.save().then(event=>res.json(event)).catch((err)=>console.log(err));
})


//route delete api/event/:id  delete a event
router.delete('/:id',(req,res)=>{
    Event.findById(req.params.id).then((event)=>{
        event.remove().then(()=>res.json({success:true})).catch((err)=>res.json({success:false,err}))
    })
})

//route PUT api/event/:id   update a event
router.put('/:id',(req,res)=>{
    
    Event.findById(req.params.id).then((event)=>{
        event.name=req.body.name;
        event.event_date=req.body.event_date;
        event.event_time=req.body.event_time,
        event.tag=req.body.tag,
        event.venue=req.body.venue,
        event.price=req.body.price

        event.save().then(event=>res.json(event)).catch((err)=>res.json(err))
    })
}) 
module.exports=router;      