Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'src/components/toast-view/toast.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width;

var ToastView = function (_React$PureComponent) {
  _inherits(ToastView, _React$PureComponent);

  function ToastView(props) {
    _classCallCheck(this, ToastView);

    var _this = _possibleConstructorReturn(this, (ToastView.__proto__ || Object.getPrototypeOf(ToastView)).call(this, props));

    _this.startShowAnimation = function () {
      _this.state.fadeValue.setValue(0);
      _reactNative.Animated.timing(_this.state.fadeValue, {
        toValue: 1,
        duration: 250,
        easing: _reactNative.Easing.linear
      }).start(function () {
        return _this.timer();
      });
    };

    _this.startHideAnimation = function () {
      _this.state.fadeValue.setValue(1);
      _reactNative.Animated.timing(_this.state.fadeValue, {
        toValue: 0,
        duration: 250,
        easing: _reactNative.Easing.linear
      }).start();
    };

    _this.timer = function () {
      clearTimeout(_this._timerId);
      _this._timerId = setTimeout(function () {
        return _this.props.onFinish();
      }, 2000);
    };

    _this._timerId = null;
    _this.state = {
      fadeValue: new _reactNative.Animated.Value(0),
      text: props.text,
      show: props.show
    };
    return _this;
  }

  _createClass(ToastView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          show = _props.show,
          text = _props.text;

      if (typeof show !== 'undefined') {
        this.setState({ show: show, text: text });
        if (show) {
          this.startShowAnimation();
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var show = nextProps.show,
          text = nextProps.text;

      if (typeof show !== 'undefined' && show !== this.state.show) {
        this.setState({ show: show, text: text });
        if (show) {
          this.startShowAnimation();
        } else {
          this.startHideAnimation();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._timerId && clearTimeout(this._timerId);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          style = _props2.style,
          contentStyle = _props2.contentStyle,
          textStyle = _props2.textStyle,
          imageStyle = _props2.imageStyle,
          _props2$showPosition = _props2.showPosition,
          showPosition = _props2$showPosition === undefined ? 'bottom' : _props2$showPosition,
          image = _props2.image,
          children = _props2.children;
      var text = this.state.text;

      var position = { justifyContent: 'flex-end' };
      if (showPosition === 'top') {
        position = { justifyContent: 'flex-start' };
      } else if (showPosition === 'center') {
        position = { justifyContent: 'center' };
      }
      return _react2.default.createElement(
        _reactNative.View,
        { style: [styles.container, style, position], pointerEvents: 'none', __source: {
            fileName: _jsxFileName,
            lineNumber: 118
          }
        },
        _react2.default.createElement(
          _reactNative.Animated.View,
          {
            style: [styles.textBg, contentStyle, {
              opacity: this.state.fadeValue
            }],
            __source: {
              fileName: _jsxFileName,
              lineNumber: 119
            }
          },
          typeof image === 'number' && _react2.default.createElement(_reactNative.Image, { style: [styles.image, imageStyle], source: image, __source: {
              fileName: _jsxFileName,
              lineNumber: 128
            }
          }),
          children,
          text ? _react2.default.createElement(
            _reactNative.Text,
            { style: [styles.text, textStyle], __source: {
                fileName: _jsxFileName,
                lineNumber: 130
              }
            },
            text
          ) : null
        )
      );
    }
  }]);

  return ToastView;
}(_react2.default.PureComponent);

ToastView.propTypes = {
  style: _reactNative.ViewPropTypes.style,
  contentStyle: _reactNative.ViewPropTypes.style,
  textStyle: _reactNative.Text.propTypes.style,
  imageStyle: _reactNative.Image.propTypes.style,
  text: _propTypes2.default.string,
  show: _propTypes2.default.bool.isRequired,
  onFinish: _propTypes2.default.func.isRequired,
  showPosition: _propTypes2.default.oneOf(['top', 'bottom', 'center']),
  image: _propTypes2.default.number,
  children: _propTypes2.default.any
};
ToastView.defaultProps = {
  style: null,
  contentStyle: null,
  textStyle: null,
  imageStyle: null,
  text: '',
  showPosition: 'bottom',
  image: null,
  children: null
};


var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    width: width,
    top: 0
  },

  textBg: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    marginBottom: 64,
    paddingHorizontal: 24,
    paddingVertical: 10
  },

  image: {
    marginBottom: 6
  },

  text: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center'
  }
});

exports.default = ToastView;