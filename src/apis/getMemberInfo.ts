import axios from "axios";

const getMemberInfo = async (day, id: string) => {
  try {
    const result = await axios.get(
      `https://wakaserver.megabrain.kr/api/user/user?day=${day}&id=${id}`
    );
    return Promise.resolve(result.data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export default getMemberInfo;
