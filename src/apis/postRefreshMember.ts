import axios from "axios";

const postRefreshMember = async (updateDay = 7) => {
  try {
    const result = await axios.post(
      `https://wakaserver.megabrain.kr/api/user/update?updateDay=${updateDay}`
    );
    return Promise.resolve(result.data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default postRefreshMember;
