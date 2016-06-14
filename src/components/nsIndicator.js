import React from 'react';
import VertoBaseComponent from './vertobasecomponent.js';
import {
//SignalNoneIconSVG,
SignalMediumIconSVG,
SignalFullIconSVG,
SignalLowIconSVG,
CaretUpIconSVG,
CaretDownIconSVG } from './svgIcons';
import { FormattedMessage } from 'react-intl';


const propTypes = {
  allowDisplayDetails : React.PropTypes.bool,
  cbClick : React.PropTypes.func,
  compStyle : React.PropTypes.object,
  networkData : React.PropTypes.object.isRequired
};

const defaultProps = {
  allowDisplayDetails : true
};

class NetworkStatusIndicator extends VertoBaseComponent {
  constructor(props) {
    super(props);
    this.state = {'dropdownDisplayed': false};

    this.toggleDisplay = this.toggleDisplay.bind(this);

    NetworkStatusIndicator.toggleNetworkStatus = this.toggleDisplay.bind(this);
    NetworkStatusIndicator.closeNetworkStatus = this.closeDisplay.bind(this);
  }

  getCompStyle() {
    return this.props.compStyle;
  }

  getDefaultStyle(styleName) {
    const styles = {
      container: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center'
      },
      iconsContainer: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center'
      },
      icon: {
        height: '24px',
        width: '24px'
      },
      caret: {
        fill: '#fff',
        flexGrow: 1,
        height: '17px',
        width: '19px'
      },
      menu: {
        position: 'absolute',
        zIndex: 1,
        //minWidth: '250px',
        top: '40px',
        right: '20px',
        display: this.state.dropdownDisplayed ? 'flex' : 'none',
        flexDirection: 'column',
        //padding: '10px',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,.25)'
      },
      header: {
        display: 'flex',
        justifyContent: 'center',
        color: '#4a4a4a',
        fontSize: '14px',
        fontWeight: '700',
        padding: '5px',
        paddingTop: '10px',
        paddingBottom: '10px',
        margin: '0px',
        borderBottom: '1px solid #ebebeb',
        backgroundColor: '#F7F7F7',
        fontFamily: 'sans-serif'
      },
      li: {
        minWidth: '250px',
        color: '#333',
        fontSize: '14px',
        fontWeight: 400,
        fontFamily: 'Helvetica',
        padding: '5px',
        paddingLeft: '15px',
        paddingRight: '15px'
      }

    };

    return (styles[styleName]);
  }

  toggleDisplay() {
    this.setState({...this.state,'dropdownDisplayed': !this.state.dropdownDisplayed});
  }

  closeDisplay() {
    //console.log('$$$$$$ Close NetworkStatusIndicator!!!!');
    this.setState({...this.state,'dropdownDisplayed': false});
  }

  render() {

    //console.log('&&&&&&&&&&&&& this.props.compStyle', this.props.compStyle);

    let bwp = 4;
    const networkData = this.props.networkData;
    if(networkData.upkpbs < 2000) {
      bwp--;
    }
    if(networkData.downkpbs < 2000) {
      bwp--;
    }

    let icon;
    switch(bwp) {
        case 4:
            icon = (<SignalFullIconSVG svgStyle={{...this.getStyle('icon'), fill: '#4CAF50'}} />);
            break;
        case 3:
            icon = (<SignalMediumIconSVG svgStyle={{...this.getStyle('icon'), fill: 'yellow'}} />);
            break;
        default:
            icon = (<SignalLowIconSVG svgStyle={{...this.getStyle('icon'), fill: 'red'}} />);
    }

    const caret = this.state.dropdownDisplayed ? (<CaretUpIconSVG svgStyle={this.getStyle('caret')}/>)
    : (<CaretDownIconSVG svgStyle={this.getStyle('caret')}/>);

    const iconsContainer = (
      <div
          networkData={this.networkData}
          style={this.getStyle('iconsContainer')}
          onClick={this.props.cbClick}
      >
        {icon}
        {caret}
      </div>
    );

    const menuContainer = (

      <div className="menuContainer" style={this.getStyle('menu')} >
        <div style={this.getStyle('header')} >
            <FormattedMessage id="BANDWIDTH_INFO" />
        </div>
        <div
            style={this.getStyle('li')}
            className="upkpbs"
        >
          <FormattedMessage id="BANDWIDTH_INFO_OUTGOING" /> {this.props.networkData.upkpbs}
        </div>
        <div
            style={this.getStyle('li')}
        >
          <FormattedMessage id="BANDWIDTH_INFO_INCOMING" /> {this.props.networkData.downkpbs}
        </div>
        <div
            style={this.getStyle('li')}
        >
            <FormattedMessage id="BANDWIDTH_INFO_VIDEO_RES" /> {this.props.networkData.vidQual}
        </div>
      </div>
    );

    let nsi;
    if(this.props.allowDisplayDetails) {
      nsi =
        (<div
            style={this.getStyle('container')}
            onClick={
              this.toggleDisplay
            }
         >
          {iconsContainer}
          {menuContainer}
        </div>);
    } else {
      return icon;
    }

    return (
      nsi
    );
  }
}

NetworkStatusIndicator.propTypes = propTypes;
NetworkStatusIndicator.defaultProps = defaultProps;
export default NetworkStatusIndicator;
