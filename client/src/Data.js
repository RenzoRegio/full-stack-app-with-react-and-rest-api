export default class Data {
  api(path, method = "GET") {
    const url = "http://localhost:5000/api" + path;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    return fetch(url, options);
  }

  async getCourses() {
    const response = await this.api("/courses");
    return response.json().then((data) => data);
  }

  async getCourse(courseId) {
    const response = await this.api(`/courses/${courseId}`);
    return response.json().then((data) => data);
  }
}
