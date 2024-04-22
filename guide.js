const data = {
  "message": "Welcome to the base route",
  "name": "Loveday Ikegbulam",
  "email": "lovedayikegbulam515@gmail.com",
  "projectRepo": "https://github.com/lovedayikegbulam/postify",
  "baseUrl": "https://postify-qra1.onrender.com",
  "Routes": {
    "authRoute": {
      "method": "POST",
      "register": `${data.baseUrl}/api/auth/register`,
      "login": `${data.baseUrl}/api/auth/login`
    },
    "postRoute": {
      "createPost": {
        "method": "POST",
        "url": `${data.baseUrl}/api/posts/create`
      },
      "updatePost": {
        "method": "PATCH",
        "url": `${data.baseUrl}/api/posts/postId`
      },
      "getAllPosts": {
        "method": "GET",
        "url": `${data.baseUrl}/api/posts`
      },
      "getPostById": {
        "method": "GET",
        "url": `${data.baseUrl}/api/posts/postId`
      },
      "deletePost": {
        "method": "DELETE",
        "url": `${data.baseUrl}/api/posts/postId`
      }
    }
  }
}

export default data;
