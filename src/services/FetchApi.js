import Service from "./index";

const FetchApi = async (token,lang, api, payload, query) => {
  try {
    const response = await Service[api](token,lang, payload, query);
    if (response.status !== 200) {
      return {
        success: false,
        message: response.data?.error?.message,
        status: response.status,
        dataBody: {},
      };
    } else {
      return {
        success: true,
        message: response.data?.message,
        status: 200,
        dataBody: response.data || {},
      };
    }
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.status && error.response?.data?.message
          ? error.response.data.message
          : "خطایی در ارسال فایل وجود دارد",
      dataBody: {},
      status: error.response?.status || 500,
    };
  }
};
export default FetchApi;
