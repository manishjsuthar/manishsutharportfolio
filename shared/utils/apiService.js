import axios from 'axios';

// export const BASE_URL = `${process.env.BASE_URL}/api` || 'https://harshgoel.me/api';
export const BASE_URL = 'http://localhost:5000/api'
export async function getPersonalDetails() {
  try {
    const { data } = await axios.get(`${BASE_URL}/me`);
    return data;
  } catch (err) {
    return false;
  }
}

export async function getProjectDetails() {
  try {
    const { data } = await axios.get(`${BASE_URL}/getAllProjects`);
    return data;
  } catch (err) {
    return false;
  }
}
export async function getCompanyDetails() {
  try {
    const { data } = await axios.get(`${BASE_URL}/companies`);
    return data;
  } catch (err) {
    return false;
  }
}

export async function getGithubDetails() {
  try {
    const { data } = await axios.get(`https://api.github.com/repos/harshgoel05/another-portfolio`);
    return data;
  } catch (err) {
    return false;
  }
}
