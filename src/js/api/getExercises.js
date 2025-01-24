import axios from "axios";

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api/'

export async function getExercises(filter, page, limit) {
  const params = {
    filter,
    page,
    limit,
  };
  const result = await axios.get('filters', {params})
  return result.data;
}