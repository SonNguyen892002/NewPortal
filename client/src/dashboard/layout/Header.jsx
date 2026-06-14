import { useContext, useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import storeContext from "../../context/storeContext";
import { base_url } from "../../config/config";
import axios from "axios";

const Header = () => {
  const { store } = useContext(storeContext);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/profile/${store.userInfo.id}`,
          {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          },
        );
        const { name, image } = response.data.user;
        setName(name);
        setImage(image);
      } catch (error) {
        console.error("Failed to load profile data", error);
      }
    };
    fetchProfile();
  }, [store.userInfo.id, store.token, setName]);

  return (
    <div className="pl-4 fixed w-[calc(100vw-250px)] top-4 z-50">
      <div className="w-full rounded h-[70px] flex justify-between items-center p-4 bg-[#f1f1fb]">
        <h1 className="text-xl md:text-2xl font-semibold capitalize">{store.userInfo?.role}</h1>

        <div className="mr-4">
          <div className="flex gap-x-2">
            <div className="flex flex-col justify-center items-end">
              <span className="font-bold">{store.userInfo?.name}</span>
            </div>
            <img
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
              src={image || profile}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
