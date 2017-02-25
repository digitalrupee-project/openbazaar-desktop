import _ from 'underscore';
import moment from 'moment';
import loadTemplate from '../../utils/loadTemplate';
import baseVw from '../baseVw';

export default class extends baseVw {
  constructor(options = {}) {
    if (!options.model) {
      throw new Error('Please provide a model.');
    }

    super(options);

    this._state = {
      showAvatar: true,
      showTimestampLine: true,
      showAsRead: false,
      ...options.initialState || {},
    };

    this.listenTo(this.model, 'change', () => this.render());
  }

  className() {
    return 'convoMessage';
  }

  getState() {
    return this._state;
  }

  setState(state, replace = false, renderOnChange = true) {
    let newState;

    if (replace) {
      this._state = {};
    } else {
      newState = _.extend({}, this._state, state);
    }

    if (renderOnChange && !_.isEqual(this._state, newState)) {
      this._state = newState;
      this.render();
    }

    return this;
  }

  render() {
    loadTemplate('chat/convoMessage.html', (t) => {
      this.$el.html(t({
        ...this.model.toJSON(),
        ...this._state,
        moment,
      }));
    });

    return this;
  }
}