import { IoCloseCircle } from "react-icons/io5";

const NewsDetail = ({ setShow, data }) => {
  if (!data) return null;

  return (
    <div className="w-screen h-screen fixed left-0 top-0 z-[9999]">
      <div className="w-full h-full relative">
        <div className="bg-black opacity-40 w-full h-full absolute top-0 left-0 z-[998]" />
        <div className="absolute bg-white w-[50%] rounded-lg h-[85vh] overflow-y-auto left-[50%] top-[50%] z-[999] -translate-x-[50%] -translate-y-[50%] shadow-2xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-lg z-10">
            <h2 className="text-lg font-semibold">News Preview</h2>
            <button
              onClick={() => setShow(false)}
              className="text-3xl text-gray-500 hover:text-gray-800 transition"
              aria-label="Close detail modal"
            >
              <IoCloseCircle />
            </button>
          </div>

          <div className="flex flex-col gap-y-5 bg-white">
            {data.image && (
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-auto object-cover"
              />
            )}

            <div className="flex flex-col gap-y-4 px-6 pb-6">
              {data.category && (
                <h3 className="text-red-700 uppercase font-medium text-xl">
                  {data.category}
                </h3>
              )}

              <h2 className="text-3xl text-gray-700 font-bold">{data.title}</h2>

              {(data.date || data.writerName) && (
                <div className="flex gap-x-2 text-xs font-normal text-slate-600">
                  {data.date && <span className="font-bold">{data.date}</span>}
                  {data.writerName && (
                    <span className="font-bold">By {data.writerName}</span>
                  )}
                </div>
              )}

              <div
                className="text-base text-gray-800 leading-8 tracking-normal prose prose-sm max-w-none overflow-x-auto"
                style={{
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  width: "100%",
                }}
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
