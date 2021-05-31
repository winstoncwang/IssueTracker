"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var IssueFilter = /*#__PURE__*/function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  var _super = _createSuper(IssueFilter);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _super.apply(this, arguments);
  }

  _createClass(IssueFilter, [{
    key: "render",
    value: // eslint-disable-line
    function render() {
      return /*#__PURE__*/React.createElement("div", null, "This is a placeholder for the issue filter.");
    }
  }]);

  return IssueFilter;
}(React.Component);

function IssueRow(props) {
  var issue = props.issue;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.owner), /*#__PURE__*/React.createElement("td", null, issue.created.toDateString()), /*#__PURE__*/React.createElement("td", null, issue.effort), /*#__PURE__*/React.createElement("td", null, issue.due ? issue.due.toDateString() : ''), /*#__PURE__*/React.createElement("td", null, issue.title));
}

function IssueTable(props) {
  var issueRows = props.issues.map(function (issue) {
    return /*#__PURE__*/React.createElement(IssueRow, {
      key: issue.id,
      issue: issue
    });
  });
  return /*#__PURE__*/React.createElement("table", {
    className: "bordered-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Created"), /*#__PURE__*/React.createElement("th", null, "Effort"), /*#__PURE__*/React.createElement("th", null, "Due Date"), /*#__PURE__*/React.createElement("th", null, "Title"))), /*#__PURE__*/React.createElement("tbody", null, issueRows));
} //graphql date iso formatting


var dateRegex = new RegExp(/^\d\d\d\d-\d\d-\d\d/);

function jsonDateReviver(key, value) {
  //reviver for json.parse()
  if (dateRegex.test(value)) {
    return new Date(value);
  }

  return value;
}

var IssueAdd = /*#__PURE__*/function (_React$Component2) {
  _inherits(IssueAdd, _React$Component2);

  var _super2 = _createSuper(IssueAdd);

  // eslint-disable-line
  function IssueAdd() {
    _classCallCheck(this, IssueAdd);

    return _super2.call(this);
  } //use arrowfunction for onSubmit or bind this to handleSubmit in constructor


  _createClass(IssueAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
      event.preventDefault();
      var form = document.forms.issueAdd; //form collection

      var issue = {
        due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 15),
        //set due day to + 15 days from date of submit
        owner: form.owner.value,
        title: form.title.value
      };
      this.props.createIssue(issue);
      form.owner.value = "";
      form.title.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/React.createElement("form", {
        name: "issueAdd",
        onSubmit: function onSubmit(event) {
          _this.handleSubmit(event);
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "owner",
        placeholder: "Owner"
      }), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "title",
        placeholder: "Title"
      }), /*#__PURE__*/React.createElement("button", null, "Add"));
    }
  }]);

  return IssueAdd;
}(React.Component);

var IssueList = /*#__PURE__*/function (_React$Component3) {
  _inherits(IssueList, _React$Component3);

  var _super3 = _createSuper(IssueList);

  // eslint-disable-line
  function IssueList() {
    var _this2;

    _classCallCheck(this, IssueList);

    _this2 = _super3.call(this);

    _defineProperty(_assertThisInitialized(_this2), "createIssue", /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(issue) {
        var query, response, _yield$response$data, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // const query =`mutation{
                //     issueAdd(issue:{
                //         title:"${issue.title}",
                //         owner:"${issue.owner}",
                //         due:"${issue.due.toISOString()}"
                //     })
                //     {id title due}
                // }`
                query = "mutation issueAdd($issue:IssueInputs!){\n            issueAdd(issue:$issue){\n                id\n            }\n        }";
                _context.prev = 1;
                _context.next = 4;
                return axios({
                  method: 'post',
                  url: '/graphql',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                    query: query,
                    variables: {
                      issue: issue
                    }
                  })
                });

              case 4:
                response = _context.sent;
                _context.next = 7;
                return response.data;

              case 7:
                _yield$response$data = _context.sent;
                data = _yield$response$data.data;
                console.log('post response: ' + JSON.stringify(data));

                _this2.loadData();

                _context.next = 16;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 13]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _this2.state = {
      issues: []
    }; //this.createIssue=this.createIssue.bind(this)

    return _this2;
  } //Called after rendering DOM


  _createClass(IssueList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //ComponentDidUpdate() might not initially render
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var query, response, _yield$response$data2, result;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //graphql query
                query = "query {\n            issueList{\n                id title status owner created effort due\n            }\n        }"; //axios through unpkg

                /* eslint-disable */

                _context2.prev = 1;
                _context2.next = 4;
                return axios({
                  /* eslint-disable */
                  method: 'post',
                  url: '/graphql',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  data: JSON.stringify({
                    query: query
                  }),
                  transformResponse: [function (data) {
                    //responseType does not work
                    data = JSON.parse(data, jsonDateReviver);
                    return data;
                  }]
                });

              case 4:
                response = _context2.sent;
                _context2.next = 7;
                return response.data;

              case 7:
                _yield$response$data2 = _context2.sent;
                result = _yield$response$data2.data;
                //console.log(result)
                this.setState({
                  issues: result.issueList
                });
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);
                console.log(JSON.stringify(_context2.t0));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 12]]);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "render",
    value:
    /* eslint-disable */
    function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
        issues: this.state.issues
      }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueAdd, {
        createIssue: this.createIssue
      }));
    }
    /* eslint-disable */

  }]);

  return IssueList;
}(React.Component); // component


var element = /*#__PURE__*/React.createElement(IssueList, null); // load component

ReactDOM.render(element, document.getElementById('contents')); // eslint-disable-line