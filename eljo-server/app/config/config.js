const BASE_URL = '/api/v1';

const Response = {
    success: (response, data) => {
      response.status(200).json(data);
    },
    created: (response, data) => {
      response.status(201).json(data);
    },
    no_content: (response) => {
      response.status(204).end();
    },
    bad_request: (response, data) => {
      response.status(400).json(data);
    },
    unauthorized: (response, data) => {
      response.status(401).json(data);
    },
    forbidden: (response, data) => {
      response.status(403).json(data);
    },
    not_found: (response, data) => {
      response.status(404).json(data);
    },
    internal_server_error: (response, data) => {
      response.status(500).json(data);
    },
  };


module.exports = { BASE_URL, Response }