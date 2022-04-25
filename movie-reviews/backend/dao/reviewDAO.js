import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let reviews;
export default class ReviewDAO {
    static async injectDB(conn) {
        if (reviews)
            return;
        else {
            try {
                reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
            }
            catch (e) {
                console.error(`Không thể thiết lập kết nối trong ReviewDAO:${e}`);
            }
        }
    }
    static async addReview(movieId,user,review,date)
    {
        try{
            const reviewDoc={
                name:user.name,
                user_id: user._id,
                date:date,
                review:review,
                movie_id:ObjectId(movieId)
            }
            console.log(reviewDoc);
            return await reviews.insertOne(reviewDoc);
        }
        catch(e)
        {
            console.error(`Không thể post review: ${e}`);
            return {error: e};
        }
    }
    static async updateReview(reviewId,userId,review,date)
    {
        try{
            var updateResponse=await reviews.
            updateOne({ user_id: userId, _id: ObjectId(reviewId) },{ $set: { review: review, date: date } });
            return updateResponse;
        }
        catch(e)
        {
            console.error(`Không thể cập nhật review:${e}`);
            return {error:e};
        }
    }
    static async deleteReview(reviewId,userId)
    {
        try
        {
            const deleteResponse=await reviews.deleteOne({_id:ObjectId(reviewId), user_id:userId,});
            return deleteResponse;
        }
        catch(e)
        {
            console.error(`Không thể xóa review: ${e}`);
            return {error:e};
        }
    }
}