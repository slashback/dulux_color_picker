import React from 'react'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField'
import { hexToRgb, findSimilarColor } from './actions'

const DULUX_URL = "https://www.dulux.ru/ru/colour-details/"

const ColorPicker = React.createClass({

  childContextTypes: {
	  muiTheme: React.PropTypes.object.isRequired
	},

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  },

  getInitialState() {
  	return {
  		resultUrl: {
  			href: "",
  			title: "",
  		},
  	}
  },


  handleChange(e) {
  	const hexColor = e.target.value
  	const rgbColor = hexToRgb(hexColor)
  	if (rgbColor !== null) {
  		this.setState({
  			targetColor: hexColor,
  		})
  		const similar = findSimilarColor(rgbColor)
  		if (similar !== undefined) {
	  		this.setState({
	  			resultColor: similar.rgb,
	  			resultUrl: {
		  			href: similar.uriFriendlyName,
		  			title: similar.name,
		  		},
	  		})
  		}
  	} else {
      this.setState({
        resultColor: "ffffff",
        resultUrl: {
          href: "",
          title: "",
        },
      })
    }
  },

  render() {
  	const styles = {
  		rgbInput: {
  			width: "30px",
  			marginLeft: "5px",
  		},
  		hexInput: {
  			width: "70px",
  			marginRight: "10px",
  		},
  		inputs: {
  			backgroundColor: "white",
  			position: "relative",
  			top: "50%",
  		},
  		wrapper: {
  			backgroundColor: `#${this.state.resultColor}`,
  			height: "100%",
  			width: "100%",
  			position: "fixed",
  			left: "0",
  			top: "0",
  		},
  		resultUrlWrapper: {
  			fontSize: "2em",
		    backgroundColor: "white",
		    color: "gray",
		    height: "200px",
		    width: "200px",
		    borderRadius: "100px",
		    top: "15%",
		    position: "absolute",
		    left: "43%",
  		},
  		resultUrl: {
  			display: "block",
    		margin: "50px",
  		},
  	}
  	const duluxUrl = DULUX_URL + this.state.resultUrl.href
    return (
      <div style={styles.wrapper}>
      	<div style={styles.inputs}>
	      	<span>Цвет в формате HEX #</span>
	      	<TextField
		      hintText="AABBCC"
		      onChange={this.handleChange}
		      style={styles.hexInput}
		    />
		    <span>или rgb(</span>
		    <TextField
		      hintText="255"
		      onChange={this.handleChange}
		      style={styles.rgbInput}
		    />
		    <span>,</span>
		    <TextField
		      hintText="255"
		      onChange={this.handleChange}
		      style={styles.rgbInput}
		    />
		    <span>,</span>
		    <TextField
		      hintText="255"
		      onChange={this.handleChange}
		      style={styles.rgbInput}
		    />
		    <span>)</span>
		  </div>
		  <div style={styles.resultUrlWrapper}>
		  	<a style={styles.resultUrl} href={duluxUrl}>{this.state.resultUrl.title}</a>
		  </div>
      </div>
    );
  }
})

export default ColorPicker;
