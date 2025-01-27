import axios from "axios";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api/'

export async function getExercisesByFilter(filter, page, limit) {
  try {
    const params = {
      filter,
      page,
      limit,
    };
    const result = await axios.get('filters', {params})
    return result.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later!',
      position: 'topRight',
      timeout: 4000,
    })
  }
}

export async function searchExercises(params) {
  try {
    const response = await axios.get('exercises', {params});
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later!',
      position: 'topRight',
      timeout: 4000,
    })
  }
}