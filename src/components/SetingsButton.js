import React from 'react';
import PropTypes from 'prop-types';

class SettingsButton extends React.Component {
  render() {
    const { handleSettingsButton } = this.props;
    return (
      <div>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ handleSettingsButton }
        >
          settings

        </button>
      </div>
    );
  }
}

SettingsButton.propTypes = {
  handleSettingsButton: PropTypes.func.isRequired,
};

export default SettingsButton;
