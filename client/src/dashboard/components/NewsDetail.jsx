import { IoCloseCircle } from "react-icons/io5";

const NewsDetail = ({ setShow, data }) => {
  if (!data) return null;

  const formattedDescription = data.description?.replace(
    /<iframe\b([^>]*)>/gi,
    (match, attrs) => {
      let newAttrs = attrs;

      // thêm style
      if (/style\s*=/i.test(newAttrs)) {
        newAttrs = newAttrs.replace(
          /style\s*=\s*["']([^"']*)["']/i,
          `style="$1; display:block; margin:0 auto"`,
        );
      } else {
        newAttrs += ` style="display:block; margin:0 auto"`;
      }

      // xử lý sandbox: nếu iframe là YouTube, đảm bảo có allow-scripts và allow-same-origin
      const srcMatch = /src\s*=\s*["']([^"']*)["']/i.exec(newAttrs);
      const src = srcMatch ? srcMatch[1] : "";
      const isYouTube = /youtube\.com|youtu\.be/.test(src);

      if (isYouTube) {
        if (/sandbox\s*=/i.test(newAttrs)) {
          newAttrs = newAttrs.replace(
            /sandbox\s*=\s*["']([^"']*)["']/i,
            (m, value) => {
              let permissions = value.split(" ").filter(Boolean);

              if (!permissions.includes("allow-scripts")) {
                permissions.push("allow-scripts");
              }

              if (!permissions.includes("allow-same-origin")) {
                permissions.push("allow-same-origin");
              }

              return `sandbox="${permissions.join(" ")}"`;
            },
          );
        } else {
          newAttrs += ` sandbox="allow-scripts allow-same-origin"`;
        }
      } else {
        // với iframe không phải YouTube, nếu có sandbox thì ít nhất thêm allow-same-origin & allow-scripts
        if (/sandbox\s*=/i.test(newAttrs)) {
          newAttrs = newAttrs.replace(
            /sandbox\s*=\s*["']([^"']*)["']/i,
            (m, value) => {
              let permissions = value.split(" ").filter(Boolean);
              if (!permissions.includes("allow-scripts"))
                permissions.push("allow-scripts");
              if (!permissions.includes("allow-same-origin"))
                permissions.push("allow-same-origin");
              return `sandbox="${permissions.join(" ")}"`;
            },
          );
        }
      }

      return `<iframe${newAttrs}>`;
    },
  );

  return (
    <div className="w-screen h-screen fixed left-0 top-0 z-[9999]">
      <div className="w-full h-full relative">
        <div className="bg-black opacity-40 w-full h-full absolute top-0 left-0 z-[998]" />
        <div className="absolute bg-white w-[64%] rounded-lg h-[85vh] overflow-y-auto left-[50%] top-[50%] z-[999] -translate-x-[50%] -translate-y-[50%] shadow-2xl">
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
                dangerouslySetInnerHTML={{ __html: formattedDescription }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
