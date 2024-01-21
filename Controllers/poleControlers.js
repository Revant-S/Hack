const mongoose = require("mongoose")
const cookie = require("cookie-parser")
const PollDb = require("../DBmodels/Poledb");
module.exports.CreatePoll = async (req,res)=>{
    const PollBody = req.body;
    // poll Id Info
    // City-date-category-sequenceofthe day
    try {
        await PollDb.create({
            Pole_Question : PollBody.Pole_Question,
            UpVotes : 0,
            downVotes : 0,
            Poll_State : 0,   
        })
        res.json({msg : "Pole Added to the database"})
    } catch (error) {
        console.log(error);
        res.json({msg: "Some error Occured"})
    }
}
module.exports.PollUpVDownV = async (req,res)=>{
    const updateBody = req.body
    const PoleId = updateBody.poleId  
    /*UpdateBosy Scheme : 
    {
        PoleId : String,
        Upvote : Number,
        DownVote : Number,
    } */
    try {
        const p = await PollDb.findById("65aca42524cb7fc42cdb59e7") // New Function Learnt
        // Always acess the id using the ID functions of mongoose
        await PollDb.findByIdAndUpdate(PoleId, { $inc: { UpVotes: updateBody.Upvote, downVotes: updateBody.Downvote } });
        res.json({msg : "Pole is Updated"})
    } catch (error) {   
        console.log(error);
        res.json({msg : "Some Error Occured!!"})
    }

}