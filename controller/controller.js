const { response, request } = require("../app");
const {
  fetchCategories,
  fetchReviews,
  updateReviews,
  fetchUsers,
fetchAllReviews, fetchComments} = require("../model/model");

exports.returnCategories = (request, response, next) => {
  fetchCategories()
    .then((categories) => {
      response.status(200).send({ categories });
    })
    .catch((error) => {
      next(error);
    });
};

exports.returnReviews = (request, response, next) => {
  const { review_id } = request.params;
  fetchReviews(review_id)
    .then((review) => {
      response.status(200).send({ review });
    })
    .catch((error) => {
      next(error);
    });
};

exports.returnUpdatedReviews = (request, response, next) => {
  const { review_id } = request.params;
  const { inc_votes } = request.body;
  updateReviews(review_id, inc_votes)
    .then((newReview) => {
      response.status(200).send({ review: newReview });
    })
    .catch((error) => {
      console.log(error)
      next(error);

    });
};

exports.returnUsers = (request, response) => {
  fetchUsers().then((users) => {
    response.status(200).send({ users });
  });
};

exports.returnAllReviews = (request, response) => {
  fetchAllReviews().then((reviews) => {
    response.status(200).send({ reviews });
  });
};

exports.returnComments = (request, response, next) => {
  const {review_id} = request.params 

  Promise.all([fetchReviews(review_id), fetchComments(review_id)])
    .then(([, review_idComments]) => {
      console.log(review_idComments)
			response.status(200).send({ review_idComments });
		})
		.catch((error) => {
			next(error);
		});
}
