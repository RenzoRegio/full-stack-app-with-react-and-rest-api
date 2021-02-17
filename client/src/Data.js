export default class Data {
  api(method = "GET") {
    const url = "http://localhost:5000/api/courses";
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    return fetch(url, options);
  }

  async getCourses() {
    const response = await this.api();
    return response.json().then((data) => data);
  }
}
