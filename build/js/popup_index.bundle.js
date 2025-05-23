/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  console.log("hello! (find me on src/js/popup/example.js)");

  // recieve message from background.js
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('listener worked', request);
    if (request.msg === "USER_LOGGED_IN") {
      //  To do something
      const loginEl = document.getElementById("login-element");
      loginEl.style.display = "none";
    }
  });

  // TOGGLE VOICELY
  chrome.storage.local.set({
    blacklistWebsites: {}
  }, () => {});
  const closeModalBtn = document.getElementById('close-modal-button');
  closeModalBtn.addEventListener('click', () => {
    window.close();
  });
  const toggleModalBtn = document.getElementById('headlessui-switch-1');
  toggleModalBtn.addEventListener('click', () => {
    let host = '';
    chrome.tabs.query({
      active: true
    }, tabs => {
      const tab = tabs[0];
      host = new URL(tab.url).hostname;
      console.log(host);
    });
    chrome.storage.local.get(['blacklistWebsites'], ({
      blacklistWebsites
    }) => {
      console.log('blacklistWebsites', blacklistWebsites);
      let voicelyEnabled = !blacklistWebsites[host];
      console.log('voicelyEnabled', voicelyEnabled);
      if (voicelyEnabled) {
        chrome.storage.local.set({
          blacklistWebsites: {
            ...blacklistWebsites,
            [host]: true
          }
        }, () => {});
        toggleModalBtn.classList.remove("bg-[#1C64F2]");
        toggleModalBtn.classList.add("bg-gray-200");
        const toggleSpan = document.getElementById('toggle-span');
        toggleSpan.classList.remove("translate-x-5");
        toggleSpan.classList.add("translate-x-0");
      } else {
        chrome.storage.local.set({
          blacklistWebsites: {
            ...blacklistWebsites,
            [host]: false
          }
        }, () => {});
        toggleModalBtn.classList.remove("bg-gray-200");
        toggleModalBtn.classList.add("bg-[#1C64F2]");
        const toggleSpan = document.getElementById('toggle-span');
        toggleSpan.classList.remove("translate-x-0");
        toggleSpan.classList.add("translate-x-5");
      }
    });
  });
});
;

/***/ })

/******/ });