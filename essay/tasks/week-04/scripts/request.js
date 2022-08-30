var Methods;
(function (Methods) {
    Methods["GET"] = "GET";
})(Methods || (Methods = {}));
async function request(method, url) {
    let res = await fetch(url, {
        method
    });
    let json = await res.json();
    return json;
}
export function get(url) {
    return request(Methods.GET, url);
}
//# sourceMappingURL=request.js.map