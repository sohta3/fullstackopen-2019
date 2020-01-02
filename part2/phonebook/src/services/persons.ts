import axios from "axios";
import { Person } from "../index";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (newObject: Person) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const update = (id: number, newObject: Person) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const destroy = (targetObject: Person) => {
  const request = axios.delete(`${baseUrl}/${targetObject.id}`, {
    data: targetObject
  });
  return request.then(response => response.data);
};

export default {
  getAll,
  create,
  update,
  destroy
};
