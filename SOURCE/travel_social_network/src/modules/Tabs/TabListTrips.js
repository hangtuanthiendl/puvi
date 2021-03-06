import * as React from 'react';
import {StyleSheet, Dimensions, Animated} from 'react-native';
import { TabView,TabBar } from 'react-native-tab-view';
import global from '../../Styles/global'; 
import PropTypes from "prop-types";

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};
class TabListTrips extends React.Component {
  state = {
    index: this.props.index,
    routes: this.props.routes
  };
  _renderLabel = ({ position, navigationState }) => ({ route, index }) => {
    const inputRange = navigationState.routes.map((x, i) => i);
    const outputRange = inputRange.map(
      inputIndex => (inputIndex === index ? global.colorTextPrimary : global.colorFF)
    );
    const outputFont = inputRange.map(
      inputIndex => (inputIndex === index ? global.colorTextPrimary : global.colorA5)
    );
    const color  = position.interpolate({
      inputRange,
      outputRange,
    });
    return (
      <Animated.Text style={[styles.label, { color }]}>
          {route.title}
      </Animated.Text>
    );
  };
  renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled={true}
      renderLabel={this._renderLabel(props)}
      indicatorStyle={styles.indicator}
      style={styles.tab_bar}
      tabStyle={styles.tab}
    />
  );
  render() {
    const{renderScene, onIndexChange} = this.props;
    return (
          <TabView
            style={[styles.container, this.props.style]}
            navigationState={this.props}
            renderScene={renderScene}
            renderTabBar={this.renderTabBar}
            onIndexChange={onIndexChange}
           initialLayout={initialLayout}
          />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab_bar: {
    backgroundColor: global.darkBlue,
    height:50,
    width:initialLayout.width,
   justifyContent:'center',
      shadowColor: '#000000',
      shadowOffset: {
          width: 0,
          height:1,
      },
      shadowRadius: 5,
      shadowOpacity:0.5,
  },
  tab: {
    width:initialLayout.width / 3,
    justifyContent:'center',
    alignItems:'center',
  },
  indicator: {
    backgroundColor: global.orange,
    height:3,
    justifyContent:'center',
    alignSelf:'center',
  },
  label: {
    fontSize: global.sizeP16,
    //color: 'white',
  },
});
TabListTrips.defaultProps = {
  
};
TabListTrips.propTypes = {
  renderScene : PropTypes.func,
  onIndexChange : PropTypes.func,
  index: PropTypes.number,
  routes: PropTypes.array,
  style: PropTypes.object
};
export default TabListTrips;