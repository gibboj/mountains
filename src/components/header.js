"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var Header = function () {
    return (React.createElement("header", { className: " flex justify-end" },
        React.createElement(react_router_dom_1.Link, { className: "rounded-b-md px-3 py-2 ml-2 bg-white text-gray-700 font-medium", to: "/home" }, "Home"),
        React.createElement(react_router_dom_1.Link, { className: "rounded-b-md px-3 py-2 mr-4  ml-2 bg-white text-gray-700 font-medium", to: "/Resume" }, "Resume")));
};
exports.default = Header;
