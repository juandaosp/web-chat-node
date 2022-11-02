import fetch from "node-fetch";

describe("get messages", () => {
  it("status 200 and messages list not empty", (done) => {
    fetch("http://localhost:3000/messages").then(async (response) => {
      const jsonResponse = await response.json();
      expect(response.status).toEqual(200);
      expect(jsonResponse.length).toBeGreaterThan(0);
      return response;
    }).catch(err => {
      console.error("error while getting message list", err.message);
    }).finally(() => {
      done();
    })
  });
});

describe("get messages from a user", () => {
      
  it("should be 200 ok", (done) => {
    fetch("http://localhost:3000/messages/Juan").then(async (response) => {
      const jsonResponse = await response.json();
      expect(response.status).toEqual(200);
      expect(jsonResponse.length).toBeGreaterThan(0);
      return response;
    }).catch(err => {
      console.error("error while getting message list", err.message);
    }).finally(() => {
      done();
    })
  });
  it("the name should match", (done) => {
    fetch("http://localhost:3000/messages/Juan").then(async (response) => {
      const jsonResponse = await response.json();
      expect(jsonResponse[0].name).toEqual("Juan");
      return response;
    }).catch(err => {
      console.error("error gett", err.message);
    }).finally(() => {
      done();
    })
  });
});