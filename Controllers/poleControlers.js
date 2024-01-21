const mongoose = require("mongoose")
const User = require("../DBmodels/UserModel")
const cookies = require("cookie-parser")
const PollDb = require("../DBmodels/Poledb");
function Search() {
    
}

module.exports.CreatePoll = async (req,res)=>{
    const PollBody = req.body;
    // poll Id Info
    // City-date-category-sequenceofthe day
    try {
        await PollDb.create({
            Pole_Question : PollBody.Pole_Question,
            UpVotes : 0,
            downVotes : 0,
            Poll_State : 0   
        })
        res.json({msg : "Pole Added to the database"})
    } catch (error) {
        console.log(error);
        res.json({msg: "Some error Occured"})
    }
}
module.exports.PollUpVDownV = async (req,res)=>{
    const updateBody = req.body
    const PoleId = updateBody.PoleId  
    console.log(PoleId);
    
    /*UpdateBosy Scheme : 
    {
        PoleId : String,
        Upvote : Number,
        DownVote : Number,
    } */
    try {
        const UserCookie = req.cookies
        const Userjwt = UserCookie.jwt;
        const UserId = jwt.decode(Userjwt)
        const p = await PollDb.findById(PoleId) // New Function Learnt
        const UserArr = User.findById(UserId , {_id : 0, ParticipatedPoles: 1})
        // Always acess the id using the ID functions of mongoose
        const z = await PollDb.findByIdAndUpdate(PoleId, { $inc: { UpVotes: updateBody.Upvote, downVotes: updateBody.DownVote } });
   
        res.json({msg : "Pole is Updated"})
      
        const updatedUser = await User.findByIdAndUpdate(UserId,{ $push: { ParticipatedPoles: poleId } },{ new: true })
        
    } catch (error) {   
        console.log(error);
        res.json({msg : "Some Error Occured!!"})
    }

}