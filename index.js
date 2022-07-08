import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Platform } from 'react-native';
import Modal from 'react-native-modal';
import Hcaptcha from './Hcaptcha';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

class ConfirmHcaptcha extends PureComponent {
  state = {
    show: false,
  };
  show = () => {
    this.setState({ show: true });
  };
  hide = () => {
    const { onMessage } = this.props;
    this.setState({ show: false });
    // In android on hardware back , emits 'cancel' which can be used to hide hCaptcha modal using ref
    if (Platform.OS === "android") {
      onMessage({ nativeEvent: { data: 'cancel' } });
    }
  };
  render() {
    let { show } = this.state;
    let {
      siteKey,
      passiveSiteKey,
      baseUrl,
      languageCode,
      onMessage,
      cancelButtonText,
      showLoading,
      backgroundColor,
      loadingIndicatorColor,
      theme,
      rqdata,
      customLoader
    } = this.props;
    return (
      <Modal
        useNativeDriver
        hideModalContentWhileAnimating
        deviceHeight={height}
        deviceWidth={width}
        style={[styles.modal, {display: passiveSiteKey ? 'none' : undefined}]}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={this.hide}
        onBackButtonPress={this.hide}
        isVisible={show}
        hasBackdrop={!passiveSiteKey}
      >
        <SafeAreaView style={[styles.wrapper, { backgroundColor }]}>
          <Hcaptcha
            url={baseUrl}
            siteKey={siteKey}
            onMessage={onMessage}
            languageCode={languageCode}
            cancelButtonText={cancelButtonText}
            showLoading={showLoading}
            loadingIndicatorColor={loadingIndicatorColor}
            backgroundColor={backgroundColor}
            theme={theme}
            rqdata={rqdata}
            customLoader={customLoader}
          />
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  modal: { margin: 0, display: 'none' },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

ConfirmHcaptcha.propTypes = {
  siteKey: PropTypes.string.isRequired,
  passiveSiteKey: PropTypes.bool,
  baseUrl: PropTypes.string,
  onMessage: PropTypes.func,
  languageCode: PropTypes.string,
  cancelButtonText: PropTypes.string,
  backgroundColor: PropTypes.string,
  showLoading: PropTypes.bool,
  loadingIndicatorColor: PropTypes.string,
  theme: PropTypes.string,
  rqdata: PropTypes.string,
};

ConfirmHcaptcha.defaultProps = {
  passiveSiteKey: false,
  showLoading: false,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  loadingIndicatorColor: null,
  theme: 'light',
  rqdata: null,
};

export default ConfirmHcaptcha;
