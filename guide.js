const data = {
  "message": "Welcome to the base route",
  "name": "Loveday Ikegbulam",
  "email": "lovedayikegbulam515@gmail.com",
  "projectRepo": "https://github.com/lovedayikegbulam/postify",
  "Routes": {
    "authRoute": {
      "method": "POST",
      "register": "https://postify-qra1.onrender.com/api/auth/register",
      "login": "https://postify-qra1.onrender.com/api/auth/login"
    },
    "postRoute": {
      "createPost": {
        "method": "POST",
        "url": "https://postify-qra1.onrender.com/api/posts/create"
      },
      "updatePost": {
        "method": "PATCH",
        "url": "https://postify-qra1.onrender.com/api/posts/postId"
      },
      "getAllPosts": {
        "method": "GET",
        "url": "https://postify-qra1.onrender.com/api/posts"
      },
      "getPostById": {
        "method": "GET",
        "url": "https://postify-qra1.onrender.com/api/posts/postId"
      },
      "deletePost": {
        "method": "DELETE",
        "url": "https://postify-qra1.onrender.com/api/posts/postId"
      }
    }
  }
}


export default data;
