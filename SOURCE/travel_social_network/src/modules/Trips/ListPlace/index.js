
import React, { Component } from 'react';
import {
    Image,
    ImageBackground, TextInput,
    View, TouchableOpacity, Text, FlatList
} from 'react-native';
import Header from "../../../modules/Header";
import global from "../../../Styles/global";
import IconButton from "../../../Components/Button/IconButton";
import TextComponent from '../../../Components/Text/Text';
import image from "../../../themes/Images";
import styleGlobal from "../../../Styles/styles";
import {bindActionCreators} from "redux";
import * as loginActions from "../../../action/loginAction";
import * as placeAction from "../../../action/placeAction";
import * as tripActions from "../../../action/tripAction";
import * as uploadImageAction from "../../../action/uploadImgaeAction";
import connect from "react-redux/es/connect/connect";
import TripListItem from "../TripListItem";
import TripListView from "../TripListView";
import CardTripItem from "../CardTripItem";

class ListPlace extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataPlace:this.props.dataListPlace.dataPlace
        };
        this.handleSelectPlace = this.handleSelectPlace.bind(this);
    }

    componentWillMount(){
        console.log("this.state.dataPlace",this.state.dataPlace)
    }
    renderItem(){

    }
    handleSelectPlace(item){
        this.props.navigation.navigate('CreateTrip',{
            item:item
        });
    }
    render() {

        return (
            <ImageBackground source={image.backgroundImage} style={styleGlobal.container}>
                <View style={styleGlobal.imgBackground}>
                    <Header
                        customHeaderStyle={{backgroundColor: global.yellow}}
                        leftHeader={<IconButton nameIcon='ios-arrow-back'
                                                onClick={()=>this.props.navigation.goBack()}
                                                iconStyle={{fontSize: 35, color: global.black}}/>}
                        body={<TextComponent
                            text='Danh sách điểm dừng'
                            color={global.black}
                            size={global.sizeP20}
                            bold={global.fontWeightDark}/>}
                        rightHeader={<TextComponent text={''}/>}
                    />
                    <View style={{marginTop: 10,marginLeft: 10}}>
                        <TripListView onScroll={this._onScroll} data={this.state.dataPlace}
                                      renderItem={({item,index})=>{
                                          const onActionClick = ()=>this.handleSelectPlace(item);
                                          return(
                                              <CardTripItem
                                                  imageUrl={'http://imagesfb.tintuc.vn/upload/images/kiengiang/20181018/img-3310.jpeg'}
                                                  title={item.name}
                                                  description={item.description}
                                                  isShowBtn={true}
                                                  onClick={onActionClick}
                                              />
                                          );
                                      }
                                      }
                        />
                    </View>

                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        login: state.loginReducer,
        error: state.loginReducer.error,
        dataImage:state.imageReducer,
        dataListPlace:state.placeReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        placeAction: bindActionCreators(placeAction,dispatch),
        tripActions:bindActionCreators(tripActions,dispatch),
        uploadImageAction:bindActionCreators(uploadImageAction,dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPlace);