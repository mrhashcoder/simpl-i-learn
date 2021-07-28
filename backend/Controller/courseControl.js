const Course = require('../Models/Course');
const User = require('../Models/User');


exports.postCourse = async(req , res) => {
    try {

        const body = req.body;
        console.log(body);
        const courseData = {
            id : body.id,
            title : body.title,
            thumbnail : body.thumbnail,
            price : body.price,
            videoLink : body.videoLink,
        }

        if((courseData.id == null || courseData.title == null || courseData.thumbnail == null || courseData.price == null || courseData.videoLink == null)){
            return res.status(206).json({
                message : "insufficeint data"
            });
        }


        const newCourse = new Course({
            id : courseData.id,
            title : courseData.title,
            thumbnail : courseData.thumbnail,
            price : courseData.price,
            videoLink : courseData.videoLink,
        });
        await newCourse.save();

        return res.status(200).json({
            message : "Course Added",
            id : courseData.id
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}


exports.getCourse = async(req , res) => {
    try {
        const allCourses = await Course.find();

        return res.status(200).json({
            message : "done",
            courses : allCourses
        });

    }catch(err){
        return res.status(500).json({
            message : "Server Error"
        })
    }
}



exports.postBuyCourse = async(req , res) => {
    try {
        const email = req.email;
        const courseId = req.body.courseId;

        const courseFind = await Course.findOne({id : courseId});
        const user = await User.findOne({email : email});  

        user.courses.push(courseFind.id);
        
        await user.save();

        return res.status(200).json({
            message : "Done"
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : "Server Error"
        })
    }
}