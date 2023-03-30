import axios from "axios";

const postAddMember = async (
  username: string,
  apikey: string,
  organization: string
) => {
  try {
    const result = await axios.post(
      `https://wakaserver.megabrain.kr/api/user/add-user?username=${username}&apikey=${apikey}&organization=${organization}`
    );
    return result.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default postAddMember;
