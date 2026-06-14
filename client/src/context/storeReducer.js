import React from "react";
import decode_token from "../utils";

const storeReducer = (state, action) => {
  const { type, payload } = action;

  if (type === "login_success") {
    return {
      ...state,
      token: payload.token,
      userInfo: decode_token(payload.token),
    };
  }

  if (type === "logout") {
    return {
      token: "",
      userInfo: "",
    };
  }
  
  return state;
};

export default storeReducer;
