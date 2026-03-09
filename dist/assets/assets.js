"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SET_CORE_URI = exports.PROVIDERS_JSON = void 0;
const providers_json_1 = __importDefault(require("./providers.json"));
exports.PROVIDERS_JSON = providers_json_1.default;
const set_core_json_1 = __importDefault(require("./set-core.json"));
exports.SET_CORE_URI = set_core_json_1.default;
