import ReviewDAO from "../dao/reviewDAO.js";

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {

            const movie_Id = req.body.movie_id;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            };
            const date = new Date();
            const ReviewResponse = await ReviewDAO.addReview(movie_Id, userInfo, review, date);
            res.json("success");
        }
        catch (e) {
            console.log(e.message);
            res.status(500).json({ error: e.message });
        };
    }
    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const review = req.body.review;
            const date = new Date();
            const ReviewResponse = await ReviewDAO.updateReview(reviewId, req.body.user_id, review, date);
            var { error } = ReviewResponse;
            if (error) {
                res.status.json({ error });
            }
            if (ReviewResponse.modifiedCount == 0) {
                throw new Error("Không thể update. Có thể bạn không phải là người đã tạo review này");
            }
            res.json({ status: "success" });
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
   static async apiDeteleteReview(req, res, next) {
        try {
            const reviewId = req.body.review_id;
            const userId = req.body.user_id;
            const ReviewResponse = await ReviewDAO.deleteReview(reviewId, userId);
            res.json({ status: "success" });
        }

        catch (e) {
            console.log(e.message);
            res.status(500).json({ error: e.message });
        }
    }
}