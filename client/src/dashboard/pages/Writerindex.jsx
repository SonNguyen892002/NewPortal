import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import { base_url } from "../../config/config";
import storeContext from "../../context/storeContext";
import news from "../../assets/news.webp";
import NewsDetail from "../components/NewsDetail";

const Writerindex = () => {
  const { store } = useContext(storeContext);
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const totalViews = news.reduce((s, n) => s + (n.count || 0), 0);
  const sortedNews = [...news].sort((a, b) => (b.count || 0) - (a.count || 0));

  const get_news = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setNews(data.news);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_news();
  }, []);

  const [stats, setStats] = useState({
    totalNews: 0,
    pendingNews: 0,
    activeNews: 0,
    deactiveNews: 0,
    totalWriters: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/news-statistics`, {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        });
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (store.token) {
      fetchStats();
    }
  }, [store.token]);

  const [notifications, setNotifications] = useState([]);
  const [openNotifId, setOpenNotifId] = useState(null);
  const notifRef = useRef(null);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(`${base_url}/api/notifications`, {
          headers: { Authorization: `Bearer ${store.token}` },
        });
        setNotifications(data.notifications || []);
      } catch (error) {
        console.log(error);
      }
    };
    if (store.token) fetchNotifications();
  }, [store.token]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotifId(null);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          {
            title: "Writer Total News",
            value: stats.totalNews,
            color: "text-red-500",
          },
          {
            title: "Total Views",
            value: totalViews,
            color: "text-green-500",
          },
          {
            title: "Writer Pending News",
            value: stats.pendingNews,
            color: "text-purple-500",
          },
          {
            title: "Writer Active News",
            value: stats.activeNews,
            color: "text-cyan-500",
          },
          {
            title: "Writer Deactive News",
            value: stats.deactiveNews,
            color: "text-blue-500",
          },
        ].map((start, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-lg shadow-md flex flex-col items-center gap-2"
          >
            <span className={`text-4xl font-bold ${start.color}`}>
              {start.value}
            </span>
            <span className="text-md font-semibold text-gray-600">
              {start.title}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Notifications
        </h3>
        <div className="space-y-3" ref={notifRef}>
          {notifications.slice(0, 5).map((n) => (
            <div
              key={n._id}
              className="p-4 bg-white rounded shadow-sm w-full cursor-pointer"
              onClick={async () => {
                try {
                  if (!n.read) {
                    await axios.put(
                      `${base_url}/api/notification/read/${n._id}`,
                      {},
                      { headers: { Authorization: `Bearer ${store.token}` } },
                    );
                    setNotifications((prev) =>
                      prev.map((p) =>
                        p._id === n._id ? { ...p, read: true } : p,
                      ),
                    );
                  }
                } catch (err) {
                  console.log(err);
                }
                setOpenNotifId(openNotifId === n._id ? null : n._id);
              }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-gray-800">{n.title}</div>
                    {!n.read && (
                      <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />
                    )}
                  </div>
                  {n.newsTitle && (
                    <div className="text-sm text-gray-700 italic">
                      {n.newsTitle}
                    </div>
                  )}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openNotifId === n._id ? "max-h-40 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
                  >
                    <div className="text-sm text-gray-600 mt-2">
                      {n.description || "Người duyệt không để lại lời nhắn!"}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{n.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center pb-4 border-b border-gray-500">
          <h2 className="text-xl font-bold text-gray-600">Popular News</h2>
          <Link
            to="/news"
            className="text-blue-500 hover:text-blue-800 font-semibold transition duration-300"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="py-4 px-6 text-left">No</th>
                <th className="py-4 px-6 text-left">Title</th>
                <th className="py-4 px-6 text-left">Image</th>
                <th className="py-4 px-6 text-left">Category</th>
                <th className="py-4 px-6 text-left">Views</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-left">Preview</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {sortedNews.slice(0, 5).map((n, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{n.title.slice(0, 15)}...</td>
                  <td className="py-4 px-6">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={n.image}
                      alt="news"
                    />
                  </td>
                  <td className="py-4 px-6">{n.category}</td>
                  <td className="py-4 px-6">{n.count}</td>
                  <td className="py-4 px-6">
                    {n.status === "pending" && (
                      <span className="px-2 py-[2px] bg-blue-200 text-blue-800 rounded-md text-xs">
                        {n.status}
                      </span>
                    )}
                    {n.status === "active" && (
                      <span className="px-2 py-[2px] bg-green-200 text-green-800 rounded-md text-xs">
                        {n.status}
                      </span>
                    )}
                    {n.status === "deactive" && (
                      <span className="px-2 py-[2px] bg-red-200 text-red-800 rounded-md text-xs">
                        {n.status}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3 text-gray-500">
                      <button
                        type="button"
                        onClick={() => setSelectedNews(n)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-800"
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedNews && (
        <NewsDetail
          setShow={() => setSelectedNews(null)}
          data={{
            title: selectedNews.title,
            image: selectedNews.image,
            category: selectedNews.category,
            date: selectedNews.date,
            writerName: selectedNews.writerName,
            description: selectedNews.description,
          }}
        />
      )}
    </div>
  );
};

export default Writerindex;
