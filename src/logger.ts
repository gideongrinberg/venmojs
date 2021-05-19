const HEADER = "\033[95m";
const OKBLUE = "\033[94m";
const OKGREEN = "\033[92m";
const WARNING = "\033[93m";
const FAIL = "\033[91m";
const ENDC = "\033[0m";
const BOLD = "\033[1m";
const UNDERLINE = "\033[4m";

function _log_with_color(color: string, msg: string) {
    console.log(`${color} ${msg} ${ENDC}`);
}

function warn(msg: string) {
    _log_with_color(WARNING, msg);
}

function info(msg: string) {
    _log_with_color("", msg);
}

function error(msg: string) {
    _log_with_color(FAIL, msg);
}

function success(msg: string) {
    _log_with_color(OKGREEN, msg);
}

export { warn, info, success, error };
