import request from '../utils/request'
import qs from 'qs'

const baseURL = 'http://localhost:8080'

export async function query(payload) {
  let params = qs.stringify(payload.searchModel) + "&" + qs.stringify(payload.pageInfoModel)
  let url = `${baseURL}/api/user/query?${params}`
  let options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  return request(url, options);
}

export async function create(payload) {
  let url = `${baseURL}/api/user/create`
  let options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request(url, options);
}

export async function update(payload) {
  let url = `${baseURL}/api/user/update`
  let options = {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request(url, options);
}

export async function remove(payload) {
  let url = `${baseURL}/api/user/delete?id=${payload}`
  let options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request(url, options);
}

export async function importUser() {
  let url = `${baseURL}/api/user/import`
  let options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request(url, options);
}

export async function exportUser() {
  let url = `${baseURL}/api/user/export`
  let options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return request(url, options);
}
