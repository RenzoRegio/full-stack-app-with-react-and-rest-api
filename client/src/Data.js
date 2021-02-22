export default class Data {
  /**
   * Sends the request to the back-end and returns the output of the request.
   * @param {String} path - The path that is added on the base url which determines the route as to where the request is being sent to.
   * @param {String} method - Specifies the type of request we will use for the current action / function being executed.
   * @param {Object} body - If body is not null, then it will add a body to the options object which is sent to the back-end for the request.
   * @param {Boolean} requiresAuth - Determines if the current route requires authentication. If true, then it would add an authorization header to the options object sent to the back-end for the request.
   * @param {Object} credentials - Object that would contain the credentials needed such as the emailAddress and Password for the user to be authenticated in the back-end.
   */

  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = "http://localhost:5000/api" + path;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:` + `${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  /**
   * Returns a list of courses from the database.
   */

  async getCourses() {
    const response = await this.api("/courses");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  /**
   * Returns a course that is associated with the course ID specified as the id parameter in the path.
   * @param {String} path - String containing /courses/:id which is sent to the api function as the path to send a request to and retrieve the information required.
   */

  async getCourse(path) {
    const response = await this.api(path);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 400) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * Returns the currently authenticated user.
   * @param {String} emailAddress - Email String that is sent to the api function as credentials for the user to be authenticated in the authenticateUser middleware in the REST API.
   * @param {String} password - Password String that is sent to the api function as credentials for the user to be authenticated in the authenticateUser middleware in the REST API.
   */

  async getUser(emailAddress, password) {
    const response = await this.api("/users", "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * Creates a new user.
   * @param {Object} user - User object that contains the user's first name, last name, email address and password.
   */

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Creates a new course.
   * @param {Object} course - Course object that contains the title, description, estimatedTime, materialsNeeded, and userId.
   * @param {String} emailAddress - Email String that is sent to the api function as credentials for the user to be authenticated in the authenticateUser middleware in the REST API.
   * @param {String} password - Password String that is sent to the api function as credentials for the user to be authenticated in the authenticateUser middleware in the REST API.
   */

  async createCourse(course, emailAddress, password) {
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Deletes the corresponding course determined by the id parameter.
   * @param {Number} id - The id that is associated with the current course that will be deleted / destroyed from the database.
   * @param {String} emailAddress - Email String that is sent to the api function as credentials for the user to be authenticated in the authenticateUser middleware in the REST API.
   * @param {String} password - Password String that is sent to the api function as credentials for the user to be authenticated in the authenticateUser middleware in the REST API.
   */

  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else {
      throw new Error();
    }
  }

  /**
   * Updates the corresponding course determined by the id parameter.
   * @param {Number} id - The id that is associated with the current course that will be deleted / destroyed from the database.
   * @param {Object} course - Course object that contains the title, description, estimatedTime, and materialsNeeded that is being updated.
   * @param {String} emailAddress - Email String that is sent to the api function as credentials for the user to be authenticated in the authenticateUser middleware in the REST API.
   * @param {String} password - Password String that is sent to the api function as credentials for the user to be authenticated in the authenticateUser middleware in the REST API.
   */

  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else if (response.status === 403) {
      throw new Error();
    }
  }
}
