import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Link, Meta, Links, Outlet, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { Link as Link$1 } from "react-router-dom";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      controls.start({ x: 0 });
    } else {
      controls.start({ x: "-100%" });
    }
  };
  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest(".navbar-links") && !event.target.closest("#toggle-navbar")) {
      toggleNavbar();
    }
  };
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  return /* @__PURE__ */ jsxs("div", { className: "z-50 sticky top-0", children: [
    /* @__PURE__ */ jsx("nav", { className: "w-full shadow-md bg-zinc-950 bg-opacity-60 backdrop-blur", children: /* @__PURE__ */ jsxs("ul", { className: "flex items-center justify-between container list-none px-4 py-2 mx-auto", children: [
      /* @__PURE__ */ jsxs("li", { className: "text-white", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            id: "toggle-navbar",
            className: "p-2 bg-gray-950 rounded-md text-white shadow shadow-black md:hidden",
            onClick: toggleNavbar,
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: "1.5",
                stroke: "currentColor",
                className: "w-6 h-6",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "md:flex gap-5 text-zinc-500 hidden navbar-links", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "router-link-active router-link-exact-active py-2 px-4 text-lg font-bold", children: "Beranda" }),
          /* @__PURE__ */ jsx(Link, { to: "/genre", className: "py-2 px-4 text-lg font-bold", children: "Genre" }),
          /* @__PURE__ */ jsx(Link, { to: "/daftar", className: "py-2 px-4 text-lg font-bold", children: "Daftar isi" }),
          /* @__PURE__ */ jsx("a", { href: "https://trakteer.id/slynnn", className: "py-2 px-4 text-lg font-bold", children: "Trakteer" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("button", { className: "mr-1", children: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            className: "w-6 h-6 text-white font-extrabold",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                fillRule: "evenodd",
                d: "M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z",
                clipRule: "evenodd"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "relative top-1", children: /* @__PURE__ */ jsx("button", { id: "headlessui-menu-button-1", type: "button", "aria-haspopup": "menu", "aria-expanded": "false", children: /* @__PURE__ */ jsx("div", { className: "rounded-full bg-white", children: /* @__PURE__ */ jsx("img", { src: "https://s1.zerochan.net/Delta.%28Kage.No.Jitsuryokusha.Ni.Naritakute%29.600.3834699.jpg", alt: "", className: "object-contain rounded-full w-8 h-8" }) }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: `w-full min-h-screen absolute overflow-hidden z-50 ${isOpen ? "block" : "hidden"}`,
        initial: { x: "-100%" },
        animate: controls,
        exit: { x: "-100%" },
        children: [
          /* @__PURE__ */ jsx("div", { className: "bg-zinc-950 bg-opacity-50 backdrop-blur-md w-3/4 md:w-2/5 lg:w-1/5 min-h-screen", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 text-white navbar-links", children: [
            /* @__PURE__ */ jsx(Link, { to: "/", className: "router-link-active router-link-exact-active py-4 px-4 border-b w-full border-zinc-700 text-lg font-bold", children: "Beranda" }),
            /* @__PURE__ */ jsx(Link, { to: "/genre", className: "py-4 px-4 border-b w-full border-zinc-700 text-lg font-bold", children: "Genre" }),
            /* @__PURE__ */ jsx(Link, { to: "/daftar", className: "py-4 px-4 border-b w-full border-zinc-700 text-lg font-bold", children: "Daftar isi" }),
            /* @__PURE__ */ jsx("a", { href: "https://trakteer.id/slynnn", className: "py-4 px-4 border-b w-full border-zinc-700 text-lg font-bold", children: "Trakteer" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "bg-black opacity-70 backdrop-blur w-full h-full absolute -z-10", onClick: toggleNavbar })
        ]
      }
    )
  ] });
};
const Footer = () => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("div", { className: "bg-zinc-950 bg-opacity-50 rounded-lg mx-auto mt-10", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto text-white py-5", children: /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400", children: [
      /* @__PURE__ */ jsxs("p", { className: "order-2 md:order-1 mt-8 md:mt-0", children: [
        "© Shadow Anime ",
        /* @__PURE__ */ jsx("span", { id: "year", children: currentYear })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "order-1 md:order-2", children: [
        /* @__PURE__ */ jsx(Link$1, { to: "/about", className: "", children: /* @__PURE__ */ jsx("span", { className: "px-2", children: "About us" }) }),
        /* @__PURE__ */ jsx("span", { className: "px-2 border-l", children: /* @__PURE__ */ jsx(Link$1, { to: "/contact", className: "", children: "Contact us" }) }),
        /* @__PURE__ */ jsx("span", { className: "px-2 border-l", children: /* @__PURE__ */ jsx(Link$1, { to: "/privacy", className: "", children: "Privacy Policy" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "text-xs text-zinc-400 container mx-auto py-5 px-5 text-center", children: "This project is a non-profit project. All the content is provided by the third party. We do not own any of the content." })
  ] });
};
function Layout() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("div", { className: "fixed inset-0 w-full h-full bg-black bg-opacity-90 z-negative" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Navbar, {}),
        /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Outlet, {}) }),
        /* @__PURE__ */ jsx(Footer, {})
      ] }),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function Root() {
  return /* @__PURE__ */ jsx(Layout, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Root
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => {
  return [
    { title: "Shiru Anime" },
    { name: "description", content: "Situs Anime Terbaik untuk Mendapatkan Rilis Terbaru" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute h-32 pb-10 w-full z-20", draggable: "", style: { top: 0 } }),
    /* @__PURE__ */ jsxs("div", { className: "container px-4 mx-auto min-h-screen relative", style: { top: 0 }, children: [
      /* @__PURE__ */ jsx("div", { className: "text-white my-4 min-h-[10vh] flex items-center", children: /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-extrabold", children: [
        "Shiru ",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsxs("span", { className: "text-purple-500 flex items-center", children: [
          "Anime",
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "currentColor",
              className: "w-8 h-8 ml-2",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z",
                  clipRule: "evenodd"
                }
              )
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex overflow-x-auto w-full gap-3 py-4", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { className: "text-xs px-4 py-2 rounded-full bg-purple-900 border-purple-500 text-white whitespace-nowrap cursor-pointer", children: "Adult Cast" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "my-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-white", children: [
          /* @__PURE__ */ jsx("h1", { className: "mb-4 text-xl", children: "Recent Release" }),
          /* @__PURE__ */ jsxs("button", { className: "text-xs flex items-center", children: [
            "View More",
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: "1.5",
                stroke: "currentColor",
                className: "w-4 h-4 ml-2",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M8.25 4.5l7.5 7.5-7.5 7.5"
                  }
                )
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex overflow-x-auto gap-2 w-full snap-x scroll-smooth", children: /* @__PURE__ */ jsx("div", { className: "snap-start", children: /* @__PURE__ */ jsxs("div", { className: "mb-5 relative", children: [
          /* @__PURE__ */ jsxs("button", { className: "relative group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[180px]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://gogocdn.net/cover/murai-no-koi-1725457733.png",
                loading: "lazy",
                alt: "Murai no Koi",
                className: "rounded-lg object-cover w-full h-56 transition duration-300 group-hover:opacity-100 opacity-80"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex justify-between items-center w-[150px] lg:w-[180px]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-lg transition-opacity duration-300 group-hover:opacity-0" }),
              /* @__PURE__ */ jsx("span", { className: "bg-white rounded-md text-sm px-2 absolute bottom-1 right-3", children: "EP 5" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "block text-white text-sm mt-2 truncate w-[150px] lg:w-[180px]", children: "Murai no Koi" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 pb-8", children: [
        /* @__PURE__ */ jsx("h1", { className: "mb-4 text-white text-xl", children: "Top Airing" }),
        /* @__PURE__ */ jsx("div", { className: "flex overflow-x-auto gap-2 w-full snap-x scroll-smooth", children: /* @__PURE__ */ jsx("div", { className: "snap-start", children: /* @__PURE__ */ jsxs("div", { className: "mb-5 relative", children: [
          /* @__PURE__ */ jsxs("button", { className: "relative group", children: [
            /* @__PURE__ */ jsx("div", { className: "w-[150px] lg:w-[180px]", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "https://gogocdn.net/cover/murai-no-koi-1725457733.png",
                loading: "lazy",
                alt: "Murai no Koi",
                className: "rounded-lg object-cover w-full h-56 transition duration-300 group-hover:opacity-100 opacity-80"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "relative flex justify-between items-center w-[150px] lg:w-[180px]", children: [
              /* @__PURE__ */ jsx("div", { className: "w-full h-32 absolute bottom-0 bg-gradient-to-t from-black to-transparent rounded-b-lg transition-opacity duration-300 group-hover:opacity-0" }),
              /* @__PURE__ */ jsx("span", { className: "bg-white rounded-md text-sm px-2 absolute bottom-1 right-3", children: "EP 5" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "block text-white text-sm mt-2 truncate w-[150px] lg:w-[180px]", children: "Murai no Koi" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full text-white", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("h1", { className: "mb-4 text-lg", children: "Komik terbaru" }) }),
        /* @__PURE__ */ jsx("div", { className: "mb-3 bg-gray-800 bg-opacity-70 px-3 py-2 rounded-lg", children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/search/Tasuketsu -Fate of the Majority-",
            className: "flex w-full justify-between items-center",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center w-9/12", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "https://gogocdn.net/cover/murai-no-koi-1725457733.png",
                    alt: "Thumbnail",
                    className: "w-12 h-16 lg:w-16 lg:h-20 object-cover rounded-md mr-2"
                  }
                ),
                /* @__PURE__ */ jsx("h1", { className: "font-bold text-base ml-1", children: "Judul -" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end w-3/12 text-right", children: [
                /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-400", children: "03:00 date" }),
                /* @__PURE__ */ jsx("span", { className: "text-purple-400", children: "Chapter" })
              ] })
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const genres = [
  { name: "Action", url: "/genre/action" },
  { name: "Adventure", url: "/genre/adventure" },
  { name: "Comedy", url: "/genre/comedy" },
  { name: "Drama", url: "/genre/drama" },
  { name: "Fantasy", url: "/genre/fantasy" }
];
const GenrePage = () => {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-gray-900 text-white flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold my-8", children: "Genres" }),
    /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap justify-center gap-4", children: genres.map((genre) => /* @__PURE__ */ jsx("li", { className: "bg-gray-800 rounded-lg shadow-lg overflow-hidden", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: genre.url,
        className: "block px-6 py-4 text-lg font-semibold hover:bg-gray-700 transition-colors",
        children: genre.name
      }
    ) }, genre.name)) })
  ] });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: GenrePage
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C_SVBsrX.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-DRh1XFaZ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-BWqu3ihQ.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-DRh1XFaZ.js"], "css": ["/assets/root-ChtCrJTs.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DoTGZgnh.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] }, "routes/genre": { "id": "routes/genre", "parentId": "root", "path": "genre", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/genre-3lN19PPM.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-DRh1XFaZ.js"], "css": [] } }, "url": "/assets/manifest-c054683e.js", "version": "c054683e" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/genre": {
    id: "routes/genre",
    parentId: "root",
    path: "genre",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
