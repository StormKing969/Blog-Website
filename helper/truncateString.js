// required to send a local file
module.exports = truncate;

function truncate(str, size) {
    if(str.length <= size) {
        return str;
    }

    return str.slice(0, size) + "...";
}