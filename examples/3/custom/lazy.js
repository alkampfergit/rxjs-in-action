var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
var finished = false;
var SequenceGenerator = /** @class */ (function () {
    function SequenceGenerator(callback, numberOfGeneration) {
        this.callback = callback;
        this.numberOfGeneration = numberOfGeneration;
        this.current = 1;
        console.log("Created sequence generator");
    }
    SequenceGenerator.prototype.Start = function (interval) {
        var _this = this;
        this.timeout = setInterval(function () {
            if (--_this.numberOfGeneration === 0) {
                _this.Stop();
                return;
            }
            _this.callback(_this.current++);
            console.log('Callback called with value ' + _this.current);
        }, interval);
    };
    SequenceGenerator.prototype.Stop = function () {
        clearTimeout(this.timeout);
    };
    return SequenceGenerator;
}());
var myadd = function (a, b) { return a + b; };
var intermediate = 0;
(function () { return __awaiter(_this, void 0, void 0, function () {
    var Rx, source$, subscription;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('start');
                Rx = require('rxjs');
                source$ = Rx.Observable.create(function (o) {
                    console.log('Creating sequence generator');
                    var generator = new SequenceGenerator(function (val) { return o.next(val); }, 15);
                    generator.Start(500);
                })
                    .filter(function (val) { return val % 2 === 0; });
                return [4 /*yield*/, delay(2000)];
            case 1:
                _a.sent();
                subscription = source$.subscribe(function (val) {
                    console.log("Received: ", val);
                });
                // const subscription2 = source$.subscribe(val => {
                //     console.log("Received 2: ", val);
                // });
                return [4 /*yield*/, delay(4000)];
            case 2:
                // const subscription2 = source$.subscribe(val => {
                //     console.log("Received 2: ", val);
                // });
                _a.sent();
                console.log('Proceed to unsubscribe');
                subscription.unsubscribe();
                finished = true;
                return [2 /*return*/];
        }
    });
}); })();
