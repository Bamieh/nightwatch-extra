import util from "util";
import BaseCommand from "../../base-mobile-command";

const MoveMobileElTo = function (nightwatch = null) {
  BaseCommand.call(this, nightwatch);
  this.cmd = "movemobileelto";
};

util.inherits(MoveMobileElTo, BaseCommand);

MoveMobileElTo.prototype.do = function (value) {
  const self = this;

  const options = {
    path: `/session/${this.client.sessionId}/touch/perform`,
    method: "POST",
    data: {
      "actions": [
        { "action": "press", "options": { "element": value.ELEMENT } },
        { "action": "wait", "options": { "ms": 500 } },
        { "action": "moveTo", "options": { "x": this.x, "y": this.y } },
        { "action": "release", "options": {} }]
    }
  };

  this.protocol(options, (result) => {
    if (result.status === 0) {
      self.pass(result.value);
    } else {
      self.fail();
    }
  });
};

/*eslint max-params:["error", 5] */
MoveMobileElTo.prototype.command = function (using, selector, x, y, cb) {
  this.selector = selector;
  this.using = using;
  this.cb = cb;
  this.x = x;
  this.y = y;

  this.successMessage = `Selector '${this.using}:${this.selector}' `
    + `was moved toward {x:${x}, y:${y}} after %d milliseconds.`;
  this.failureMessage = `Selector '${this.using}:${this.selector}' `
    + `was't moved toward {x:${x}, y:${y}} after %d milliseconds.`;

  this.startTime = (new Date()).getTime();

  // Track how many times selector is successfully checked by /element protocol
  this.seenCount = 0;
  this.checkConditions();

  return this;
};

module.exports = MoveMobileElTo;