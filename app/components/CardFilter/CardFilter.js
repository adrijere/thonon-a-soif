import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Card, CardItem, Text, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../i18n/i18n';
import Moment from 'moment/min/moment-with-locales';
import styles from './styles';


const CardFilter = (props) => {
    return (
      <View style={{height: 100}}>
        <TouchableOpacity style={styles.card}>
          <View>
            <Image
              style={styles.image}
              source={{uri: props.filter.picture}}
              />
          </View>
        </TouchableOpacity>
        <Text style={styles.title}>{props.filter.category}</Text>
      </View>
    )
  return null;
};

CardFilter.propTypes = {
  filter: PropTypes.array,
};

export default CardFilter;
